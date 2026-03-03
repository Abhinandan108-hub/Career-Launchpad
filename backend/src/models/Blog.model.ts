import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IComment {
  user: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: mongoose.Types.ObjectId;
  tags: string[];
  category: string;
  views: number;
  likes: mongoose.Types.ObjectId[];
  comments: IComment[];
  isPublished: boolean;
  publishedAt?: Date;
  readTime?: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String, lowercase: true, trim: true }],
    category: { type: String, default: 'general' },
    views: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    readTime: { type: Number },
  },
  { timestamps: true }
);

// Auto-compute read time before saving
blogSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

blogSchema.index({ slug: 1 });
blogSchema.index({ isPublished: 1, publishedAt: -1 });
blogSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;