import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';

const app = express()

await connectCloudinary();

// Configure CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://toolie-ai.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version'],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200
}));

// Handle OPTIONS preflight requests
app.options('*', cors());

app.use(express.json())
app.use(clerkMiddleware())

// Add CSP headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https://toolie-ai.vercel.app https://toolie-ai-server.vercel.app; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' https://api.clerk.dev https://*.clerk.accounts.dev " +
    "https://toolie-ai-server.vercel.app https://api.cloudinary.com wss://*.clerk.accounts.dev; " +
    "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com; " +
    "worker-src 'self' blob:;"
  );
  next();
});

app.get('/', (req, res) => res.send('Server is Live!'))

app.use(requireAuth())

app.use('/api/ai', aiRouter) 
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})