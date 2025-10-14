# Toolie AI

Toolie AI is a modern SaaS platform offering a suite of AI-powered tools to supercharge your productivity. Inspired by leading AI SaaS products, Toolie AI provides features like article writing, blog title generation, image generation, and more—all in a beautiful, responsive web app.

## Features
- ✍️ **AI Article Writer**: Generate high-quality, engaging articles on any topic.
- 📝 **Blog Title Generator**: Find the perfect, catchy title for your blog posts.
- 🖼️ **AI Image Generation**: Create stunning visuals with AI.
- 🧹 **Background Removal**: Effortlessly remove backgrounds from your images.
- 🧑‍💼 **Resume Review**: Get instant feedback on your resume.
- 🎨 **Modern UI**: Clean, responsive design inspired by top SaaS landing pages.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Clerk (for user management)
- **Deployment**: Vercel/Netlify (recommended)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
https://github.com/SahilSuman1011/Toolie-AI.git
cd Toolie-AI/client

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` by default.

### Folder Structure
```
client/
  public/           # Static assets (backgrounds, icons)
  src/
    assets/         # Images, SVGs, and asset exports
    components/     # React components (Navbar, Hero, etc.)
    pages/          # Page components for each tool
    index.css       # Tailwind and global styles
    App.jsx         # Main app component
    main.jsx        # Entry point
```

## Customization
- Update the logo and branding in `src/assets/` and `Navbar.jsx`.
- Add or modify AI tools in `src/pages/` and `src/assets/assets.js`.
- Edit theme colors in `index.css` or Tailwind config.

## Deployment
Deploy easily to Vercel, Netlify, or your preferred static hosting provider.

## License
This project is licensed under the MIT License.
