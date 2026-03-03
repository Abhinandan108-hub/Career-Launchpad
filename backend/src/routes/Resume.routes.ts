import { Router } from 'express';
import {
  getUserResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  uploadResumeFile,
  scoreResumeATS,
  improveSection,
} from '../controllers/resume.controller';
import { protect } from '../middleware/auth.middleware';
import { uploadResume } from '../config/cloudinary';

const router = Router();

router.use(protect);

router.get('/', getUserResumes);
router.post('/', createResume);
router.post('/improve', improveSection);
router.get('/:id', getResume);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);
router.post('/:id/upload', uploadResume.single('resume'), uploadResumeFile);
router.post('/:id/ats-score', scoreResumeATS);

export default router;