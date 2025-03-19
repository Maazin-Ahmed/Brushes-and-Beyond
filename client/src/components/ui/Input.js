"use client"

import { forwardRef } from "react"

const Input = forwardRef(
  (
    {
      type = "text",
      label,
      id,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      disabled = false,
      required = false,
      className = "",
      icon = null,
      iconPosition = "left",
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
    const stateClasses = error
      ? "border-error focus:border-error focus:ring-error/50"
      : "border-input focus:border-primary"
    const disabledClasses = disabled ? "bg-muted cursor-not-allowed" : "bg-background"
    const iconClasses = icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block mb-1 text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            className={`${baseClasses} ${stateClasses} ${disabledClasses} ${iconClasses} ${className}`}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input

