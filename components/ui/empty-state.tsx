import { ReactNode } from "react"
import { Inbox } from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-sidebar-border/20 bg-muted/5 min-h-[400px]">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted/20 mb-6 text-muted-foreground/60">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider text-foreground mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-8">
          {description}
        </p>
      )}
      {action && (
        <div>{action}</div>
      )}
    </div>
  )
}
