import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const createTransporter = (): Transporter => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
};

// Email Templates
export const emailTemplates = {
  welcomeEmail: (name: string): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Welcome to Career Launchpad! 🚀</h1>
      <p>Hi ${name},</p>
      <p>We're excited to have you on board! Start your interview preparation journey today.</p>
      <a href="${process.env.CLIENT_URL}/dashboard" 
         style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
        Go to Dashboard
      </a>
      <p>Best of luck with your interviews!</p>
      <p>— The Career Launchpad Team</p>
    </div>
  `,

  passwordResetEmail: (name: string, resetURL: string): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Password Reset Request</h1>
      <p>Hi ${name},</p>
      <p>You requested a password reset. Click the button below (valid for 10 minutes):</p>
      <a href="${resetURL}" 
         style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
        Reset Password
      </a>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `,

  verifyEmailTemplate: (name: string, verifyURL: string): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Verify Your Email</h1>
      <p>Hi ${name},</p>
      <p>Please verify your email address by clicking the button below:</p>
      <a href="${verifyURL}" 
         style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
        Verify Email
      </a>
    </div>
  `,

  contactConfirmation: (name: string): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">We received your message!</h1>
      <p>Hi ${name},</p>
      <p>Thanks for reaching out. Our team will get back to you within 24–48 hours.</p>
      <p>— The Career Launchpad Team</p>
    </div>
  `,
};