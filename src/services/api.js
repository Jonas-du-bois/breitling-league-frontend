import axios from 'axios'

/**
 * Configuration API centralisée - Pattern CLEAN
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: false
})

// === REQUEST INTERCEPTOR ===
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // S'assurer que le token commence par "Bearer "
      const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`
      config.headers.Authorization = formattedToken
    }
    return config
  },
  (error) => Promise.reject(error)
)

// === RESPONSE INTERCEPTOR ===
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré - nettoyage automatique
      localStorage.removeItem('auth_token')
    }
    
    return Promise.reject(error)
  }
)

// === API METHODS ===

// Events API
export const eventsAPI = {
  // Get all events
  getEvents: () => api.get('/events'),
  
  // Get single event
  getEvent: (id) => api.get(`/events/${id}`),
  
  // Get events with units
  getEventsWithUnits: () => api.get('/events?include=units')
}

// Units API
export const unitsAPI = {
  // Get random units for discovery section
  getRandomUnits: (count = 6) => api.get(`/units/random?count=${count}`),
  
  // Get unit by ID
  getUnit: (id) => api.get(`/units/${id}`),
  
  // Get units by type
  getUnitsByType: (type) => api.get(`/units?type=${type}`)
}

// Quiz API
export const quizAPI = {
  // Get available quiz types
  getQuizTypes: () => api.get('/quiz/types'),
  
  // Start a new quiz
  startQuiz: (type = null) => api.post('/quiz/start', { type }),
  
  // Submit quiz answer
  submitAnswer: (quizInstanceId, questionId, answer) => 
    api.post('/quiz/submit', {
      quiz_instance_id: quizInstanceId,
      question_id: questionId,
      answer
    }),
  
  // Complete quiz and get results
  completeQuiz: (quizInstanceId) => 
    api.post(`/quiz/complete/${quizInstanceId}`),
  
  // Get quiz results
  getQuizResults: (quizInstanceId) => 
    api.get(`/quiz/results/${quizInstanceId}`)
}

// User Progress API
export const progressAPI = {
  // Get user progress
  getUserProgress: (userId) => api.get(`/users/${userId}/progress`),
  
  // Get leaderboard
  getLeaderboard: (limit = 10) => api.get(`/leaderboard?limit=${limit}`),
  
  // Get user ranking position
  getUserRanking: (userId) => api.get(`/users/${userId}/ranking`)
}

// Novelty/Discovery API
export const noveltyAPI = {
  // Search novelty content
  searchNovelty: (query) => api.get(`/novelty/search?q=${encodeURIComponent(query)}`),
  
  // Get trending novelty content
  getTrendingNovelty: () => api.get('/novelty/trending'),
  
  // Get random novelty items
  getRandomNovelty: (count = 6) => api.get(`/novelty/random?count=${count}`)
}

// Authentication API
export const authAPI = {
  // Login user
  login: (credentials) => api.post('/login', credentials),
  
  // Register user
  register: (userData) => api.post('/register', userData),
  
  // Get current user
  getMe: () => api.get('/me'),
  
  // Logout
  logout: () => api.post('/logout'),
  
  // Logout from all devices
  logoutAll: () => api.post('/logout-all')
}

// Auto-login functionality
export const autoLogin = {
  // Check if auto-login has already been performed
  hasAutoLoggedIn: () => {
    return localStorage.getItem('auto_login_performed') === 'true'
  },
  
  // Mark auto-login as performed
  markAutoLoginPerformed: () => {
    localStorage.setItem('auto_login_performed', 'true')
  },
  
  // Perform automatic login with Lucas credentials
  performAutoLogin: async () => {
    // Check if already logged in
    const existingToken = localStorage.getItem('auth_token')
    if (existingToken) {
      console.log('🔑 User already has a token, skipping auto-login')
      return true
    }
    
    // Check if auto-login already performed in this session
    if (autoLogin.hasAutoLoggedIn()) {
      console.log('🔄 Auto-login already performed in this session')
      return false
    }
    
    try {
      console.log('🤖 Performing automatic login for lucas@example.com...')
        const credentials = {
        email: 'lucas@example.com', // Updated to match the seeded user
        password: 'password'
      }
      
      const response = await authAPI.login(credentials)
      
      // Store the token
      const token = response.data.access_token || response.data.token
      if (token) {
        const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`
        localStorage.setItem('auth_token', formattedToken)
        console.log('✅ Auto-login successful for lucas@example.com')
        
        // Mark auto-login as performed
        autoLogin.markAutoLoginPerformed()
        return true
      } else {
        console.error('❌ No token received from auto-login')
        return false
      }
    } catch (error) {
      console.error('❌ Auto-login failed:', error.response?.data || error.message)
      // Mark as performed even if failed to avoid infinite retries
      autoLogin.markAutoLoginPerformed()
      return false
    }
  }
}

export default api
