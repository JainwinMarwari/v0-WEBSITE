import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Logo } from "@/components/logo"
import { BackButton } from "@/components/back-button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Briefcase, TrendingUp, Award, Mail, Phone, Linkedin, Target, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
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
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-3xl text-blue-800">Jainwin Marwari</CardTitle>
              <CardDescription className="text-lg text-slate-600">
                CFA Level 2 cleared finance professional with expertise in portfolio management and investment analysis
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Journey Summary */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BookOpen className="h-5 w-5" />
                My Financial Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                As a CFA Level 2 cleared finance professional with a degree in Business Economics Honours, I bring a
                strong analytical foundation to investment management. My expertise spans across portfolio management,
                financial analysis, and investment strategy development with a focus on delivering superior
                risk-adjusted returns.
              </p>
              <p className="text-slate-600 leading-relaxed">
                My journey in finance is deeply rooted in my Marwari heritage - a community known for business acumen
                and trusted money management. I'm taking this legacy forward by combining traditional wisdom with modern
                financial analysis and investment techniques through <strong>Jainwin Marwari</strong>, my portfolio
                management practice.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Through my practice, I aim to provide professional portfolio management services by documenting
                investment journeys, sharing company analyses, and building a track record of performance. My focus is
                on identifying quality businesses with strong fundamentals and ethical management, particularly in the
                micro, small, and mid-cap segments of the Indian market.
              </p>
            </CardContent>
          </Card>

          {/* Experience & Skills */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Briefcase className="h-5 w-5" />
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Portfolio Manager</h4>
                  <p className="text-sm text-slate-600">Jainwin Marwari - Current</p>
                  <p className="text-sm">
                    Managing client portfolios with focus on risk-adjusted returns and long-term wealth creation
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">CFA Level 2 Cleared</h4>
                  <p className="text-sm text-slate-600">Professional Certification</p>
                  <p className="text-sm">
                    Advanced knowledge in equity valuation, portfolio management, and financial analysis
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Independent Investment Advisor</h4>
                  <p className="text-sm text-slate-600">Ongoing</p>
                  <p className="text-sm">Providing investment advisory services with focus on Indian equity markets</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Target className="h-5 w-5" />
                  Core Competencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Equity Research
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Financial Modeling
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Portfolio Management
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Fundamental Analysis
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Valuation
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Investment Strategy
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Risk Assessment
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Financial Statement Analysis
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Indian Markets
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Small & Mid Cap
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education & Achievements */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Business Economics Honours</h4>
                  <p className="text-sm text-slate-600">University Graduate</p>
                  <p className="text-sm">Strong foundation in economics, finance, and business strategy</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">CFA Program</h4>
                  <p className="text-sm text-slate-600">Level 2 Cleared</p>
                  <p className="text-sm">Advanced studies in equity investments, portfolio management, and ethics</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Award className="h-5 w-5" />
                  Professional Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Portfolio Management Excellence</h4>
                  <p className="text-sm text-slate-600">Primary Focus</p>
                  <p className="text-sm">
                    Delivering superior risk-adjusted returns through disciplined investment approach
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Investment Research</h4>
                  <p className="text-sm text-slate-600">Ongoing Focus</p>
                  <p className="text-sm">Building expertise in identifying quality businesses with growth potential</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Financial Education</h4>
                  <p className="text-sm text-slate-600">Community Contribution</p>
                  <p className="text-sm">Sharing investment knowledge and insights through articles and analysis</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Mail className="h-5 w-5" />
                Get In Touch
              </CardTitle>
              <CardDescription>
                Feel free to reach out for portfolio management services, consultation, or market discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-slate-600">harsh.finance10@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-slate-600">+91 7678698427</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/harshandfinance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:text-blue-600"
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
