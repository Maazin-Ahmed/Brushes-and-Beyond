import Toast from "./Toast"
import { useToast } from "../../hooks/useToast"

const ToastContainer = () => {
  const { toasts, dismissToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onDismiss={dismissToast}
        />
      ))}
    </div>
  )
}

export default ToastContainer

