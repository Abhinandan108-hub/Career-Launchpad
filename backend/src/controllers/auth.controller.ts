import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import User from '../models/user.model';
import { AppError } from '../middleware/error.middleware';
import { sendEmail, emailTemplates } from '../config/email';
import { AuthRequest } from '../middleware/auth.middleware';

// Helper: Send token response with cookies
const sendTokenResponse = (user: InstanceType<typeof User>, statusCode: number, res: Response): void => {
  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res.cookie('token', token, cookieOptions);
  res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 });

  res.status(statusCode).json({
    success: true,
    token,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      subscription: user.subscription,
      isEmailVerified: user.isEmailVerified,
    },
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already registered', 409));
    }

    const user = await User.create({ name, email, password });

    // Send email verification
    const verifyToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verifyURL = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome to Career Launchpad! Verify Your Email',
        html: emailTemplates.verifyEmailTemplate(user.name, verifyURL),
      });
    } catch {
      // Don't fail registration if email fails
      console.error('Email send failed during registration');
    }

    sendTokenResponse(user as InstanceType<typeof User>, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated', 403));
    }

    sendTokenResponse(user as InstanceType<typeof User>, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Logout
// @route   POST /api/auth/logout
// @access  Private
export const logout = (_req: Request, res: Response): void => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.cookie('refreshToken', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) return next(new AppError('User not found', 404));
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Don't reveal if email exists
      res.status(200).json({ success: true, message: 'If that email exists, a reset link has been sent.' });
      return;
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: emailTemplates.passwordResetEmail(user.name, resetURL),
    });

    res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+password');

    if (!user) return next(new AppError('Invalid or expired reset token', 400));

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    sendTokenResponse(user as InstanceType<typeof User>, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) return next(new AppError('Invalid or expired verification token', 400));

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Send welcome email after verification
    await sendEmail({
      to: user.email,
      subject: 'Welcome to Career Launchpad!',
      html: emailTemplates.welcomeEmail(user.name),
    });

    res.status(200).json({ success: true, message: 'Email verified successfully!' });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id).select('+password');

    if (!user || !(await user.comparePassword(currentPassword))) {
      return next(new AppError('Current password is incorrect', 401));
    }

    user.password = newPassword;
    await user.save();

    sendTokenResponse(user as InstanceType<typeof User>, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Redirect to Google OAuth
// @route   GET /api/auth/google
// @access  Public
export const googleAuth = (req: Request, res: Response): void => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URL || 'http://localhost:5000/api/auth/google/callback';
  const frontendBase =
    (process.env.CLIENT_URL && process.env.CLIENT_URL.split(',')[0]) || 'http://localhost:5173';

  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not configured');
  }

  const state = (req.query.redirect as string) || `${frontendBase}/dashboard`;
  const scope = [
    'openid',
    'email',
    'profile',
  ].join(' ');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    access_type: 'offline',
    prompt: 'consent',
    state,
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(authUrl);
};

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleAuthCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const code = req.query.code as string | undefined;
    const state = (req.query.state as string) || '';

    if (!code) {
      throw new AppError('Missing authorization code from Google', 400);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URL || 'http://localhost:5000/api/auth/google/callback';

    if (!clientId || !clientSecret) {
      throw new AppError('Google OAuth is not configured on the server', 500);
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      throw new AppError(`Failed to exchange token with Google: ${errorBody}`, 400);
    }

    const tokenJson = (await tokenResponse.json()) as {
      access_token: string;
      id_token?: string;
      expires_in: number;
      refresh_token?: string;
      scope: string;
      token_type: string;
    };

    // Fetch user profile
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      const errorBody = await userInfoResponse.text();
      throw new AppError(`Failed to fetch user info from Google: ${errorBody}`, 400);
    }

    const profile = (await userInfoResponse.json()) as {
      sub: string;
      email: string;
      name?: string;
      picture?: string;
      email_verified?: boolean;
    };

    if (!profile.email) {
      throw new AppError('Google account has no email associated', 400);
    }

    // Find or create user
    let user = await User.findOne({ email: profile.email });

    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString('hex');

      user = await User.create({
        name: profile.name || profile.email.split('@')[0],
        email: profile.email,
        password: randomPassword,
        avatar: profile.picture,
        isEmailVerified: profile.email_verified ?? true,
      });
    }

    // Generate tokens and set cookies (similar to sendTokenResponse)
    const token = (user as InstanceType<typeof User>).generateAuthToken();
    const refreshToken = (user as InstanceType<typeof User>).generateRefreshToken();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie('token', token, cookieOptions);
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 });

    const redirectTarget = state || `${(process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0]}/dashboard`;
    res.redirect(redirectTarget);
  } catch (error) {
    next(error);
  }
};