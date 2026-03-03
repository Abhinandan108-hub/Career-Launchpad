import { Request, Response, NextFunction } from 'express';
import Contact from '../models/contact.model';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';
import { sendEmail, emailTemplates } from '../config/email';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({ name, email, subject, message });

    // Send confirmation to user
    await sendEmail({
      to: email,
      subject: 'We received your message - Career Launchpad',
      html: emailTemplates.contactConfirmation(name),
    });

    // Notify admin
    if (process.env.SMTP_USER) {
      await sendEmail({
        to: process.env.SMTP_USER,
        subject: `New Contact: ${subject}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message}</p>`,
      });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!', id: contact._id });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contacts (admin)
// @route   GET /api/contact
// @access  Admin
export const getContacts = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const { status } = req.query;

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, total, page, pages: Math.ceil(total / limit), contacts });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status (admin)
// @route   PATCH /api/contact/:id
// @access  Admin
export const updateContactStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, adminNotes } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    if (!contact) return next(new AppError('Contact not found', 404));
    res.status(200).json({ success: true, contact });
  } catch (error) {
    next(error);
  }
};