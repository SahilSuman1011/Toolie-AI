# 🤖 Toolie AI

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Contributors](https://img.shields.io/github/contributors/SahilSuman1011/Toolie-AI)](https://github.com/SahilSuman1011/Toolie-AI/graphs/contributors)

<img src="client/src/assets/toolie-logo.png" alt="Toolie AI Logo" width="200"/>

**Your Enterprise-Grade AI-Powered Productivity Suite**

[Website](https://toolie-ai.com) • [Documentation](https://docs.toolie-ai.com)

---

</div>

## 🌟 Overview

Toolie AI is an enterprise-grade SaaS platform that harnesses cutting-edge AI technologies to revolutionize productivity and creative workflows. Built with scalability and performance in mind, it offers a comprehensive suite of AI-powered tools for content creation, image manipulation, and document analysis.

### Key Benefits

- 🚀 **Enterprise Performance**: Built for scale with modern tech stack
- 🔒 **Enterprise-Grade Security**: SOC2 compliant with robust authentication
- 🎯 **AI-Powered Automation**: Streamline repetitive tasks
- 💼 **Business Ready**: Team management and collaboration features
- 📊 **Advanced Analytics**: Usage tracking and performance metrics

## ✨ Features

### Core Features
- 🎨 **Modern UI/UX**
  - Stunning glassmorphic design with Tailwind CSS
  - Smooth Framer Motion animations
  - Responsive layout for all devices
  - Interactive floating icons and hover effects
  - Dynamic logo scroller with company logos

- 🔒 **Authentication & Authorization**
  - Secure authentication with Clerk
  - Protected routes and API endpoints
  - User session management
  - Premium tier access control
  - Social login integration

- 📊 **Dashboard**
  - Clean and intuitive interface
  - Sidebar navigation with categories
  - Recent creations display
  - User profile integration
  - Usage statistics

### AI Tools

- ✍️ **AI Article Writer**
  - Content generation using Google Gemini
  - Customizable article lengths (500-1600+ words)
  - Topic-based generation
  - Markdown formatting support
  - One-click copy functionality

- 🎨 **AI Image Generation**
  - Text-to-image generation with Clipdrop API
  - 10+ artistic style options
  - High-resolution output
  - Public/private sharing options
  - Easy download functionality

- 📝 **Blog Title Generator**
  - AI-powered title suggestions
  - Multiple category options
  - SEO-optimized suggestions
  - One-click copy feature
  - Category-based customization

- 🖼️ **Background Removal**
  - One-click background removal
  - Transparent PNG output
  - High-quality processing
  - Instant download option
  - Multiple format support

- ✂️ **Object Removal**
  - Smart object selection
  - Content-aware fill
  - Multiple object removal
  - Original quality preservation
  - Quick download feature

- 📑 **LinkedIn Optimizer**
  - Profile content enhancement
  - Professional tone adjustment
  - Keyword optimization
  - Easy copy/paste functionality
  - Engagement-focused suggestions

### Community Features
- 🌟 **Creation Sharing**
  - Public gallery of AI creations
  - User attribution
  - Download capabilities
  - Engagement features
  - Community interaction

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Clerk account for authentication
- Google Gemini API key
- Clipdrop API key (for image generation)
- Cloudinary account (for image storage)
- PostgreSQL database

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
npm run dev
```

### Environment Variables

#### Frontend (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_BASE_URL=http://localhost:3000
```

#### Backend (.env)
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=your_clerk_secret
CLIPDROP_API_KEY=your_clipdrop_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URL=your_postgresql_connection_string
```

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: Clerk React
- **HTTP Client**: Axios
- **Toast Notifications**: React Hot Toast
- **Loading States**: React Loading Skeleton

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: Clerk Express
- **AI Services**:
  - Google Gemini API (Text Generation)
  - Clipdrop API (Image Generation)
- **Image Storage**: Cloudinary
- **Middleware**: CORS, Express JSON

## 📐 Project Structure

```
Toolie-AI/
├── client/                      # Frontend React application
│   ├── public/                 # Static assets
│   │   ├── ai-icons/          # Tool icons
│   │   ├── company-logos/     # Partner logos
│   │   └── gradientBackground.png
│   └── src/
│       ├── assets/            # Asset exports
│       ├── components/        # React components
│       │   ├── ui/           # UI components
│       │   └── {Component}.jsx
│       └── pages/            # Page components
│
├── server/                      # Backend Node.js application
│   ├── configs/               # Configuration setup
│   │   ├── cloudinary.js     # Cloudinary config
│   │   └── db.js             # Database config
│   ├── controllers/          # Route controllers
│   │   ├── aiController.js   # AI features logic
│   │   └── userController.js # User management
│   ├── middlewares/         # Custom middlewares
│   │   └── auth.js          # Authentication
│   └── routes/              # API routes
```

## 🔧 Current Implementation Status

### Completed
- ✅ Modern UI implementation with Framer Motion animations
- ✅ Authentication setup with Clerk
- ✅ Responsive design and mobile optimization
- ✅ Basic routing and protected routes
- ✅ Landing page with interactive elements
- ✅ Dashboard layout and navigation
- ✅ Tool selection interface

### In Progress
- 🔄 Backend API development
- 🔄 AI service integrations
- 🔄 Database schema implementation
- 🔄 Premium tier functionality
- 🔄 Image generation service
- 🔄 Article generation service

### Pending
- ⏳ Background removal tool
- ⏳ Object removal functionality
- ⏳ Resume review system
- ⏳ User content management
- ⏳ Community features
- ⏳ Analytics integration

## �️ Roadmap

### Phase 1 (Current)
- Complete core AI tool implementations
- Finalize backend API structure
- Implement premium tier system
- Add error handling and loading states

### Phase 2 (Upcoming)
- Add user dashboard analytics
- Implement content saving system
- Add batch processing capabilities
- Enhance AI model configurations

### Phase 3 (Future)
- Add community features
- Implement sharing capabilities
- Add collaboration tools
- Enhance performance optimizations

## 🤝 Contributing

This project is currently in active development. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/SahilSuman1011">Sahil Suman</a>
</div>
