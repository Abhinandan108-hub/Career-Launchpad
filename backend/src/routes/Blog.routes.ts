import { Router } from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  toggleLike,
} from '../controllers/blog.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public
router.get('/', getBlogs);
router.get('/:slug', getBlog);

// Admin/Moderator
router.post('/', protect, authorize('admin', 'moderator'), createBlog);
router.put('/:id', protect, authorize('admin', 'moderator'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

// Private
router.post('/:slug/comments', protect, addComment);
router.post('/:id/like', protect, toggleLike);

export default router;