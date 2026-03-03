import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';
import Blog from '../models/blog.model';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

// @desc    Get all published blogs
// @route   GET /api/blog
// @access  Public
export const getBlogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { category, tags, search } = req.query;

    const filter: Record<string, unknown> = { isPublished: true };
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: (tags as string).split(',') };
    if (search) filter.$text = { $search: search as string };

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate('author', 'name avatar')
        .select('-content -comments')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, total, page, pages: Math.ceil(total / limit), blogs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name avatar')
      .populate('comments.user', 'name avatar');

    if (!blog) return next(new AppError('Blog post not found', 404));
    res.status(200).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post (admin/moderator)
// @route   POST /api/blog
// @access  Admin/Moderator
export const createBlog = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = slugify(req.body.title, { lower: true, strict: true });

    const blog = await Blog.create({
      ...req.body,
      slug,
      author: req.user?._id,
      publishedAt: req.body.isPublished ? new Date() : undefined,
    });

    res.status(201).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Admin/Moderator
export const updateBlog = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }
    if (req.body.isPublished) {
      req.body.publishedAt = new Date();
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return next(new AppError('Blog post not found', 404));
    res.status(200).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Admin
export const deleteBlog = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return next(new AppError('Blog post not found', 404));
    res.status(200).json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to blog
// @route   POST /api/blog/:slug/comments
// @access  Private
export const addComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) return next(new AppError('Blog post not found', 404));

    blog.comments.push({ user: req.user!._id, content: req.body.content, createdAt: new Date() });
    await blog.save();

    const updatedBlog = await Blog.findById(blog._id).populate('comments.user', 'name avatar');
    res.status(201).json({ success: true, comments: updatedBlog?.comments });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle blog like
// @route   POST /api/blog/:id/like
// @access  Private
export const toggleLike = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return next(new AppError('Blog post not found', 404));

    const userId = req.user?._id;
    const isLiked = blog.likes.some((id) => id.equals(userId));

    if (isLiked) {
      blog.likes = blog.likes.filter((id) => !id.equals(userId));
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.status(200).json({ success: true, likes: blog.likes.length, isLiked: !isLiked });
  } catch (error) {
    next(error);
  }
};