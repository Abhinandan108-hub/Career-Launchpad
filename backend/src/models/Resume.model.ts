import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IResumeSection {
  type: 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'summary';
  title: string;
  content: string;
  order: number;
}

export interface IResume extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  template: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  sections: IResumeSection[];
  fileUrl?: string;
  filePublicId?: string;
  atsScore?: number;
  atsFeedback?: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSectionSchema = new Schema<IResumeSection>({
  type: {
    type: String,
    enum: ['experience', 'education', 'skills', 'projects', 'certifications', 'summary'],
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const resumeSchema = new Schema<IResume>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, default: 'My Resume' },
    template: { type: String, default: 'classic' },
    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      location: { type: String },
      linkedin: { type: String },
      github: { type: String },
      portfolio: { type: String },
    },
    sections: [resumeSectionSchema],
    fileUrl: { type: String },
    filePublicId: { type: String },
    atsScore: { type: Number, min: 0, max: 100 },
    atsFeedback: [{ type: String }],
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Resume: Model<IResume> = mongoose.model<IResume>('Resume', resumeSchema);
export default Resume;