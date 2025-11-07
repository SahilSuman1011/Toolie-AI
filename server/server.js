import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';

const app = express()

await connectCloudinary();

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
// Add CSP headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.sahilsuman.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.clerk.dev https://clerk.sahilsuman.dev"
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