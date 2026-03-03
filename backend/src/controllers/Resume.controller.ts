import { Response, NextFunction } from 'express';
import OpenAI from 'openai';
import Resume from '../models/resume.model';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';
import { deleteFile } from '../config/cloudinary';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// @desc    Get all resumes for user
// @route   GET /api/resume
// @access  Private
export const getUserResumes = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resumes = await Resume.find({ user: req.user?._id }).select('-sections').sort({ updatedAt: -1 });
    res.status(200).json({ success: true, resumes });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resume
// @route   GET /api/resume/:id
// @access  Private
export const getResume = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user?._id });
    if (!resume) return next(new AppError('Resume not found', 404));
    res.status(200).json({ success: true, resume });
  } catch (error) {
    next(error);
  }
};

// @desc    Create resume
// @route   POST /api/resume
// @access  Private
export const createResume = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resume = await Resume.create({ ...req.body, user: req.user?._id });
    res.status(201).json({ success: true, resume });
  } catch (error) {
    next(error);
  }
};

// @desc    Update resume
// @route   PUT /api/resume/:id
// @access  Private
export const updateResume = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user?._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!resume) return next(new AppError('Resume not found', 404));
    res.status(200).json({ success: true, resume });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
// @access  Private
export const deleteResume = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user?._id });
    if (!resume) return next(new AppError('Resume not found', 404));
    if (resume.filePublicId) await deleteFile(resume.filePublicId);
    res.status(200).json({ success: true, message: 'Resume deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload resume file
// @route   POST /api/resume/:id/upload
// @access  Private
export const uploadResumeFile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) return next(new AppError('Please upload a file', 400));

    const resume = await Resume.findOne({ _id: req.params.id, user: req.user?._id });
    if (!resume) return next(new AppError('Resume not found', 404));

    if (resume.filePublicId) await deleteFile(resume.filePublicId);

    const file = req.file as Express.Multer.File & { path: string; filename: string };
    resume.fileUrl = file.path;
    resume.filePublicId = file.filename;
    await resume.save();

    res.status(200).json({ success: true, fileUrl: resume.fileUrl });
  } catch (error) {
    next(error);
  }
};

// @desc    ATS Score resume with AI
// @route   POST /api/resume/:id/ats-score
// @access  Private
export const scoreResumeATS = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user?._id });
    if (!resume) return next(new AppError('Resume not found', 404));

    const { jobDescription } = req.body;
    const resumeText = resume.sections.map((s) => `${s.title}:\n${s.content}`).join('\n\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `You are an ATS system expert. Score this resume against the job description and return ONLY JSON:
{
  "score": <0-100>,
  "feedback": ["<specific feedback 1>", "<specific feedback 2>", "<specific feedback 3>"]
}

Resume:
${resumeText}

Job Description:
${jobDescription || 'General software engineering position'}`,
        },
      ],
      max_tokens: 400,
    });

    let result = { score: 70, feedback: ['Resume looks good overall'] };
    try {
      const raw = response.choices[0].message.content || '{}';
      result = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      // use defaults
    }

    resume.atsScore = result.score;
    resume.atsFeedback = result.feedback;
    await resume.save();

    res.status(200).json({ success: true, atsScore: result.score, feedback: result.feedback });
  } catch (error) {
    next(error);
  }
};

// @desc    AI improve resume section
// @route   POST /api/resume/improve
// @access  Private
export const improveSection = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sectionType, content, targetRole } = req.body;
    if (!content) return next(new AppError('Section content is required', 400));

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Improve this ${sectionType} section of a resume for a ${targetRole || 'software engineering'} position. Make it more impactful, ATS-friendly, and use strong action verbs. Return ONLY the improved text, no explanations.

Original:
${content}`,
        },
      ],
      max_tokens: 500,
    });

    const improved = response.choices[0].message.content || content;
    res.status(200).json({ success: true, improved });
  } catch (error) {
    next(error);
  }
};