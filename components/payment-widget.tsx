"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PaymentWidgetProps {
  amount: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PaymentWidget({ amount, onSuccess, onError }: PaymentWidgetProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedTab, setSelectedTab] = useState("upi")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      if (Math.random() > 0.2) {
        // 80% success rate for demo
        onSuccess?.()
      } else {
        onError?.("Payment failed. Please try again.")
      }
    }, 2000)
  }

  return (
    <div className="bg-background rounded-xl shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Make Payment</h2>
        <p className="text-muted-foreground">Amount: ₹{amount.toLocaleString()}</p>
      </div>

      <Tabs defaultValue="upi" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="upi" className="flex flex-col items-center gap-1 py-3">
            <Image src="/placeholder.svg?height=24&width=24&text=UPI" alt="UPI" width={24} height={24} />
            <span className="text-xs">UPI</span>
          </TabsTrigger>
          <TabsTrigger value="card" className="flex flex-col items-center gap-1 py-3">
            <Image src="/placeholder.svg?height=24&width=24&text=Card" alt="Card" width={24} height={24} />
            <span className="text-xs">Card</span>
          </TabsTrigger>
          <TabsTrigger value="netbanking" className="flex flex-col items-center gap-1 py-3">
            <Image src="/placeholder.svg?height=24&width=24&text=NB" alt="Net Banking" width={24} height={24} />
            <span className="text-xs">Net Banking</span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex flex-col items-center gap-1 py-3">
            <Image src="/placeholder.svg?height=24&width=24&text=Wallet" alt="Wallet" width={24} height={24} />
            <span className="text-xs">Wallet</span>
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="upi" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">UPI ID</label>
              <Input placeholder="username@upi" className="rounded-lg" required={selectedTab === "upi"} />
              <p className="text-xs text-muted-foreground mt-1">Enter your UPI ID (e.g., mobilenumber@upi)</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" size="sm" type="button" className="rounded-full flex items-center gap-1 h-8">
                <Image src="/placeholder.svg?height=16&width=16&text=G-Pay" alt="Google Pay" width={16} height={16} />
                GPay
              </Button>
              <Button variant="outline" size="sm" type="button" className="rounded-full flex items-center gap-1 h-8">
                <Image src="/placeholder.svg?height=16&width=16&text=PhonePe" alt="PhonePe" width={16} height={16} />
                PhonePe
              </Button>
              <Button variant="outline" size="sm" type="button" className="rounded-full flex items-center gap-1 h-8">
                <Image src="/placeholder.svg?height=16&width=16&text=Paytm" alt="Paytm" width={16} height={16} />
                Paytm
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="card" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Card Number</label>
              <Input placeholder="1234 5678 9012 3456" className="rounded-lg" required={selectedTab === "card"} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                <Input placeholder="MM/YY" className="rounded-lg" required={selectedTab === "card"} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">CVV</label>
                <Input placeholder="123" className="rounded-lg" required={selectedTab === "card"} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Name on Card</label>
              <Input placeholder="John Doe" className="rounded-lg" required={selectedTab === "card"} />
            </div>
          </TabsContent>

          <TabsContent value="netbanking" className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                <Image src="/placeholder.svg?height=24&width=24&text=SBI" alt="SBI" width={24} height={24} />
                <span className="mt-1 text-xs">SBI</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                <Image src="/placeholder.svg?height=24&width=24&text=HDFC" alt="HDFC" width={24} height={24} />
                <span className="mt-1 text-xs">HDFC</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                <Image src="/placeholder.svg?height=24&width=24&text=ICICI" alt="ICICI" width={24} height={24} />
                <span className="mt-1 text-xs">ICICI</span>
              </Button>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Select Bank</label>
              <select className="w-full rounded-lg border border-input px-3 py-2">
                <option value="">-- Select your bank --</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                <Image src="/placeholder.svg?height=24&width=24&text=Paytm" alt="Paytm" width={24} height={24} />
                <span className="mt-1 text-xs">Paytm</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                <Image src="/placeholder.svg?height=24&width=24&text=Phone" alt="PhonePe" width={24} height={24} />
                <span className="mt-1 text-xs">PhonePe</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-2 h-auto">
                <Image src="/placeholder.svg?height=24&width=24&text=Amazon" alt="Amazon Pay" width={24} height={24} />
                <span className="mt-1 text-xs">Amazon</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              You will be redirected to the selected wallet provider to complete the payment.
            </p>
          </TabsContent>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-primary to-secondary py-6 text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Processing...
                </motion.div>
              ) : (
                `Pay ₹${amount.toLocaleString()}`
              )}
            </Button>
          </div>
        </form>
      </Tabs>

      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <span>Secure payment powered by Brushes and Beyond. Your payment information is protected.</span>
      </div>
    </div>
  )
}

