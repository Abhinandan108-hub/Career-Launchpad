import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  updateAvatar,
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deactivateUser,
} from '../controllers/user.controller';
import { protect, authorize } from '../middleware/auth.middleware';
import { uploadAvatar } from '../config/cloudinary';

const router = Router();

// All routes protected
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/avatar', uploadAvatar.single('avatar'), updateAvatar);
router.get('/stats', getDashboardStats);

// Admin only
router.get('/', authorize('admin'), getAllUsers);
router.patch('/:id/role', authorize('admin'), updateUserRole);
router.patch('/:id/deactivate', authorize('admin'), deactivateUser);

export default router;