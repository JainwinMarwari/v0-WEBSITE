"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Home, BarChart3, FileText, User, Shield } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: BarChart3 },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "About", href: "/about", icon: User },
  { name: "Admin", href: "/admin", icon: Shield },
]

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()

  return (
    <nav className={`flex items-center ${isMobile ? "justify-between w-full" : "space-x-6"}`}>
      <div className={`flex ${isMobile ? "space-x-2" : "space-x-6"}`}>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              size={isMobile ? "sm" : "default"}
              asChild
              className={cn(
                "transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-accent/50 hover:text-accent-foreground",
                isMobile && "px-3",
              )}
            >
              <Link href={item.href} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {!isMobile && <span>{item.name}</span>}
              </Link>
            </Button>
          )
        })}
      </div>
      <ThemeToggle />
    </nav>
  )
}
