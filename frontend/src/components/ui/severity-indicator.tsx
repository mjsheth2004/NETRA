import * as React from "react"
import { cn } from "../../lib/utils"

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "BENIGN"

const severityStyles: Record<Severity, string> = {
  CRITICAL: "bg-status-critical/10 text-status-critical border-status-critical/20",
  HIGH: "bg-status-high/10 text-status-high border-status-high/20",
  MEDIUM: "bg-status-medium/10 text-status-medium border-status-medium/20",
  LOW: "bg-status-low/10 text-status-low border-status-low/20",
  BENIGN: "bg-status-benign/10 text-status-benign border-status-benign/20",
}

export interface SeverityIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  level: Severity
}

export function SeverityIndicator({ level, className, ...props }: SeverityIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase",
        severityStyles[level],
        className
      )}
      {...props}
    >
      {level}
    </div>
  )
}
