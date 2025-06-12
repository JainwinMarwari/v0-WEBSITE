import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Shield } from "lucide-react"

export function FinancialDisclaimer() {
  return (
    <Alert className="bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200 dark:from-rose-950/20 dark:to-orange-950/20 dark:border-rose-800/30">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span className="font-semibold text-rose-800 dark:text-rose-200">Important Disclaimer</span>
          </div>
          <AlertDescription className="text-sm text-rose-700 dark:text-rose-300 leading-relaxed">
            <strong>Investment Risk Warning:</strong> This website is for informational and educational purposes only
            and does not constitute financial, investment, or trading advice. All content, including portfolio
            performance data, analysis, and recommendations, should not be considered as personalized investment advice.
            <br />
            <br />
            <strong>Past Performance:</strong> Past performance does not guarantee future results. All investments carry
            risk of loss, and you may lose some or all of your invested capital. Market conditions can change rapidly
            and unpredictably.
            <br />
            <br />
            <strong>Professional Advice:</strong> Please consult with a qualified financial advisor, investment
            professional, or conduct your own research before making any investment decisions. The author is not
            responsible for any financial losses incurred based on information provided on this website.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}
