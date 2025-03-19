"use client"

import { useState, useCallback } from "react"

export const useForm = (initialValues = {}, validate) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target

      setValues((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))

      // Clear error when field is changed
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }))
      }
    },
    [errors],
  )

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target

      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }))

      // Validate field on blur if validation function exists
      if (validate) {
        const fieldErrors = validate(values)
        if (fieldErrors[name]) {
          setErrors((prev) => ({
            ...prev,
            [name]: fieldErrors[name],
          }))
        }
      }
    },
    [values, validate],
  )

  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e.preventDefault()

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})

      setTouched(allTouched)

      // Validate all fields if validation function exists
      if (validate) {
        const formErrors = validate(values)
        setErrors(formErrors)

        // Don't submit if there are errors
        if (Object.keys(formErrors).length > 0) {
          return
        }
      }

      setIsSubmitting(true)

      try {
        await onSubmit(values)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate],
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  }
}

