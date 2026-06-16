export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border shadow-sm">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            In-House Expense
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your company finances and projects
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
