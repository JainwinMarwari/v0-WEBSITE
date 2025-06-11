import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function FinancialDisclaimer() {
  return (
    <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="text-sm">
        <strong>Disclaimer:</strong> This website is for informational purposes only and does not constitute financial
        advice. Past performance does not guarantee future results. Please consult with a qualified financial advisor
        before making investment decisions. All investments carry risk of loss.
      </AlertDescription>
    </Alert>
  )
}
