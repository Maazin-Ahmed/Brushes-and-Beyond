"use client"

const variants = {
  primary: "bg-primary hover:bg-primary-dark text-white",
  secondary: "bg-secondary hover:bg-secondary-dark text-white",
  accent: "bg-accent hover:bg-accent-dark text-foreground",
  outline: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "bg-transparent hover:bg-muted text-foreground",
  link: "bg-transparent text-primary hover:underline",
  danger: "bg-error hover:bg-error/90 text-white",
}

const sizes = {
  sm: "py-1 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
  xl: "py-4 px-8 text-xl",
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  rounded = false,
  type = "button",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantClasses = variants[variant] || variants.primary
  const sizeClasses = sizes[size] || sizes.md
  const roundedClasses = rounded ? "rounded-full" : "rounded-md"
  const widthClasses = fullWidth ? "w-full" : ""

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${roundedClasses} ${widthClasses} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {icon && iconPosition === "left" && !loading && <span className="mr-2">{icon}</span>}

      {children}

      {icon && iconPosition === "right" && !loading && <span className="ml-2">{icon}</span>}
    </button>
  )
}

export default Button

