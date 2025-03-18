"use client"

// Inspired by react-hot-toast library
import type * as React from "react"
import { useState, useCallback } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastOptions = Omit<ToastProps, "id">

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(({ title, description, action, variant = "default" }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, action, variant }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}

