import { ReactNode } from "react"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  action?: ReactNode
}

export function PageHeader({ title, description, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div className="space-y-1 sm:space-y-1.5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-foreground/80">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </div>
            ))}
          </div>
        )}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      {action && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {action}
        </div>
      )}
    </div>
  )
}
