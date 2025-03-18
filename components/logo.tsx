import type React from "react"
import { cn } from "@/lib/utils"

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={cn("h-10 w-10", className)} {...props}>
      <circle cx="50" cy="50" r="45" fill="#663399" />
      <g transform="translate(50, 50)">
        <path d="M-20,-15 L20,15 M-20,15 L20,-15" stroke="#FF6F61" strokeWidth="6" strokeLinecap="round" />
        <path d="M0,-25 L0,25" stroke="#008080" strokeWidth="6" strokeLinecap="round" />
        <circle cx="0" cy="0" r="10" fill="#F8F4E3" />
      </g>
    </svg>
  )
}

