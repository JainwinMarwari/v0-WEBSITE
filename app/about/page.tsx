import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Briefcase, TrendingUp, Award, Mail, Phone, Linkedin, Target, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <BackButton href="/" label="Back to Dashboard" />

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Jainwin Marwari
              </CardTitle>
              <CardDescription className="text-lg">
                CFA Level 2 cleared finance professional with expertise in portfolio management and investment analysis
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Journey Summary */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                My Financial Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                As a CFA Level 2 cleared finance professional with a degree in Business Economics Honours, I bring a
                strong analytical foundation to investment management. Currently working as a Business Analyst in a
                fintech company that caters to PMS, AIF, and AMCs, I've gained valuable insights into portfolio
                management practices and investment strategies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey in finance is deeply rooted in my Marwari heritage - a community known for business acumen
                and trusted money management. I'm taking this legacy forward by combining traditional wisdom with modern
                financial analysis and investment techniques.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through Jainwin Marwari, I aim to become a fund manager by documenting my investing journey, sharing
                company analyses, and building a track record of performance. My focus is on identifying quality
                businesses with strong fundamentals and ethical management, particularly in the micro, small, and
                mid-cap segments of the Indian market.
              </p>
            </CardContent>
          </Card>

          {/* Experience & Skills */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Briefcase className="h-5 w-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Business Analyst - Fintech</h4>
                  <p className="text-sm text-muted-foreground">Current</p>
                  <p className="text-sm">
                    Working with PMS, AIF, and AMC clients to optimize portfolio management solutions
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">CFA Level 2 Cleared</h4>
                  <p className="text-sm text-muted-foreground">Professional Certification</p>
                  <p className="text-sm">
                    Advanced knowledge in equity valuation, portfolio management, and financial analysis
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Independent Investor</h4>
                  <p className="text-sm text-muted-foreground">Ongoing</p>
                  <p className="text-sm">Managing personal portfolio with focus on Indian equity markets</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="h-5 w-5" />
                  Core Competencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Equity Research</Badge>
                  <Badge variant="secondary">Financial Modeling</Badge>
                  <Badge variant="secondary">Portfolio Management</Badge>
                  <Badge variant="secondary">Fundamental Analysis</Badge>
                  <Badge variant="secondary">Valuation</Badge>
                  <Badge variant="secondary">Investment Strategy</Badge>
                  <Badge variant="secondary">Risk Assessment</Badge>
                  <Badge variant="secondary">Financial Statement Analysis</Badge>
                  <Badge variant="secondary">Indian Markets</Badge>
                  <Badge variant="secondary">Small & Mid Cap</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education & Achievements */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Business Economics Honours</h4>
                  <p className="text-sm text-muted-foreground">University Graduate</p>
                  <p className="text-sm">Strong foundation in economics, finance, and business strategy</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">CFA Program</h4>
                  <p className="text-sm text-muted-foreground">Level 2 Cleared</p>
                  <p className="text-sm">Advanced studies in equity investments, portfolio management, and ethics</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Award className="h-5 w-5" />
                  Career Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Fund Manager</h4>
                  <p className="text-sm text-muted-foreground">Primary Career Goal</p>
                  <p className="text-sm">
                    Aiming to manage investment portfolios professionally with a PMS-style approach
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Investment Research</h4>
                  <p className="text-sm text-muted-foreground">Ongoing Focus</p>
                  <p className="text-sm">Building expertise in identifying quality businesses with growth potential</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Financial Education</h4>
                  <p className="text-sm text-muted-foreground">Community Contribution</p>
                  <p className="text-sm">Sharing investment knowledge and insights through articles and analysis</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Mail className="h-5 w-5" />
                Get In Touch
              </CardTitle>
              <CardDescription>
                Feel free to reach out for collaboration, consultation, or just to discuss markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">harsh.finance10@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 7678698427</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/harshandfinance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      www.linkedin.com/in/harshandfinance
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
