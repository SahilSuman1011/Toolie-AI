import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';

const app = express()

// Health check endpoint (before any middleware)
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
    });
});

// Initialize Cloudinary only if credentials are available
if (process.env.CLOUDINARY_CLOUD_NAME) {
    await connectCloudinary();
}

// Configure CORS
const corsOptions = {
  origin: [
    'https://toolie-ai.vercel.app',
    'http://localhost:5173',
    /\.clerk\.accounts\.dev$/,
    /\.clerk\.com$/
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Date',
    'X-Api-Version',
    'clerk-frontend-api'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Add security headers
app.use((req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Content Security Policy
  res.header(
    'Content-Security-Policy',
    "default-src 'self' https://toolie-ai.vercel.app https://toolie-ai-server.vercel.app *.clerk.accounts.dev *.clerk.com; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.clerk.accounts.dev *.clerk.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https: *.clerk.accounts.dev *.clerk.com; " +
    "connect-src 'self' https://toolie-ai.vercel.app https://toolie-ai-server.vercel.app " +
    "*.clerk.accounts.dev *.clerk.com https://api.cloudinary.com; " +
    "frame-src 'self' *.clerk.accounts.dev *.clerk.com; " +
    "worker-src 'self' blob:;"
  );

  // Other security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json())
app.use(clerkMiddleware())

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'Server is Live!',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Test endpoint that doesn't require auth
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        services: {
            clerk: 'Connected',
            cloudinary: 'Connected'
        }
    });
});

app.use(requireAuth())

app.use('/api/ai', aiRouter) 
app.use('/api/user', userRouter)

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
}

// Export the Express API
export default app