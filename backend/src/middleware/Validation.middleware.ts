import { Request, Response, NextFunction } from 'express';

type ValidationRule = {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'email';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  enum?: string[];
};

export const validate = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];
    const body = req.body;

    for (const rule of rules) {
      const value = body[rule.field];

      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`${rule.field} is required`);
        continue;
      }

      if (value === undefined || value === null || value === '') continue;

      if (rule.type === 'email') {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(value)) {
          errors.push(`${rule.field} must be a valid email`);
        }
      }

      if (rule.type === 'string' && typeof value !== 'string') {
        errors.push(`${rule.field} must be a string`);
      }

      if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
        errors.push(`${rule.field} must be at least ${rule.minLength} characters`);
      }

      if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
        errors.push(`${rule.field} cannot exceed ${rule.maxLength} characters`);
      }

      if (rule.enum && !rule.enum.includes(value)) {
        errors.push(`${rule.field} must be one of: ${rule.enum.join(', ')}`);
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ success: false, message: errors.join('. ') });
      return;
    }

    next();
  };
};

// Common validation sets
export const registerValidation = validate([
  { field: 'name', required: true, type: 'string', minLength: 2, maxLength: 50 },
  { field: 'email', required: true, type: 'email' },
  { field: 'password', required: true, type: 'string', minLength: 8 },
]);

export const loginValidation = validate([
  { field: 'email', required: true, type: 'email' },
  { field: 'password', required: true, type: 'string' },
]);

export const interviewValidation = validate([
  { field: 'title', required: true, type: 'string', minLength: 3, maxLength: 100 },
  { field: 'type', required: true, enum: ['behavioral', 'technical', 'system-design', 'hr', 'case-study'] },
  { field: 'role', required: true, type: 'string' },
  { field: 'difficulty', enum: ['easy', 'medium', 'hard'] },
]);

export const contactValidation = validate([
  { field: 'name', required: true, type: 'string', minLength: 2 },
  { field: 'email', required: true, type: 'email' },
  { field: 'subject', required: true, type: 'string', minLength: 5 },
  { field: 'message', required: true, type: 'string', minLength: 10, maxLength: 2000 },
]);