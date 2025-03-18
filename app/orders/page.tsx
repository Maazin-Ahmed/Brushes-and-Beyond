"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, Clock, Package, Search, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample orders data
const orders = [
  {
    id: "BB-87654321",
    date: "2023-06-10",
    total: 3296,
    status: "delivered",
    items: [
      {
        id: 1,
        name: "Handmade Crocheted Rose Bouquet",
        price: 1299,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Custom Name Keychain",
        price: 499,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 4,
        name: "Crocheted Sunflower",
        price: 699,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    timeline: [
      { status: "ordered", date: "2023-06-10", time: "10:30 AM" },
      { status: "processing", date: "2023-06-10", time: "02:45 PM" },
      { status: "shipped", date: "2023-06-11", time: "11:15 AM" },
      { status: "delivered", date: "2023-06-15", time: "03:20 PM" },
    ],
    tracking: {
      number: "IND123456789",
      courier: "BlueDart",
      url: "#",
    },
  },
  {
    id: "BB-76543210",
    date: "2023-05-25",
    total: 2499,
    status: "delivered",
    items: [
      {
        id: 3,
        name: "Watercolor Brush Set",
        price: 899,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 5,
        name: "Personalized Family Keychain",
        price: 799,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    timeline: [
      { status: "ordered", date: "2023-05-25", time: "09:15 AM" },
      { status: "processing", date: "2023-05-25", time: "03:30 PM" },
      { status: "shipped", date: "2023-05-26", time: "10:45 AM" },
      { status: "delivered", date: "2023-05-30", time: "02:10 PM" },
    ],
    tracking: {
      number: "IND987654321",
      courier: "DTDC",
      url: "#",
    },
  },
  {
    id: "BB-65432109",
    date: "2023-07-05",
    total: 1799,
    status: "processing",
    items: [
      {
        id: 6,
        name: "Acrylic Paint Set",
        price: 1499,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 7,
        name: "Crocheted Tulip Arrangement",
        price: 300,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    timeline: [
      { status: "ordered", date: "2023-07-05", time: "11:45 AM" },
      { status: "processing", date: "2023-07-05", time: "04:30 PM" },
    ],
    tracking: null,
  },
  {
    id: "BB-54321098",
    date: "2023-07-01",
    total: 2499,
    status: "shipped",
    items: [
      {
        id: 8,
        name: "Artist Gift Set",
        price: 2499,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    timeline: [
      { status: "ordered", date: "2023-07-01", time: "01:30 PM" },
      { status: "processing", date: "2023-07-01", time: "05:15 PM" },
      { status: "shipped", date: "2023-07-02", time: "10:30 AM" },
    ],
    tracking: {
      number: "IND543219876",
      courier: "FedEx",
      url: "#",
    },
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const statusColor = (status: string) => {
    switch (status) {
      case "ordered":
        return "bg-blue-500"
      case "processing":
        return "bg-amber-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const statusDisplay = (status: string) => {
    switch (status) {
      case "ordered":
        return { icon: <Clock className="h-4 w-4" />, text: "Ordered", color: "bg-blue-500 text-white" }
      case "processing":
        return { icon: <Package className="h-4 w-4" />, text: "Processing", color: "bg-amber-500 text-white" }
      case "shipped":
        return { icon: <Truck className="h-4 w-4" />, text: "Shipped", color: "bg-purple-500 text-white" }
      case "delivered":
        return { icon: <Package className="h-4 w-4" />, text: "Delivered", color: "bg-green-500 text-white" }
      case "cancelled":
        return { icon: <Clock className="h-4 w-4" />, text: "Cancelled", color: "bg-red-500 text-white" }
      default:
        return { icon: <Clock className="h-4 w-4" />, text: "Unknown", color: "bg-gray-500 text-white" }
    }
  }

  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col gap-2 mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold creative-heading">My Orders</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="bg-background rounded-xl shadow-sm border p-6 sticky top-20">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-full"
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      className={`border rounded-lg p-4 cursor-pointer ${selectedOrder?.id === order.id ? "border-primary bg-primary/5" : ""}`}
                      onClick={() => setSelectedOrder(order)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()} • {order.items.length} item
                            {order.items.length !== 1 && "s"}
                          </p>
                        </div>
                        <Badge className={`${statusDisplay(order.status).color} flex items-center gap-1`}>
                          {statusDisplay(order.status).icon}
                          {statusDisplay(order.status).text}
                        </Badge>
                      </div>

                      <div className="flex gap-2 mt-3">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="relative w-12 h-12 border rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            {idx === 2 && order.items.length > 3 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-medium">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <p className="font-medium">₹{order.total.toLocaleString()}</p>
                        <Button variant="outline" size="sm" className="rounded-full h-8 px-3 text-xs">
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                {filteredOrders.filter(
                  (order) => order.status === "ordered" || order.status === "processing" || order.status === "shipped",
                ).length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No active orders found</p>
                  </div>
                ) : (
                  filteredOrders
                    .filter(
                      (order) =>
                        order.status === "ordered" || order.status === "processing" || order.status === "shipped",
                    )
                    .map((order) => (
                      <motion.div
                        key={order.id}
                        className={`border rounded-lg p-4 cursor-pointer ${selectedOrder?.id === order.id ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => setSelectedOrder(order)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()} • {order.items.length} item
                              {order.items.length !== 1 && "s"}
                            </p>
                          </div>
                          <Badge className={`${statusDisplay(order.status).color} flex items-center gap-1`}>
                            {statusDisplay(order.status).icon}
                            {statusDisplay(order.status).text}
                          </Badge>
                        </div>

                        <div className="flex gap-2 mt-3">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="relative w-12 h-12 border rounded-md overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                              {idx === 2 && order.items.length > 3 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-medium">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t">
                          <p className="font-medium">₹{order.total.toLocaleString()}</p>
                          <Button variant="outline" size="sm" className="rounded-full h-8 px-3 text-xs">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {filteredOrders.filter((order) => order.status === "delivered" || order.status === "cancelled")
                  .length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No completed orders found</p>
                  </div>
                ) : (
                  filteredOrders
                    .filter((order) => order.status === "delivered" || order.status === "cancelled")
                    .map((order) => (
                      <motion.div
                        key={order.id}
                        className={`border rounded-lg p-4 cursor-pointer ${selectedOrder?.id === order.id ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => setSelectedOrder(order)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()} • {order.items.length} item
                              {order.items.length !== 1 && "s"}
                            </p>
                          </div>
                          <Badge className={`${statusDisplay(order.status).color} flex items-center gap-1`}>
                            {statusDisplay(order.status).icon}
                            {statusDisplay(order.status).text}
                          </Badge>
                        </div>

                        <div className="flex gap-2 mt-3">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="relative w-12 h-12 border rounded-md overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                              {idx === 2 && order.items.length > 3 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-medium">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t">
                          <p className="font-medium">₹{order.total.toLocaleString()}</p>
                          <Button variant="outline" size="sm" className="rounded-full h-8 px-3 text-xs">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedOrder ? (
            <motion.div
              className="bg-background rounded-xl shadow-sm border p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-medium mb-1">Order {selectedOrder.id}</h2>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={`${statusDisplay(selectedOrder.status).color} flex items-center gap-1`}>
                  {statusDisplay(selectedOrder.status).icon}
                  {statusDisplay(selectedOrder.status).text}
                </Badge>
              </div>

              {/* Order timeline */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Order Timeline</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute top-0 left-3.5 bottom-0 w-0.5 bg-muted" />

                  {/* Timeline events */}
                  <div className="space-y-6">
                    {selectedOrder.timeline.map((event, index) => (
                      <div key={index} className="relative flex gap-4">
                        <div
                          className={`w-7 h-7 rounded-full ${statusColor(event.status)} flex items-center justify-center z-10`}
                        >
                          {event.status === "ordered" && <Clock className="h-3.5 w-3.5 text-white" />}
                          {event.status === "processing" && <Package className="h-3.5 w-3.5 text-white" />}
                          {event.status === "shipped" && <Truck className="h-3.5 w-3.5 text-white" />}
                          {event.status === "delivered" && <Package className="h-3.5 w-3.5 text-white" />}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{event.status}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.date} at {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tracking information */}
              {selectedOrder.tracking && (
                <div className="mb-8 p-4 border rounded-lg bg-muted/20">
                  <h3 className="font-medium mb-2">Tracking Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Courier:</span> {selectedOrder.tracking.courier}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Tracking Number:</span> {selectedOrder.tracking.number}
                    </p>
                    <Button variant="link" className="p-0 h-auto text-primary" asChild>
                      <a href={selectedOrder.tracking.url} target="_blank" rel="noopener noreferrer">
                        Track Package
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Order details */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="relative w-20 h-20 flex-shrink-0 border rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex-1 flex flex-col mt-auto">
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-muted-foreground">Quantity: {item.quantity}</span>
                            <span className="font-medium">₹{item.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="mb-8 border-t pt-4">
                <h3 className="font-medium mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{(selectedOrder.total - 99).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹99</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2 border-t">
                    <span>Total</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="rounded-full">
                  Download Invoice
                </Button>
                {selectedOrder.status === "delivered" && (
                  <Button variant="outline" className="rounded-full">
                    Write a Review
                  </Button>
                )}
                {(selectedOrder.status === "ordered" || selectedOrder.status === "processing") && (
                  <Button variant="outline" className="rounded-full text-red-500 hover:text-red-600">
                    Cancel Order
                  </Button>
                )}
                {selectedOrder.status === "delivered" && (
                  <Button className="rounded-full bg-gradient-to-r from-primary to-secondary">Buy Again</Button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-background rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center text-center h-[500px]">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Select an order to view details</h2>
              <p className="text-muted-foreground max-w-md">
                Choose an order from the list to view its details, track its status, and manage your purchase.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

