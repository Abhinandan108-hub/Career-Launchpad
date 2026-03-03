import { Response, NextFunction } from 'express';
import OpenAI from 'openai';
import Interview from '../models/interview.model';
import User from '../models/user.model';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// System prompt for interview AI
const buildSystemPrompt = (type: string, role: string, difficulty: string, company?: string): string => `
You are an expert interviewer at${company ? ` ${company}` : ' a top tech company'}, conducting a ${difficulty} difficulty ${type} interview for a ${role} position.

Your responsibilities:
1. Ask relevant, thoughtful questions one at a time
2. Follow up on answers naturally
3. Give hints if the candidate is stuck (for technical questions)
4. Stay in character as a professional interviewer
5. Keep track of what's been discussed
6. After ~5-8 questions, offer to wrap up and provide feedback

Guidelines:
- Be professional but encouraging
- For behavioral: Use STAR method prompts
- For technical: Start broad, drill into specifics
- For system design: Ask about scale, trade-offs, and components
- Never give answers directly, only guide with hints
`;

// @desc    Create a new interview session
// @route   POST /api/interviews
// @access  Private
export const createInterview = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, type, role, company, difficulty } = req.body;

    const interview = await Interview.create({
      user: req.user?._id,
      title,
      type,
      role,
      company,
      difficulty: difficulty || 'medium',
      startedAt: new Date(),
    });

    // Generate opening question from AI
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(type, role, difficulty || 'medium', company),
        },
        {
          role: 'user',
          content: 'Please start the interview with a brief introduction and your first question.',
        },
      ],
      max_tokens: 300,
    });

    const openingMessage = aiResponse.choices[0].message.content || 'Hello! Let\'s begin the interview.';

    interview.messages.push({ role: 'assistant', content: openingMessage, timestamp: new Date() });
    interview.questionsAsked = 1;
    await interview.save();

    res.status(201).json({ success: true, interview });
  } catch (error) {
    next(error);
  }
};

// @desc    Send a message in interview (Interview Copilot)
// @route   POST /api/interviews/:id/message
// @access  Private
export const sendMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.user?._id });
    if (!interview) return next(new AppError('Interview not found', 404));
    if (interview.status === 'completed') return next(new AppError('Interview already completed', 400));

    const { content } = req.body;
    if (!content) return next(new AppError('Message content is required', 400));

    // Add user message
    interview.messages.push({ role: 'user', content, timestamp: new Date() });

    // Build conversation history for OpenAI
    const conversationHistory = interview.messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // Get AI response
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(interview.type, interview.role, interview.difficulty, interview.company),
        },
        ...conversationHistory,
      ],
      max_tokens: 500,
    });

    const assistantMessage = aiResponse.choices[0].message.content || 'Could you elaborate on that?';
    interview.messages.push({ role: 'assistant', content: assistantMessage, timestamp: new Date() });

    // Count questions
    const questionIndicators = ['?', 'tell me', 'describe', 'explain', 'how would', 'what would'];
    const isQuestion = questionIndicators.some((q) => assistantMessage.toLowerCase().includes(q));
    if (isQuestion) interview.questionsAsked += 1;

    await interview.save();

    res.status(200).json({
      success: true,
      message: { role: 'assistant', content: assistantMessage },
      questionsAsked: interview.questionsAsked,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete interview & generate feedback
// @route   POST /api/interviews/:id/complete
// @access  Private
export const completeInterview = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.user?._id });
    if (!interview) return next(new AppError('Interview not found', 404));

    const conversationText = interview.messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n\n');

    // Generate comprehensive feedback
    const feedbackResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert interview coach. Analyze this ${interview.type} interview transcript and provide detailed feedback. Respond ONLY with valid JSON.`,
        },
        {
          role: 'user',
          content: `Analyze this interview and return JSON with this exact structure:
{
  "score": <0-100>,
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "improvements": ["<area1>", "<area2>", "<area3>"],
  "summary": "<2-3 sentence overall assessment>",
  "fillerWords": <count of um/uh/like usage>,
  "clarity": <0-10>,
  "confidence": <0-10>
}

Transcript:
${conversationText}`,
        },
      ],
      max_tokens: 600,
    });

    let feedback;
    try {
      const raw = feedbackResponse.choices[0].message.content || '{}';
      const cleaned = raw.replace(/```json|```/g, '').trim();
      feedback = JSON.parse(cleaned);
    } catch {
      feedback = {
        score: 70,
        strengths: ['Good communication', 'Showed enthusiasm'],
        improvements: ['Provide more specific examples', 'Structure answers better'],
        summary: 'You completed the interview session. Keep practicing for better results.',
        fillerWords: 0,
        clarity: 7,
        confidence: 7,
      };
    }

    const endTime = new Date();
    const duration = interview.startedAt
      ? Math.floor((endTime.getTime() - interview.startedAt.getTime()) / 1000)
      : 0;

    interview.feedback = feedback;
    interview.status = 'completed';
    interview.completedAt = endTime;
    interview.duration = duration;
    await interview.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user?._id, { $inc: { interviewsCompleted: 1 } });

    res.status(200).json({ success: true, interview });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all interviews for current user
// @route   GET /api/interviews
// @access  Private
export const getUserInterviews = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { status, type } = req.query;

    const filter: Record<string, unknown> = { user: req.user?._id };
    if (status) filter.status = status;
    if (type) filter.type = type;

    const [interviews, total] = await Promise.all([
      Interview.find(filter)
        .select('-messages')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Interview.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      interviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single interview by ID
// @route   GET /api/interviews/:id
// @access  Private
export const getInterview = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.user?._id });
    if (!interview) return next(new AppError('Interview not found', 404));
    res.status(200).json({ success: true, interview });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete interview
// @route   DELETE /api/interviews/:id
// @access  Private
export const deleteInterview = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const interview = await Interview.findOneAndDelete({ _id: req.params.id, user: req.user?._id });
    if (!interview) return next(new AppError('Interview not found', 404));
    res.status(200).json({ success: true, message: 'Interview deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get practice questions by type/role
// @route   GET /api/interviews/questions
// @access  Private
export const getPracticeQuestions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type = 'behavioral', role = 'Software Engineer', count = 10 } = req.query;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Generate ${count} ${type} interview questions for a ${role} position. Return ONLY a JSON array of strings: ["question1", "question2", ...]`,
        },
      ],
      max_tokens: 800,
    });

    let questions: string[] = [];
    try {
      const raw = response.choices[0].message.content || '[]';
      const cleaned = raw.replace(/```json|```/g, '').trim();
      questions = JSON.parse(cleaned);
    } catch {
      questions = ['Tell me about yourself.', 'What are your greatest strengths?'];
    }

    res.status(200).json({ success: true, questions });
  } catch (error) {
    next(error);
  }
};