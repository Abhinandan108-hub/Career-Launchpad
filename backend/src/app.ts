import express, { Application, Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import interviewRoutes from './routes/interview.routes';
import resumeRoutes from './routes/resume.routes';
import resourceRoutes from './routes/resource.routes';
import blogRoutes from './routes/blog.routes';
import contactRoutes from './routes/contact.routes';

// Middleware
import { errorHandler, notFound } from './middleware/error.middleware';

const app: Application = express();

// Security Headers
app.use(helmet());

// CORS
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin calls without Origin header
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Strict rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: 'Too many auth attempts, please try again after an hour.',
});
app.use('/api/auth', authLimiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Compression
app.use(compression());

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;