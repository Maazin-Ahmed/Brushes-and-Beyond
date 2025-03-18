"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarProviderProps {
  children: React.ReactNode
}

interface SidebarContextProps {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextProps>({
  isCollapsed: false,
  setIsCollapsed: () => {},
})

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>{children}</SidebarContext.Provider>
}

export const Sidebar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { isCollapsed } = React.useContext(SidebarContext)
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full flex-col overflow-y-auto border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {children}
    </aside>
  )
}

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-16 shrink-0 items-center px-4 py-2">{children}</div>
}

export const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1 px-4 py-2">{children}</div>
}

export const SidebarFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="shrink-0 border-t px-4 py-2">{children}</div>
}

export const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  return <ul className="space-y-1">{children}</ul>
}

export const SidebarMenuItem = ({ children }: { children: React.ReactNode }) => {
  return <li>{children}</li>
}

interface SidebarMenuButtonProps {
  children: React.ReactNode
  isActive?: boolean
  asChild?: boolean
}

export const SidebarMenuButton = ({ children, isActive, asChild }: SidebarMenuButtonProps) => {
  if (asChild) {
    return (
      <div
        className={cn(
          "group flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
          isActive ? "bg-secondary text-foreground" : "text-muted-foreground",
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <button
      className={cn(
        "group flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
        isActive ? "bg-secondary text-foreground" : "text-muted-foreground",
      )}
    >
      {children}
    </button>
  )
}

export const SidebarTrigger = () => {
  const { isCollapsed, setIsCollapsed } = React.useContext(SidebarContext)

  return (
    <button
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:opacity-50 h-10 w-10 p-0"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      {isCollapsed ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

