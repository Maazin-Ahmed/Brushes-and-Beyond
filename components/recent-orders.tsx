"use client"
import Link from "next/link"
import { Check, Clock, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample data
const orders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    date: "2023-06-20",
    status: "completed",
    total: "₹1,299",
  },
  {
    id: "ORD-002",
    customer: "Rahul Patel",
    date: "2023-06-19",
    status: "processing",
    total: "₹2,499",
  },
  {
    id: "ORD-003",
    customer: "Ananya Gupta",
    date: "2023-06-18",
    status: "completed",
    total: "₹899",
  },
  {
    id: "ORD-004",
    customer: "Vikram Singh",
    date: "2023-06-17",
    status: "cancelled",
    total: "₹1,799",
  },
  {
    id: "ORD-005",
    customer: "Neha Kapoor",
    date: "2023-06-16",
    status: "processing",
    total: "₹3,299",
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 text-xs text-muted-foreground">
        <div>Order</div>
        <div>Customer</div>
        <div>Date</div>
        <div>Status</div>
        <div className="text-right">Total</div>
      </div>
      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-5 items-center py-2 text-sm">
            <div>
              <Link href={`/admin/orders/${order.id}`} className="font-medium hover:underline">
                {order.id}
              </Link>
            </div>
            <div>{order.customer}</div>
            <div>{order.date}</div>
            <div>
              <Badge
                variant="outline"
                className={cn(
                  "capitalize",
                  order.status === "completed" && "border-green-500 text-green-500",
                  order.status === "processing" && "border-blue-500 text-blue-500",
                  order.status === "cancelled" && "border-red-500 text-red-500",
                )}
              >
                {order.status === "completed" && <Check className="mr-1 h-3 w-3" />}
                {order.status === "processing" && <Clock className="mr-1 h-3 w-3" />}
                {order.status === "cancelled" && <X className="mr-1 h-3 w-3" />}
                {order.status}
              </Badge>
            </div>
            <div className="text-right font-medium">{order.total}</div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full">
        View All Orders
      </Button>
    </div>
  )
}

