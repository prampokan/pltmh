import { ReactNode } from "react";

interface DisabledInputProps {
  children: ReactNode;
}

export default function DisabledInput({ children }: DisabledInputProps) {
  return (
    <div className="w-full h-10 border rounded-md mb-5 mt-2 flex items-center px-3 bg-slate-100 dark:bg-slate-900 text-sm">
      {children}
    </div>
  );
}
