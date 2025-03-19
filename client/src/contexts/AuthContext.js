"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useToast } from "../hooks/useToast"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
    }

    setLoading(false)
  }, [])

  // Register user
  const register = async (userData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, userData)

      const { token, user } = response.data

      // Save to localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Set state
      setToken(token)
      setUser(user)

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      showToast("success", "Registration successful!")

      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Please try again."
      setError(message)
      showToast("error", message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      })

      const { token, user } = response.data

      // Save to localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Set state
      setToken(token)
      setUser(user)

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      showToast("success", "Login successful!")

      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please check your credentials."
      setError(message)
      showToast("error", message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    // Remove from localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // Clear state
    setToken(null)
    setUser(null)

    // Remove axios default header
    delete axios.defaults.headers.common["Authorization"]

    showToast("info", "You have been logged out.")
  }

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/profile`, userData)

      const updatedUser = response.data.data

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update state
      setUser(updatedUser)

      showToast("success", "Profile updated successfully!")

      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update profile. Please try again."
      setError(message)
      showToast("error", message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  // Check if user is authenticated
  const isAuthenticated = () => !!token

  // Check if user is admin
  const isAdmin = () => user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

