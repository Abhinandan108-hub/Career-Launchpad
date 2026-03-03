import mongoose, { Document, Schema, Model } from 'mongoose';

export type InterviewType = 'behavioral' | 'technical' | 'system-design' | 'hr' | 'case-study';
export type InterviewDifficulty = 'easy' | 'medium' | 'hard';
export type InterviewStatus = 'pending' | 'completed' | 'abandoned';

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IFeedback {
  score: number; // 0-100
  strengths: string[];
  improvements: string[];
  summary: string;
  fillerWords: number;
  clarity: number;
  confidence: number;
  technicalAccuracy?: number;
}

export interface IInterview extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  type: InterviewType;
  role: string; // e.g. "Frontend Developer"
  company?: string;
  difficulty: InterviewDifficulty;
  status: InterviewStatus;
  messages: IMessage[];
  feedback?: IFeedback;
  duration?: number; // in seconds
  questionsAsked: number;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const feedbackSchema = new Schema<IFeedback>({
  score: { type: Number, min: 0, max: 100 },
  strengths: [{ type: String }],
  improvements: [{ type: String }],
  summary: { type: String },
  fillerWords: { type: Number, default: 0 },
  clarity: { type: Number, min: 0, max: 10 },
  confidence: { type: Number, min: 0, max: 10 },
  technicalAccuracy: { type: Number, min: 0, max: 10 },
});

const interviewSchema = new Schema<IInterview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['behavioral', 'technical', 'system-design', 'hr', 'case-study'],
      required: true,
    },
    role: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'abandoned'],
      default: 'pending',
    },
    messages: [messageSchema],
    feedback: feedbackSchema,
    duration: { type: Number },
    questionsAsked: { type: Number, default: 0 },
    startedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

interviewSchema.index({ user: 1, createdAt: -1 });
interviewSchema.index({ user: 1, status: 1 });

const Interview: Model<IInterview> = mongoose.model<IInterview>('Interview', interviewSchema);
export default Interview;