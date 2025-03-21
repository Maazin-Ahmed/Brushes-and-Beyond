"use client"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    // Show loading spinner or skeleton while checking auth status
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}

export default PrivateRoute

