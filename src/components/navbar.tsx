"use client";

import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const getBreadcrumbLabel = (segment: string) => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="w-full h-14 flex items-center px-5 border-b fixed bg-white/50 backdrop-blur dark:bg-slate-950/50 z-50">
      <div className="flex items-center gap-x-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {pathname && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem key={`breadcrumb-item-${index}`}>
                      <BreadcrumbLink href={href}>
                        {getBreadcrumbLabel(segment)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < segments.length - 1 && (
                      <BreadcrumbSeparator
                        key={`breadcrumb-separator-${index}`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </nav>
  );
}
