# Toolie AI - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technical Stack](#technical-stack)
3. [Frontend Implementation](#frontend-implementation)
4. [Backend Implementation](#backend-implementation)
5. [Security Measures](#security-measures)
6. [API Documentation](#api-documentation)
7. [Deployment Guide](#deployment-guide)
8. [Common Issues & Solutions](#common-issues--solutions)
9. [Technical Interview Questions](#technical-interview-questions)

## Architecture Overview

Toolie AI follows a modern client-server architecture with a clear separation of concerns:

```
Client (React + Vite) <-> Express Server <-> External Services
                                           (Gemini, Clipdrop, etc.)
```

### Key Architecture Decisions
- **Frontend**: Single Page Application (SPA) using React 18
- **Backend**: RESTful API using Express.js
- **Authentication**: Clerk for secure user management
- **File Storage**: Cloudinary for image management
- **State Management**: React Hooks for local state
- **API Communication**: Axios with interceptors

## Technical Stack

### Frontend Technologies
```javascript
{
  "framework": "React 18",
  "bundler": "Vite",
  "styling": "Tailwind CSS",
  "animations": "Framer Motion",
  "routing": "React Router v6",
  "icons": "Lucide React",
  "auth": "Clerk React",
  "notifications": "React Hot Toast",
  "markdown": "React Markdown"
}
```

### Backend Technologies
```javascript
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "PostgreSQL",
  "auth": "Clerk Express",
  "storage": "Cloudinary",
  "AI_Services": ["Google Gemini", "Clipdrop API"]
}
```

## Frontend Implementation

### Component Architecture
- **Layout Components**: Base structure (Layout.jsx, Sidebar.jsx)
- **Feature Components**: Tool-specific implementations
- **UI Components**: Reusable UI elements
- **Pages**: Route-specific views

### Key Features Implementation

#### Authentication Flow
```jsx
// App.jsx
<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          {/* Protected routes */}
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
</ClerkProvider>
```

#### Protected Routes
```jsx
// Components utilizing authentication
const {getToken} = useAuth();
const {user} = useUser();

// API calls with auth
const response = await axios.post('/api/ai/generate-article', data, {
  headers: {Authorization: \`Bearer \${await getToken()}\`}
});
```

#### File Download Implementation
```javascript
const handleDownload = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    toast.error('Download failed');
  }
};
```

## Backend Implementation

### API Architecture
```javascript
// Server setup
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(requireAuth());

// Route structure
app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);
```

### Middleware Implementation
```javascript
// Auth middleware
const auth = async (req, res, next) => {
  try {
    // Clerk authentication
    const userId = req.auth.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
```

### AI Service Integration
```javascript
// Example AI controller
const generateArticle = async (req, res) => {
  try {
    const { prompt, length } = req.body;
    const response = await geminiApi.generateContent(prompt, length);
    res.json({ success: true, content: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

## Security Measures

### Implemented Security Features
1. **Authentication**: Clerk for secure user management
2. **Authorization**: Protected routes and endpoints
3. **CORS**: Configured for secure cross-origin requests
4. **Content Security Policy**: Strict CSP headers
5. **Rate Limiting**: API request limiting
6. **Input Validation**: Request body validation
7. **Secure Headers**: HTTP security headers

### CSP Configuration
```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.sahilsuman.dev;"
  );
  next();
});
```

## API Documentation

### Authentication Endpoints
- POST `/api/auth/signup`: User registration
- POST `/api/auth/signin`: User authentication
- GET `/api/auth/user`: Get user profile

### AI Tool Endpoints
- POST `/api/ai/generate-article`: Generate article content
- POST `/api/ai/generate-blog-title`: Generate blog titles
- POST `/api/ai/generate-image`: Generate AI images
- POST `/api/ai/remove-background`: Remove image background
- POST `/api/ai/remove-object`: Remove objects from image
- POST `/api/ai/linkedin-optimize`: Optimize LinkedIn content

### User Data Endpoints
- GET `/api/user/get-user-creations`: Get user's creations
- GET `/api/user/get-published-creations`: Get public creations
- POST `/api/user/publish-creation`: Publish a creation

## Common Issues & Solutions

### Frontend Issues
1. **CORS Errors**
   - Solution: Proper CORS configuration in backend
   - Check API endpoint URLs

2. **Authentication Issues**
   - Verify Clerk configuration
   - Check token expiration
   - Validate API headers

3. **Image Processing Errors**
   - Validate file formats
   - Check file size limits
   - Ensure proper error handling

### Backend Issues
1. **Rate Limiting**
   - Implement proper rate limiting
   - Monitor API usage

2. **Memory Leaks**
   - Clean up file uploads
   - Monitor server resources

3. **API Timeouts**
   - Implement request timeouts
   - Handle long-running processes

## Technical Interview Questions

### React & Frontend

#### 1. Authentication & Authorization
**Q: Explain the complete authentication flow in Toolie AI**
- A: Toolie AI implements a comprehensive authentication system using Clerk:
```javascript
// 1. Initial Setup in main.jsx
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ClerkProvider>

// 2. Protected Route Implementation
const ProtectedRoute = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login');
    }
  }, [isLoaded, userId, navigate]);

  return isLoaded && userId ? <Outlet /> : null;
};

// 3. API Authentication
const makeAuthenticatedRequest = async () => {
  const token = await getToken();
  return axios.post('/api/endpoint', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
```

**Q: How do you handle session expiration and token refresh?**
- A: Session management is handled through:
```javascript
// Session monitoring
useEffect(() => {
  const handleSessionChange = (session) => {
    if (!session) {
      // Clear local state
      clearUserData();
      // Redirect to login
      navigate('/login');
    }
  };
  
  return clerk.addListener((session) => handleSessionChange(session));
}, []);
```

#### 2. State Management & Data Flow
**Q: Explain the state management architecture in detail**
- A: The application uses a combination of local and shared state management:

1. **Component-Level State**:
```javascript
// Local state for form handling
const [formData, setFormData] = useState({
  title: '',
  content: '',
  isPublic: false
});

// Loading and error states
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

2. **Custom Hooks for Reusable Logic**:
```javascript
// Custom hook for API calls
const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {getToken} = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData };
};
```

3. **Context for Global State**:
```javascript
// UserContext.js
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState({});
  const [creations, setCreations] = useState([]);

  const updatePreferences = (newPrefs) => {
    setUserPreferences(prev => ({...prev, ...newPrefs}));
  };

  return (
    <UserContext.Provider value={{ 
      userPreferences, 
      updatePreferences,
      creations,
      setCreations
    }}>
      {children}
    </UserContext.Provider>
  );
};
```

#### 3. Performance Optimization
**Q: What specific optimizations are implemented for better performance?**
- A: The application implements several optimization techniques:

1. **Code Splitting**:
```javascript
// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ImageGenerator = lazy(() => import('./pages/ImageGenerator'));

// Component with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/generate-image" element={<ImageGenerator />} />
  </Routes>
</Suspense>
```

2. **Memoization**:
```javascript
// Memoized component
const MemoizedImageCard = memo(ImageCard, (prevProps, nextProps) => {
  return prevProps.imageUrl === nextProps.imageUrl &&
         prevProps.title === nextProps.title;
});

// Memoized callback
const handleImageGeneration = useCallback(async (prompt) => {
  setLoading(true);
  try {
    const result = await generateImage(prompt);
    setImages(prev => [...prev, result]);
  } finally {
    setLoading(false);
  }
}, []);
```

3. **Image Optimization**:
```javascript
// Progressive image loading
const ImageWithLoader = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="image-container">
      {isLoading && <Skeleton />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={`image ${isLoading ? 'hidden' : ''}`}
      />
    </div>
  );
};
```

### Node.js & Backend

#### 1. API Architecture
**Q: Explain the API architecture and middleware implementation**
- A: The API follows a layered architecture:

1. **Request Flow**:
```javascript
// 1. Global Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimit(rateLimitConfig));

// 2. Authentication Middleware
app.use(clerkMiddleware());
app.use(requireAuth());

// 3. Route-Specific Middleware
aiRouter.use('/generate-image', validateImageRequest);

// 4. Controller
const generateImage = async (req, res, next) => {
  try {
    const result = await imageService.generate(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
```

2. **Error Handling**:
```javascript
// Global error handler
app.use((error, req, res, next) => {
  logger.error(error);
  
  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
  
  if (error instanceof AuthenticationError) {
    return res.status(401).json({
      success: false,
      error: 'Authentication failed'
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});
```

#### 2. Database & Data Modeling
**Q: How is data modeling and database interaction implemented?**
- A: The application uses PostgreSQL with structured models:

1. **User Model**:
```javascript
const userSchema = {
  id: 'uuid',
  clerk_id: 'string',
  email: 'string',
  preferences: 'jsonb',
  created_at: 'timestamp',
  updated_at: 'timestamp'
};

// User creation
const createUser = async (clerkUser) => {
  const result = await db.query(
    'INSERT INTO users (clerk_id, email) VALUES ($1, $2) RETURNING *',
    [clerkUser.id, clerkUser.email]
  );
  return result.rows[0];
};
```

2. **Creations Model**:
```javascript
const creationSchema = {
  id: 'uuid',
  user_id: 'uuid',
  type: 'string',
  content: 'text',
  metadata: 'jsonb',
  is_public: 'boolean',
  created_at: 'timestamp'
};

// Query optimization
const getUserCreations = async (userId) => {
  return db.query(`
    SELECT c.*, u.email as creator_email
    FROM creations c
    JOIN users u ON c.user_id = u.id
    WHERE c.user_id = $1
    ORDER BY c.created_at DESC
  `, [userId]);
};
```

### System Design & Scaling

#### 1. System Architecture
**Q: How would you design Toolie AI to handle millions of users?**
- A: The system would be designed with scalability in mind:

1. **Load Balancing**:
```javascript
// HAProxy configuration example
frontend http_front
  bind *:80
  stats uri /haproxy?stats
  default_backend http_back

backend http_back
  balance roundrobin
  server server1 10.0.0.1:80 check
  server server2 10.0.0.2:80 check
```

2. **Caching Strategy**:
```javascript
// Redis caching implementation
const cacheMiddleware = async (req, res, next) => {
  const key = `${req.url}-${req.user.id}`;
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    res.originalJson = res.json;
    res.json = (data) => {
      redis.setex(key, 3600, JSON.stringify(data));
      res.originalJson(data);
    };
    next();
  } catch (error) {
    next();
  }
};
```

3. **Queue System**:
```javascript
// Bull queue for image processing
const imageQueue = new Bull('image-processing');

imageQueue.process(async (job) => {
  const { imageUrl, userId } = job.data;
  const result = await processImage(imageUrl);
  await notifyUser(userId, result);
  return result;
});

// Add job to queue
const handleImageGeneration = async (req, res) => {
  const jobId = await imageQueue.add({
    imageUrl: req.body.url,
    userId: req.user.id
  });
  res.json({ jobId });
};
```

#### 2. Monitoring & Debugging
**Q: How do you implement comprehensive monitoring?**
- A: The system uses multiple monitoring layers:

1. **Performance Monitoring**:
```javascript
// Express middleware for request timing
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.path,
      duration,
      status: res.statusCode
    });
  });
  next();
});
```

2. **Error Tracking**:
```javascript
// Error tracking setup
const errorHandler = (error, req, res, next) => {
  // Log error details
  logger.error({
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id,
    timestamp: new Date()
  });

  // Send to error tracking service
  errorTracker.captureException(error, {
    user: req.user,
    extra: {
      url: req.url,
      body: req.body
    }
  });

  next(error);
};
```

3. **Health Checks**:
```javascript
// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    await redis.ping();
    
    res.json({
      status: 'healthy',
      services: {
        database: 'connected',
        redis: 'connected',
        api: 'running'
      },
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

These detailed answers cover the core technical aspects of Toolie AI and provide concrete implementation examples for each concept.