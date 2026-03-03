import { Router } from 'express';
import {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
  toggleLike,
  toggleBookmark,
} from '../controllers/resource.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public
router.get('/', getResources);
router.get('/:slug', getResource);

// Admin/Moderator
router.post('/', protect, authorize('admin', 'moderator'), createResource);
router.put('/:id', protect, authorize('admin', 'moderator'), updateResource);
router.delete('/:id', protect, authorize('admin'), deleteResource);

// Private
router.post('/:id/like', protect, toggleLike);
router.post('/:id/bookmark', protect, toggleBookmark);

export default router;