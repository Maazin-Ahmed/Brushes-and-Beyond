"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "react-feather"

const toastIcons = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
}

const toastStyles = {
  success: "bg-success text-white",
  error: "bg-error text-white",
  warning: "bg-warning text-white",
  info: "bg-info text-white",
}

const Toast = ({ id, type = "info", message, duration = 5000, onDismiss }) => {
  const [progress, setProgress] = useState(100)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Fade in
    setTimeout(() => setVisible(true), 10)

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 100 / (duration / 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [duration])

  const handleDismiss = () => {
    setVisible(false)
    setTimeout(() => onDismiss(id), 300) // Wait for fade out animation
  }

  return (
    <div
      className={`max-w-md w-full rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${toastStyles[type]}`}
      role="alert"
    >
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0 mr-3">{toastIcons[type]}</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button onClick={handleDismiss} className="ml-4 flex-shrink-0 text-white hover:text-gray-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="h-1 bg-white bg-opacity-20" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default Toast

