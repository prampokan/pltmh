export function AccountSkeleton() {
  return (
    <div className="mt-2 h-14 w-full rounded flex items-center animate-pulse">
      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-900 rounded-lg mx-2"></div>
      <div>
        <div className="w-36 h-4 bg-slate-100 dark:bg-slate-900 rounded-full"></div>
        <div className="w-24 h-3 mt-1 bg-slate-100 dark:bg-slate-900 rounded-full"></div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="mt-2 h-14 w-full rounded flex items-center animate-pulse">
      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-900 rounded-lg mx-2"></div>
      <div>
        <div className="w-36 h-4 bg-slate-100 dark:bg-slate-900 rounded-full"></div>
        <div className="w-24 h-3 mt-1 bg-slate-100 dark:bg-slate-900 rounded-full"></div>
      </div>
    </div>
  );
}
