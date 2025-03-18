// This file contains utility functions for payment processing

// Types for payment-related data
export interface PaymentDetails {
  amount: number
  currency: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  description: string
  paymentMethod: string
}

// Function to generate a razorpay order ID (mock)
export function generateRazorpayOrderId(): string {
  return `order_${Math.random().toString(36).substring(2, 15)}`
}

// Function to generate UPI payment link
export function generateUpiPaymentLink(
  upiId: string,
  amount: number,
  orderId: string,
  merchantName = "Brushes and Beyond",
): string {
  // In a real app, this would generate a proper UPI deep link
  // Format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&tr=REFERENCE&cu=CURRENCY
  const amountInPaise = amount * 100 // UPI amount is in paise
  return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${amountInPaise}&tr=${encodeURIComponent(orderId)}&cu=INR`
}

// Function to format credit card number with spaces
export function formatCreditCardNumber(cardNumber: string): string {
  return cardNumber
    .replace(/\s/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
}

// Function to validate Indian credit card
export function validateIndianCreditCard(cardNumber: string): boolean {
  // Remove spaces
  cardNumber = cardNumber.replace(/\s/g, "")

  // Regular expression for common Indian credit cards
  // This is a simplified validation, real validation would be more complex
  const cardRegex = /^(4|5|6)[0-9]{15}$/

  return cardRegex.test(cardNumber)
}

// Function to validate UPI ID
export function validateUpiId(upiId: string): boolean {
  // Basic UPI ID validation - username@provider
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/

  return upiRegex.test(upiId)
}

// Function to validate a basic Indian phone number
export function validateIndianPhone(phone: string): boolean {
  // Indian mobile numbers are 10 digits, often with +91 prefix
  const phoneRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/

  return phoneRegex.test(phone)
}

// Function to calculate convenience fee based on payment method (mock)
export function calculateConvenienceFee(amount: number, paymentMethod: string): number {
  switch (paymentMethod) {
    case "upi":
      return 0 // UPI is often free
    case "card":
      return Math.round(amount * 0.02) // 2% for cards
    case "netbanking":
      return Math.round(amount * 0.01) // 1% for netbanking
    case "wallet":
      return Math.round(amount * 0.015) // 1.5% for wallets
    case "cod":
      return 50 // Fixed fee for COD
    default:
      return 0
  }
}

// Mock function to simulate payment status check
export async function checkPaymentStatus(paymentId: string): Promise<string> {
  // In a real app, this would make an API call to your payment gateway
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly return success or failure for demo purposes
      const status = Math.random() > 0.2 ? "success" : "failed"
      resolve(status)
    }, 1000)
  })
}

