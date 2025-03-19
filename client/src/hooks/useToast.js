"use client"

import { useState, useCallback } from "react"

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((type, message, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9)

    setToasts((prevToasts) => [...prevToasts, { id, type, message, duration }])

    // Auto-dismiss after duration
    setTimeout(() => {
      dismissToast(id)
    }, duration)

    return id
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, showToast, dismissToast }
}

