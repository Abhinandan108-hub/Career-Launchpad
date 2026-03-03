import { Router } from 'express';
import {
  createInterview,
  sendMessage,
  completeInterview,
  getUserInterviews,
  getInterview,
  deleteInterview,
  getPracticeQuestions,
} from '../controllers/interview.controller';
import { protect } from '../middleware/auth.middleware';
import { interviewValidation } from '../middleware/validation.middleware';

const router = Router();

router.use(protect);

router.get('/questions', getPracticeQuestions);
router.get('/', getUserInterviews);
router.post('/', interviewValidation, createInterview);
router.get('/:id', getInterview);
router.post('/:id/message', sendMessage);
router.post('/:id/complete', completeInterview);
router.delete('/:id', deleteInterview);

export default router;