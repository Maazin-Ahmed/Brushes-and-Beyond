 "use client"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    // Show loading spinner or skeleton while checking auth status
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated() || !isAdmin()) {
    // Redirect to home page if not authenticated or not admin
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute

