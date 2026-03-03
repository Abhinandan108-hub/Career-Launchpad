import mongoose, { Document, Schema, Model } from 'mongoose';

export type ResourceCategory = 'guide' | 'video' | 'article' | 'cheatsheet' | 'template' | 'tool';

export interface IResource extends Document {
  title: string;
  description: string;
  category: ResourceCategory;
  tags: string[];
  url?: string;
  content?: string;
  thumbnail?: string;
  author: mongoose.Types.ObjectId;
  isPremium: boolean;
  views: number;
  likes: mongoose.Types.ObjectId[];
  bookmarks: mongoose.Types.ObjectId[];
  isPublished: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['guide', 'video', 'article', 'cheatsheet', 'template', 'tool'],
      required: true,
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    url: { type: String },
    content: { type: String },
    thumbnail: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPremium: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isPublished: { type: Boolean, default: true },
    slug: { type: String, unique: true, lowercase: true },
  },
  { timestamps: true }
);

resourceSchema.index({ category: 1, isPublished: 1 });
resourceSchema.index({ tags: 1 });
resourceSchema.index({ title: 'text', description: 'text' });

const Resource: Model<IResource> = mongoose.model<IResource>('Resource', resourceSchema);
export default Resource;