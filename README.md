# 🤖 Toolie AI

<div align="center">
  <img src="client/src/assets/logo.png" alt="Toolie AI Logo" width="200"/>
  <p>Your All-in-One AI-Powered Productivity Suite</p>
</div>

<div align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Live Demo</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#deployment">Deployment</a>
</div>

<br/>

## 🌟 Overview

Toolie AI is a modern SaaS platform that brings together a powerful suite of AI tools to enhance your productivity and creative workflows. With its intuitive interface and powerful features, Toolie AI helps you create, edit, and optimize content with just a few clicks.

## ✨ Features

### Content Creation
- ✍️ **AI Article Writer**
  - Generate high-quality articles on any topic
  - Customizable tone and style
  - SEO-optimized content generation
  - Support for multiple languages

- 📝 **Blog Title Generator**
  - Create engaging, SEO-friendly titles
  - A/B testing suggestions
  - Keyword optimization
  - Click-through rate predictions

### Visual Tools
- 🎨 **AI Image Generation**
  - Create custom images from text descriptions
  - Multiple style options
  - High-resolution output
  - Batch generation capability

- 🖼️ **Background Removal**
  - One-click background removal
  - Transparent PNG output
  - Batch processing
  - Edge detection refinement

- ✂️ **Object Removal**
  - Smart object selection
  - Content-aware fill
  - Multiple object removal
  - High-quality restoration

### Professional Tools
- 📄 **Resume Reviewer**
  - AI-powered resume analysis
  - Industry-specific recommendations
  - ATS optimization tips
  - Formatting suggestions

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- PostgreSQL 14+
- Clerk account for authentication
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/SahilSuman1011/Toolie-AI.git

# Frontend setup
cd Toolie-AI/client
npm install
npm run dev

# Backend setup (in a new terminal)
cd ../server
npm install

# Set up PostgreSQL database
# Create your database and run migrations
npx prisma migrate dev

npm run dev
```

### Environment Variables

#### Frontend (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=http://localhost:5000
```

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/toolie_db"
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=your_clerk_secret
```

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS
- **State Management**: React Context
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: Clerk
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI Integration**: Google Gemini API
- **File Storage**: Local/Cloud Storage

## 📐 Architecture

```
Toolie-AI/
├── client/                # Frontend React application
│   ├── public/           # Static assets
│   └── src/
│       ├── assets/       # Images and asset exports
│       ├── components/   # Reusable React components
│       │   ├── ui/      # UI components (cards, buttons)
│       │   └── layout/  # Layout components
│       ├── pages/       # Page components
│       └── context/     # React context providers
├── server/               # Backend Node.js application
│   ├── configs/         # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # Mongoose models
│   └── routes/          # API routes
```

## 🔧 Configuration

### Authentication
- Set up Clerk authentication using the [Clerk Dashboard](https://clerk.dev)
- Configure OAuth providers (Google, GitHub)
- Set up webhook endpoints

### AI Services
- Set up Google Cloud Console project
- Configure Gemini API access and quotas
- Set up rate limiting
- Configure model parameters for different tools

## 📦 Deployment

### Frontend
1. Build the frontend:
```bash
cd client
npm run build
```

2. Deploy to Vercel:
```bash
vercel deploy
```

### Backend
1. Set up PostgreSQL database:
   - Use Railway's PostgreSQL
   - Amazon RDS
   - or your preferred PostgreSQL hosting
2. Deploy to your preferred hosting:
   - Railway
   - Heroku
   - DigitalOcean

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💌 Support

For support, email support@toolie-ai.com or join our [Discord community](https://discord.gg/toolie-ai).

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Clerk for authentication
- All our open-source contributors

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/SahilSuman1011">Sahil Suman</a>
</div>
