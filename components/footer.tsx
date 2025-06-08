export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 Email: harsh.finance10@gmail.com</p>
              <p>📱 Phone: +91 7678698427</p>
              <p>
                🌐 LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/harshandfinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  www.linkedin.com/in/harshandfinance
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a href="/portfolio" className="text-muted-foreground hover:text-primary">
                  Portfolio
                </a>
              </p>
              <p>
                <a href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </a>
              </p>
              <p>
                <a href="/about" className="text-muted-foreground hover:text-primary">
                  About
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Professional Focus</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Portfolio Management</p>
              <p>• Financial Analysis</p>
              <p>• Investment Strategy</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Jainwin Marwari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
