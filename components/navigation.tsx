"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Home, User, Shield } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "./theme-toggle"

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
    <div className="flex items-center gap-2">
      <nav className={`flex ${isMobile ? "flex-wrap gap-1" : "space-x-2"}`}>
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.name}
              variant={pathname === item.href ? "default" : "ghost"}
              asChild
              className={`flex items-center gap-2 ${isMobile ? "text-xs px-2 py-1 h-8" : ""}`}
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
      <ThemeToggle />
    </div>
  )
}
