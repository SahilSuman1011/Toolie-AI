import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

 // Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

// Enforce dark mode globally and permanently
if (typeof document !== 'undefined') {
  // Add dark class to html element
  document.documentElement.classList.add('dark');
  // Lock dark mode in localStorage
  localStorage.setItem('toolie-theme', 'dark');
  
  // Prevent any attempt to remove dark mode
  const observer = new MutationObserver(() => {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
}

createRoot(document.getElementById('root')).render(

  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ClerkProvider>
)
