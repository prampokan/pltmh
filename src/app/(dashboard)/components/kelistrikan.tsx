"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Kelistrikan() {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Kelistrikan PLTMH</CardTitle>
          <CardDescription>
            Putaran Turbin, Buka tutup Valve Turbin, Daya, Tegangan & Arus
            Luaran
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6"></CardContent>
    </Card>
  );
}
