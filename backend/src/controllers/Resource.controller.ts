import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';
import Resource from '../models/resource.model';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
export const getResources = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;
    const { category, search, tags } = req.query;

    const filter: Record<string, unknown> = { isPublished: true };
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: (tags as string).split(',') };
    if (search) filter.$text = { $search: search as string };

    const [resources, total] = await Promise.all([
      Resource.find(filter)
        .populate('author', 'name avatar')
        .sort({ views: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Resource.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, total, page, pages: Math.ceil(total / limit), resources });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:slug
// @access  Public
export const getResource = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resource = await Resource.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name avatar');

    if (!resource) return next(new AppError('Resource not found', 404));
    res.status(200).json({ success: true, resource });
  } catch (error) {
    next(error);
  }
};

// @desc    Create resource (admin/moderator)
// @route   POST /api/resources
// @access  Admin/Moderator
export const createResource = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = slugify(req.body.title, { lower: true, strict: true });
    const resource = await Resource.create({ ...req.body, slug, author: req.user?._id });
    res.status(201).json({ success: true, resource });
  } catch (error) {
    next(error);
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Admin/Moderator
export const updateResource = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!resource) return next(new AppError('Resource not found', 404));
    res.status(200).json({ success: true, resource });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Admin
export const deleteResource = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return next(new AppError('Resource not found', 404));
    res.status(200).json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/unlike resource
// @route   POST /api/resources/:id/like
// @access  Private
export const toggleLike = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return next(new AppError('Resource not found', 404));

    const userId = req.user?._id;
    const isLiked = resource.likes.some((id) => id.equals(userId));

    if (isLiked) {
      resource.likes = resource.likes.filter((id) => !id.equals(userId));
    } else {
      resource.likes.push(userId);
    }

    await resource.save();
    res.status(200).json({ success: true, likes: resource.likes.length, isLiked: !isLiked });
  } catch (error) {
    next(error);
  }
};

// @desc    Bookmark/unbookmark resource
// @route   POST /api/resources/:id/bookmark
// @access  Private
export const toggleBookmark = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return next(new AppError('Resource not found', 404));

    const userId = req.user?._id;
    const isBookmarked = resource.bookmarks.some((id) => id.equals(userId));

    if (isBookmarked) {
      resource.bookmarks = resource.bookmarks.filter((id) => !id.equals(userId));
    } else {
      resource.bookmarks.push(userId);
    }

    await resource.save();
    res.status(200).json({ success: true, isBookmarked: !isBookmarked });
  } catch (error) {
    next(error);
  }
};