import mongoose, { Document, Schema, Model } from 'mongoose';

export type ContactStatus = 'new' | 'read' | 'replied' | 'resolved';

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'resolved'],
      default: 'new',
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

const Contact: Model<IContact> = mongoose.model<IContact>('Contact', contactSchema);
export default Contact;