import { FinancialDisclaimer } from "./disclaimer"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <FinancialDisclaimer />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact Information</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary">📧</span>
                <span>harsh.finance10@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">📱</span>
                <span>+91 7678698427</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">🌐</span>
                <a
                  href="https://www.linkedin.com/in/harshandfinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </a>
              </p>
              <p>
                <a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </p>
              <p>
                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </p>
              <p>
                <a href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin Panel
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Professional Focus</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Portfolio Management Services (PMS)</p>
              <p>• Financial Analysis & Research</p>
              <p>• Investment Strategy Development</p>
              <p>• Client Relationship Management</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 Jainwin Marwari. All rights reserved.</p>
          <p className="text-xs text-muted-foreground mt-2">
            Professional Portfolio Management Services | CFA Level 2 Cleared
          </p>
        </div>
      </div>
    </footer>
  )
}
