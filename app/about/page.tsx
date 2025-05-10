import { Award, BookOpen, Briefcase, GraduationCap, LineChart, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">About</h1>
        <p className="text-muted-foreground">
          Professional investment management with a focus on Indian small & mid-caps
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex justify-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-background">
                  <img src="/placeholder.svg?height=160&width=160" alt="Profile" className="object-cover" />
                </div>
              </div>
              <CardTitle className="text-center mt-4">Harsh Kumar Jain, CFA Level II</CardTitle>
              <CardDescription className="text-center">Founder & Portfolio Manager</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>5+ years in finance</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>harsh.jainwin@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <Separator />
              <div className="pt-2">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Certifications
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>CFA Level II Candidate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Series 7 & 63 Licensed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Financial Modeling Certification</span>
                  </li>
                </ul>
              </div>
              <Separator />
              <div className="pt-2">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Investment Focus
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Small & Mid-Cap Investing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Quality-focused Approach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Long-term Wealth Creation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Indian Equity Markets</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <Button className="w-full">Download Resume</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Professional Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Investment Philosophy</h3>
                <p className="mt-2 text-muted-foreground">
                  Harsh Kumar Jain is a CFA Level 2 cleared investment professional with a passion for long-term wealth
                  creation. Founder of Jainwin Marwari, he brings deep research, disciplined strategy, and Marwari
                  investing heritage to managing capital with integrity and focus.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Our investment approach combines value, growth, and quality factors with a primary focus on the Indian
                  small and mid-cap space. We believe that patient capital, thorough research, and a disciplined process
                  are the keys to generating superior long-term returns while managing risk.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold">Professional Experience</h3>
                <div className="mt-4 space-y-6">
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                    <div className="absolute left-0 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary"></div>
                    <h4 className="font-medium">Investment Analyst</h4>
                    <p className="text-sm text-muted-foreground">Global Asset Management • 2022 - Present</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Conduct fundamental analysis of companies across multiple sectors, with a focus on technology and
                      healthcare. Develop financial models and valuation frameworks. Present investment recommendations
                      to the portfolio management team.
                    </p>
                  </div>
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                    <div className="absolute left-0 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary"></div>
                    <h4 className="font-medium">Financial Analyst</h4>
                    <p className="text-sm text-muted-foreground">Investment Bank • 2020 - 2022</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Performed financial analysis and valuation for M&A transactions and capital raising activities.
                      Created detailed financial models and industry research reports. Supported senior bankers in
                      client presentations.
                    </p>
                  </div>
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                    <div className="absolute left-0 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary"></div>
                    <h4 className="font-medium">Research Assistant</h4>
                    <p className="text-sm text-muted-foreground">University Finance Department • 2018 - 2020</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Assisted professors with research on capital markets efficiency and factor investing. Collected
                      and analyzed financial data using statistical methods. Co-authored a research paper on ESG
                      investing.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold">Education</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <GraduationCap className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Master of Finance</h4>
                      <p className="text-sm text-muted-foreground">Ivy League University • 2018 - 2020</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Specialized in investment management and financial analysis. GPA: 3.9/4.0
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <GraduationCap className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Bachelor of Business Administration</h4>
                      <p className="text-sm text-muted-foreground">State University • 2014 - 2018</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Major in Finance, Minor in Economics. GPA: 3.8/4.0
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>
                For collaboration or portfolio review discussions, feel free to reach out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Message subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your message"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
