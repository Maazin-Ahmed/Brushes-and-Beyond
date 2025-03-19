import axios from "axios"

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: Number.parseInt(process.env.REACT_APP_API_TIMEOUT || "30000"),
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token")

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      // Check if error is due to token expiration
      if (error.response.data.message?.includes("expired")) {
        // Clear localStorage
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        // Redirect to login page
        window.location.href = "/login?session=expired"
      }
    }

    return Promise.reject(error)
  },
)

// API service methods
const apiService = {
  // Auth endpoints
  auth: {
    register: (userData) => api.post("/auth/register", userData),
    login: (email, password) => api.post("/auth/login", { email, password }),
    getProfile: () => api.get("/auth/profile"),
    updateProfile: (userData) => api.put("/auth/profile", userData),
    updatePassword: (passwordData) => api.put("/auth/password", passwordData),
  },

  // Product endpoints
  products: {
    getAll: (params) => api.get("/products", { params }),
    getById: (id) => api.get(`/products/${id}`),
    create: (productData) => api.post("/products", productData),
    update: (id, productData) => api.put(`/products/${id}`, productData),
    delete: (id) => api.delete(`/products/${id}`),
    addReview: (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData),
  },

  // Cart endpoints
  cart: {
    get: () => api.get("/cart"),
    add: (item) => api.post("/cart", item),
    update: (id, quantity) => api.put(`/cart/${id}`, { quantity }),
    remove: (id) => api.delete(`/cart/${id}`),
    clear: () => api.delete("/cart"),
  },

  // Order endpoints
  orders: {
    getAll: () => api.get("/orders"),
    getById: (id) => api.get(`/orders/${id}`),
    create: (orderData) => api.post("/orders", orderData),
    updateToPaid: (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult),
    updateToDelivered: (id) => api.put(`/orders/${id}/deliver`),
  },

  // Contact endpoints
  contact: {
    submit: (contactData) => api.post("/contact", contactData),
    getAll: () => api.get("/contact"),
    updateStatus: (id, statusData) => api.put(`/contact/${id}`, statusData),
  },
}

export default apiService

