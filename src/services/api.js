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

export default api
