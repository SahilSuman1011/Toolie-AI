# 🤖 Toolie AI

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Contributors](https://img.shields.io/github/contributors/SahilSuman1011/Toolie-AI)](https://github.com/SahilSuman1011/Toolie-AI/graphs/contributors)

<img src="client/src/assets/TAI.png" alt="Toolie AI Logo" width="200"/>

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
  - Mobile-optimized sidebar with backdrop overlay

- 🔒 **Authentication & Authorization**
  - Secure authentication with Clerk
  - Protected routes and API endpoints
  - User session management
  - Premium tier access control (via Clerk)
  - Social login integration
  - Automatic metadata tracking for usage limits

- 📊 **Dashboard**
  - Clean and intuitive interface
  - Sidebar navigation with categories
  - Recent creations display with full details
  - User profile integration
  - Real-time creation count
  - Active plan display (Free/Premium)
  - Loading states and error handling

### AI Tools

- ✍️ **AI Article Writer** (Fully Functional ✅)
  - Content generation using Cohere AI (command-r-08-2024)
  - Customizable article lengths (500-1600+ words)
  - Topic-based generation
  - Markdown formatting support
  - One-click copy functionality
  - Automatic retry on rate limits (5 attempts with exponential backoff)
  - Free tier: 10 articles/month
  - Premium: Unlimited

- 📝 **Blog Title Generator** (Fully Functional ✅)
  - AI-powered title suggestions via Cohere
  - 10+ category options (General, Technology, Health, Finance, etc.)
  - SEO-optimized suggestions
  - One-click copy feature
  - Category-based customization
  - Free tier: 10 titles/month
  - Premium: Unlimited

- 💼 **LinkedIn Optimizer** (Fully Functional ✅)
  - Profile content enhancement with Cohere AI
  - Headline optimization
  - About section rewriting
  - Experience highlights enhancement
  - Skills section optimization
  - Professional tone adjustment
  - Keyword optimization for LinkedIn algorithm
  - Markdown formatted output
  - Easy copy/paste functionality
  - Premium feature only

- 🎨 **AI Image Generation** (Fully Functional ✅)
  - Text-to-image generation with Clipdrop API
  - High-resolution output (1024x1024)
  - Public/private sharing options
  - Cloudinary integration for storage
  - Easy download functionality
  - Premium feature only

- 🖼️ **Background Removal** (Fully Functional ✅)
  - One-click background removal via Cloudinary
  - Transparent PNG output
  - High-quality processing
  - Instant download option
  - Premium feature only

- ✂️ **Object Removal** (Fully Functional ✅)
  - Smart object selection and removal
  - Content-aware fill using Cloudinary AI
  - Original quality preservation
  - Quick download feature
  - Premium feature only

### Community Features
- 🌟 **Creation Sharing** (Fully Functional ✅)
  - Public gallery of published AI-generated images
  - User attribution display
  - One-click download capabilities
  - Grid layout with hover effects
  - Image prompt display on hover
  - Filtering by creation type
  - Real-time updates

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Clerk account for authentication
- Cohere API key (for AI text generation)
- Clipdrop API key (for image generation)
- Cloudinary account (for image storage)
- PostgreSQL database (Neon recommended)

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
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:3000  # For local development
# VITE_API_BASE_URL=https://your-backend.vercel.app  # For production
```

#### Backend (.env)
```env
PORT=3000
COHERE_API_KEY=your_cohere_api_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
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
- **Markdown Rendering**: React Markdown

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5
- **Database**: PostgreSQL (Neon Serverless)
- **Authentication**: Clerk Express SDK
- **AI Services**:
  - Cohere API (Text Generation - command-r-08-2024 model)
  - Clipdrop API (Image Generation & Background Removal)
  - Cloudinary AI (Background & Object Removal)
- **Image Storage**: Cloudinary
- **File Upload**: Multer
- **Middleware**: CORS, Express JSON, Custom Auth
- **Error Handling**: Retry logic with exponential backoff (5 attempts, 3s-48s delays)
- **Security**: Rate limiting, CORS policies, secure headers

## 📐 Project Structure

```
Toolie-AI/
├── client/                      # Frontend React application
│   ├── public/                 # Static assets
│   │   ├── ai-icons/          # Tool icons (12 icons)
│   │   ├── company-logos/     # Partner logos
│   │   └── gradientBackground.png
│   └── src/
│       ├── assets/            # Asset exports
│       ├── components/        # React components
│       │   ├── ui/           # Reusable UI components
│       │   ├── AiTools.jsx   # Tools grid display
│       │   ├── CreationItem.jsx  # Individual creation card
│       │   ├── FAQ.jsx       # FAQ accordion
│       │   ├── Footer.jsx    # Site footer
│       │   ├── Hero.jsx      # Landing hero section
│       │   ├── LogoScroller.jsx  # Animated logos
│       │   ├── Navbar.jsx    # Navigation bar
│       │   ├── Plan.jsx      # Pricing cards
│       │   ├── Sidebar.jsx   # Dashboard sidebar
│       │   └── Testimonial.jsx  # User testimonials
│       └── pages/            # Page components
│           ├── BlogTitles.jsx       # Blog title generator
│           ├── Community.jsx        # Public gallery
│           ├── Dashboard.jsx        # User dashboard
│           ├── GenerateImages.jsx   # Image generation
│     API Endpoints

### AI Routes (`/api/ai`)
- `POST /generate-article` - Generate AI article (auth required)
- `POST /generate-blog-title` - Generate blog titles (auth required)
- `POST /generate-image` - Generate AI image (auth + premium required)
- `POST /remove-image-background` - Remove image background (auth + premium + file upload)
- `POST /remove-image-object` - Remove object from image (auth + premium + file upload)
- `POST /linkedin-optimize` - Optimize LinkedIn profile (auth + premium required)

### User Routes (`/api/user`)
- `GET /get-user-creations` - Fetch user's all creations (auth required)
- `GET /get-published-creations` - Fetch public gallery (auth required)
- `POST /toggle-like-creation` - Like/unlike creation (auth required)

### Health Check
- `GET /` - Server status
- `GET /health` - Detailed health check

## 🔒 Premium Features

The following features require a Premium subscription (managed via Clerk):
- ✨ AI Image Generation
- 🖼️ Background Removal
- ✂️ Object Removal
-  🔧 Implementation Status

### Completed Features ✅ Profile Optimizer

Free tier limitations:
- Article Writer: 10 articles/month
- Blog Title Generator: 10 titles/month # Landing page
│           ├── Layout.jsx          # Dashboard layout
│           ├── LinkedInOptimizer.jsx  # LinkedIn tool
│           ├── RemoveBackground.jsx # BG removal
│           ├── RemoveObject.jsx    # Object removal
│           └── WriteArticle.jsx    # Article writer
│
├── server/                      # Backend Node.js application
│   ├── configs/               # Configuration setup
│   │   ├── cloudinary.js     # Cloudinary SDK config
│   │   ├── db.js             # Neon PostgreSQL config
│   │   └── multer.js         # File upload config
│   ├── controllers/          # Route controllers
│   │   ├── aiController.js   # AI features (6 endpoints)
│   │   └── userController.js # User data (3 endpoints)
│   ├── middlewares/         # Custom middlewares
│   │   └── auth.js          # Clerk authentication
│   ├── routes/              # API routes
│   │   ├── aiRoutes.js      # AI tool routes
│   │   └── userRoutes.js    # User data routes
│   └── uploads/             # Temporary file storage
```

## 🔧 Current Implementation Status

### Completed
- ✅ Modern UI implementation with Framer Motion animations
- ✅ Authentication setup with Clerk
- ✅ Responsive design and mobile optimization
- ✅ Basic routing and protected routes
- ✅ Landing page with interactive elements
- ✅ Dashboard layout and nav
- ✅ Backend API with Cohere AI integration
- ✅ Article generation service
- ✅ BCommunity features implementation
- 🔄 Public gallery optimization
- 🔄 Advanced analytics dashboard
- 🔄 Performance optimization for AI responsesreSQL/Neon)
- ✅ User creation tracking
- ✅ Premium tier access control
- ✅ Rate limiting with retry logic
- ✅ CORS configuration for production
- ✅ Error handling and user feedbackigation
- ✅ User dashboard analytics enhancement
- ⏳ Batch processing capabilities
- ⏳ Advanced sharing features
- ⏳ Team collaboration tools
- ⏳ Usage analytics and insights
- ⏳ API rate optimiz implementation
- 🔄 Premium tier functionality
- 🔄 Image generation service
- 🔄 Article generation service

### Pending
- ⏳ Resume review system
- ⏳ User content management
- ⏳ Community features
- ⏳ Analytics integration

## �️ Roadmap

### Phase 1 (Current)
- Complete core AI tool implementations
### Phase 1 (Completed ✅)
- ✅ Complete core AI tool implementations
- ✅ Finalize backend API structure
- ✅ Implement premium tier system
- ✅ Add error handling and loading states
- ✅ Implement retry logic for API calls

### Phase 2 (Current)
- 🔄 Optimize AI response times
- 🔄 Add user dashboard analytics
- 🔄 Implement content saving system
- 🔄 Add batch processing capabilities
- 🔄 Enhance community features

### Phase 3 (Future)
- ⏳ Advanced sharing capabilities
- ⏳ Implement collaboration tools
- ⏳ Add real-time features
- ⏳ Performance optimizations
- ⏳ Mobile app development

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
