import { Response, NextFunction } from 'express';
import User from '../models/user.model';
import Interview from '../models/interview.model';
import Resume from '../models/resume.model';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';
import { deleteFile } from '../config/cloudinary';

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) return next(new AppError('User not found', 404));
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allowedFields = ['name'];
    const updates: Record<string, string> = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload/update avatar
// @route   POST /api/users/avatar
// @access  Private
export const updateAvatar = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) return next(new AppError('Please upload an image', 400));

    const user = await User.findById(req.user?._id);
    if (!user) return next(new AppError('User not found', 404));

    // Delete old avatar from Cloudinary
    if (user.avatarPublicId) {
      await deleteFile(user.avatarPublicId);
    }

    const file = req.file as Express.Multer.File & { path: string; filename: string };
    user.avatar = file.path;
    user.avatarPublicId = file.filename;
    await user.save();

    res.status(200).json({ success: true, avatar: user.avatar, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user dashboard stats
// @route   GET /api/users/stats
// @access  Private
export const getDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id;

    const [totalInterviews, completedInterviews, resumes, avgScoreResult] = await Promise.all([
      Interview.countDocuments({ user: userId }),
      Interview.countDocuments({ user: userId, status: 'completed' }),
      Resume.countDocuments({ user: userId }),
      Interview.aggregate([
        { $match: { user: userId, status: 'completed', 'feedback.score': { $exists: true } } },
        { $group: { _id: null, avgScore: { $avg: '$feedback.score' } } },
      ]),
    ]);

    const recentInterviews = await Interview.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title type status feedback.score createdAt');

    res.status(200).json({
      success: true,
      stats: {
        totalInterviews,
        completedInterviews,
        resumes,
        averageScore: avgScoreResult[0]?.avgScore?.toFixed(1) || 0,
        recentInterviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ──── ADMIN ROUTES ────

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Admin
export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (admin)
// @route   PATCH /api/users/:id/role
// @access  Admin
export const updateUserRole = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { role } = req.body;
    if (!['user', 'admin', 'moderator'].includes(role)) {
      return next(new AppError('Invalid role', 400));
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return next(new AppError('User not found', 404));

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate user (admin)
// @route   PATCH /api/users/:id/deactivate
// @access  Admin
export const deactivateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!user) return next(new AppError('User not found', 404));
    res.status(200).json({ success: true, message: 'User deactivated', user });
  } catch (error) {
    next(error);
  }
};