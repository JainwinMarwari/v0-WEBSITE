"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Home, User, Shield } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, shortName: "Home" },
  { name: "Portfolio", href: "/portfolio", icon: BarChart3, shortName: "Portfolio" },
  { name: "Blog", href: "/blog", icon: FileText, shortName: "Blog" },
  { name: "About", href: "/about", icon: User, shortName: "About" },
  { name: "Admin", href: "/admin", icon: Shield, shortName: "Admin" },
]

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()

  return (
    <div className="flex items-center gap-4">
      <nav className={`flex ${isMobile ? "flex-wrap gap-1" : "space-x-2"}`}>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              asChild
              className={`
                flex items-center gap-2 transition-all duration-300 focus-ring rounded-lg
                ${isMobile ? "text-xs px-3 py-2 h-9" : "px-4 py-2 h-10"}
                ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg border border-primary/20"
                    : "hover:bg-muted/60 hover:text-foreground hover:scale-105 border border-transparent hover:border-border/40"
                }
              `}
              size={isMobile ? "sm" : "default"}
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4" />
                {isMobile ? item.shortName : item.name}
              </Link>
            </Button>
          )
        })}
      </nav>
      <div className="ml-2 border-l border-border/40 pl-4">
        <ThemeToggle />
      </div>
    </div>
  )
}
