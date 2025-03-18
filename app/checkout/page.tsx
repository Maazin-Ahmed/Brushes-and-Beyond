"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, CreditCard, MapPin, ShieldCheck, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

// Sample order data
const orderItems = [
  {
    id: 1,
    name: "Handmade Crocheted Rose Bouquet",
    price: 1299,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
  },
  {
    id: 2,
    name: "Custom Name Keychain",
    price: 499,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 2,
  },
  {
    id: 4,
    name: "Crocheted Sunflower",
    price: 699,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
  },
]

// Calculate order totals
const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shipping = subtotal > 999 ? 0 : 99
const tax = Math.round(subtotal * 0.18) // GST in India is typically 18%
const total = subtotal + shipping + tax

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    description: "Pay directly from your bank account using UPI",
    icon: "/placeholder.svg?height=30&width=30&text=UPI",
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Pay using Visa, Mastercard, RuPay, or other cards",
    icon: "/placeholder.svg?height=30&width=30&text=Card",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    description: "Pay directly from your bank account",
    icon: "/placeholder.svg?height=30&width=30&text=NB",
  },
  {
    id: "wallet",
    name: "Wallet",
    description: "Pay using Paytm, PhonePe, or other digital wallets",
    icon: "/placeholder.svg?height=30&width=30&text=Wallet",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order is delivered",
    icon: "/placeholder.svg?height=30&width=30&text=COD",
  },
]

// Indian states for dropdown
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Place order
      setOrderPlaced(true)
    }
  }

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
      window.scrollTo(0, 0)
    }
  }

  if (orderPlaced) {
    return (
      <div className="container py-16 max-w-4xl mx-auto">
        <motion.div
          className="bg-background rounded-xl shadow-sm border p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4 creative-heading">Thank You for Your Order!</h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
            Your order has been placed successfully. We have sent you an email with the order details.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8 max-w-md mx-auto text-left">
            <h2 className="font-medium mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-medium">BB-87654321</span>
              </div>
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span>{paymentMethod || "UPI"}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-medium">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary">
              <Link href="/account/orders">View Order Status</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col gap-2 mb-8">
        <Link
          href="/cart"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold creative-heading">Checkout</h1>
      </div>

      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="relative flex justify-between max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(activeStep - 1) * 50}%` }}
          />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                activeStep >= 1
                  ? "bg-primary text-white border-primary"
                  : "bg-background border-muted text-muted-foreground"
              }`}
            >
              <MapPin className="h-5 w-5" />
            </div>
            <span className={`text-sm font-medium ${activeStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              Shipping
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                activeStep >= 2
                  ? "bg-primary text-white border-primary"
                  : "bg-background border-muted text-muted-foreground"
              }`}
            >
              <Truck className="h-5 w-5" />
            </div>
            <span className={`text-sm font-medium ${activeStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              Delivery
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                activeStep >= 3
                  ? "bg-primary text-white border-primary"
                  : "bg-background border-muted text-muted-foreground"
              }`}
            >
              <CreditCard className="h-5 w-5" />
            </div>
            <span className={`text-sm font-medium ${activeStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              Payment
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-background rounded-xl shadow-sm border p-6">
            {/* Step 1: Shipping Address */}
            {activeStep === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-medium mb-6">Shipping Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" className="mt-1 rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select defaultValue="">
                      <SelectTrigger className="mt-1 rounded-lg">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase().replace(/\s/g, "-")}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue="India" disabled className="mt-1 rounded-lg bg-muted" />
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <Checkbox id="saveAddress" />
                  <Label htmlFor="saveAddress" className="ml-2 text-sm">
                    Save this address for future orders
                  </Label>
                </div>

                <div className="flex items-center mb-4">
                  <Checkbox id="billingAddress" />
                  <Label htmlFor="billingAddress" className="ml-2 text-sm">
                    Billing address is the same as shipping address
                  </Label>
                </div>
              </motion.div>
            )}

            {/* Step 2: Delivery Options */}
            {activeStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-medium mb-6">Delivery Method</h2>

                <RadioGroup
                  defaultValue="standard"
                  className="space-y-4 mb-8"
                  onValueChange={setShippingMethod}
                  value={shippingMethod}
                >
                  <div
                    className={`relative flex items-center border rounded-lg p-4 cursor-pointer ${
                      shippingMethod === "standard" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="standard" id="standard" className="mr-3" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="standard" className="font-medium cursor-pointer">
                          Standard Delivery
                        </Label>
                        <span className="font-medium">Free</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Delivery within 5-7 business days</p>
                    </div>
                  </div>

                  <div
                    className={`relative flex items-center border rounded-lg p-4 cursor-pointer ${
                      shippingMethod === "express" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="express" id="express" className="mr-3" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="express" className="font-medium cursor-pointer">
                          Express Delivery
                        </Label>
                        <span className="font-medium">₹149</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Delivery within 2-3 business days</p>
                    </div>
                  </div>

                  <div
                    className={`relative flex items-center border rounded-lg p-4 cursor-pointer ${
                      shippingMethod === "nextday" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="nextday" id="nextday" className="mr-3" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="nextday" className="font-medium cursor-pointer">
                          Next Day Delivery
                        </Label>
                        <span className="font-medium">₹299</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Order before 2 PM for next business day delivery (select cities only)
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-2">Delivery Address</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>Jane Doe</p>
                    <p>123 Main Street, Apartment 4B</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>India</p>
                    <p>+91 98765 43210</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 rounded-full text-xs">
                    Change Address
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Delivery Instructions (Optional)</h3>
                  <Input placeholder="Special instructions for delivery" className="rounded-lg" />
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment Options */}
            {activeStep === 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-medium mb-6">Payment Method</h2>

                <div className="space-y-4 mb-8">
                  <Tabs defaultValue="payment" className="w-full">
                    <TabsList className="grid grid-cols-5 mb-6">
                      <TabsTrigger value="upi" className="flex flex-col items-center gap-1 py-3">
                        <Image src="/placeholder.svg?height=30&width=30&text=UPI" alt="UPI" width={30} height={30} />
                        <span className="text-xs">UPI</span>
                      </TabsTrigger>
                      <TabsTrigger value="card" className="flex flex-col items-center gap-1 py-3">
                        <Image src="/placeholder.svg?height=30&width=30&text=Card" alt="Card" width={30} height={30} />
                        <span className="text-xs">Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="netbanking" className="flex flex-col items-center gap-1 py-3">
                        <Image
                          src="/placeholder.svg?height=30&width=30&text=NB"
                          alt="Net Banking"
                          width={30}
                          height={30}
                        />
                        <span className="text-xs">Net Banking</span>
                      </TabsTrigger>
                      <TabsTrigger value="wallet" className="flex flex-col items-center gap-1 py-3">
                        <Image
                          src="/placeholder.svg?height=30&width=30&text=Wallet"
                          alt="Wallet"
                          width={30}
                          height={30}
                        />
                        <span className="text-xs">Wallet</span>
                      </TabsTrigger>
                      <TabsTrigger value="cod" className="flex flex-col items-center gap-1 py-3">
                        <Image src="/placeholder.svg?height=30&width=30&text=COD" alt="COD" width={30} height={30} />
                        <span className="text-xs">COD</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upi" className="border rounded-lg p-6">
                      <h3 className="font-medium mb-4">Pay using UPI</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input id="upiId" placeholder="name@upi" className="mt-1 rounded-lg" />
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">Or pay using UPI apps:</span>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="rounded-full">
                              <Image
                                src="/placeholder.svg?height=20&width=20&text=G-Pay"
                                alt="Google Pay"
                                width={20}
                                height={20}
                                className="mr-1"
                              />
                              GPay
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full">
                              <Image
                                src="/placeholder.svg?height=20&width=20&text=P-Pe"
                                alt="PhonePe"
                                width={20}
                                height={20}
                                className="mr-1"
                              />
                              PhonePe
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full">
                              <Image
                                src="/placeholder.svg?height=20&width=20&text=Paytm"
                                alt="Paytm"
                                width={20}
                                height={20}
                                className="mr-1"
                              />
                              Paytm
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You'll receive a payment request notification on your UPI app.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="card" className="border rounded-lg p-6">
                      <h3 className="font-medium mb-4">Pay using Credit/Debit Card</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" className="mt-1 rounded-lg" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" className="mt-1 rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input id="nameOnCard" placeholder="John Doe" className="mt-1 rounded-lg" />
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="saveCard" />
                          <Label htmlFor="saveCard" className="ml-2 text-sm">
                            Save this card for future transactions
                          </Label>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="netbanking" className="border rounded-lg p-6">
                      <h3 className="font-medium mb-4">Pay using Net Banking</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                            <Image
                              src="/placeholder.svg?height=30&width=30&text=SBI"
                              alt="SBI"
                              width={30}
                              height={30}
                            />
                            <span className="mt-2 text-xs">SBI</span>
                          </Button>
                          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                            <Image
                              src="/placeholder.svg?height=30&width=30&text=HDFC"
                              alt="HDFC"
                              width={30}
                              height={30}
                            />
                            <span className="mt-2 text-xs">HDFC</span>
                          </Button>
                          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                            <Image
                              src="/placeholder.svg?height=30&width=30&text=ICICI"
                              alt="ICICI"
                              width={30}
                              height={30}
                            />
                            <span className="mt-2 text-xs">ICICI</span>
                          </Button>
                          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                            <Image
                              src="/placeholder.svg?height=30&width=30&text=Axis"
                              alt="Axis"
                              width={30}
                              height={30}
                            />
                            <span className="mt-2 text-xs">Axis</span>
                          </Button>
                        </div>
                        <div>
                          <Label htmlFor="otherBank">Other Banks</Label>
                          <Select defaultValue="">
                            <SelectTrigger className="mt-1 rounded-lg">
                              <SelectValue placeholder="Select your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                              <SelectItem value="yes">Yes Bank</SelectItem>
                              <SelectItem value="idfc">IDFC First Bank</SelectItem>
                              <SelectItem value="bob">Bank of Baroda</SelectItem>
                              <SelectItem value="pnb">Punjab National Bank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="wallet" className="border rounded-lg p-6">
                      <h3 className="font-medium mb-4">Pay using Wallet</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                            <Image
                              src="/placeholder.svg?height=30&width=30&text=Paytm"
                              alt="Paytm"
                              width={30}
                              height={30}
                            />
                            <span className="mt-2 text-xs">Paytm</span>
                          </Button>
                          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                            <Image
                              src="/placeholder.svg?height=30&width=30&text=PhonePe"
                              alt="PhonePe"
                              width={30}
                              height={30}
                            />
                            <span className="mt-2 text-xs">PhonePe</span>
                          </Button>
                          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                            <Image
                              src="/placeholder.svg?height=30&width=30&text=Amazon"
                              alt="Amazon Pay"
                              width={30}
                              height={30}
                            />
                            <span className="mt-2 text-xs">Amazon Pay</span>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to the selected wallet provider to complete the payment.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="cod" className="border rounded-lg p-6">
                      <h3 className="font-medium mb-4">Cash on Delivery</h3>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Pay with cash when your order is delivered. An additional fee of ₹50 will be charged for this
                          payment method.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                          <p>Note: For orders above ₹5,000, Cash on Delivery is not available.</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Secure Payment</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is securely processed. We don't store your card details.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="ml-2 text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {activeStep > 1 ? (
                <Button variant="outline" onClick={prevStep} className="rounded-full px-6">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              ) : (
                <Button variant="outline" asChild className="rounded-full px-6">
                  <Link href="/cart">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </Link>
                </Button>
              )}

              <Button onClick={nextStep} className="rounded-full px-6 bg-gradient-to-r from-primary to-secondary">
                {activeStep < 3 ? (
                  <>
                    Continue
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <motion.div
            className="bg-background rounded-xl shadow-sm border p-6 sticky top-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible defaultValue="items">
              <AccordionItem value="items" className="border-b-0">
                <AccordionTrigger className="text-xl font-medium py-2">Order Summary</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mb-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col text-sm">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground">Qty: {item.quantity}</span>
                          <div className="flex items-center justify-between mt-auto">
                            <span>₹{item.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator className="my-4" />

            <div className="space-y-4 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Secure checkout</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free shipping on orders above ₹999</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

