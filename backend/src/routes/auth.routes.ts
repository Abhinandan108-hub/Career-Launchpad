import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
  googleAuth,
  googleAuthCallback,
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';
import { registerValidation, loginValidation } from '../middleware/validation.middleware';

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.get('/verify-email/:token', verifyEmail);

// Google OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

// Protected
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

export default router;