"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import {
  ChevronsUpDown,
  UserRoundPen,
  LogOut,
  ChartSpline,
  Cog,
  UserRoundCheck,
  UserCog,
  UserPen,
  UserRound,
  Clock,
  ClipboardCheck,
  ClipboardX,
  Zap,
  Waves,
} from "lucide-react";
import { AccountSkeleton } from "./skeleton";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getCurrentUser } from "@/service";

const monitoring = [
  { icon: <ChartSpline />, name: "Dashboard", href: "/" },
  { icon: <Clock />, name: "Realtime Sensors", href: "/realtime-sensors" },
  { icon: <Cog />, name: "Devices", href: "/devices" },
];

const master = [{ icon: <UserRound />, name: "User Data", href: "/user-data" }];

const report = [
  {
    icon: <ClipboardCheck />,
    name: "Laporan Bulanan",
    href: "/monthly-report",
  },
  { icon: <ClipboardX />, name: "Laporan Gangguan", href: "/breakdown-report" },
];

const history = [
  { icon: <Zap />, name: "Powermeter History", href: "/powermeter-history" },
  { icon: <Waves />, name: "Hidrometri History", href: "/hidrometri-history" },
];

export function AppSidebar() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        console.log("No user");
        return;
      }
      try {
        const data = await getCurrentUser(user.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching devices: ", error);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

  return (
    <Sidebar>
      <SidebarHeader className="h-14 border-b justify-center bg-white dark:bg-slate-950 cursor-default">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-x-3 ml-2">
              <Image
                src="/logo.jpg"
                alt="logo"
                width={30}
                height={30}
                className="rounded"
              />
              <h1 className="font-semibold tracking-tight">Indonesia Power</h1>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-slate-950 pb-20">
        <SidebarGroup>
          <DropdownMenu>
            {userData ? (
              <DropdownMenuTrigger asChild className="mt-2 h-14">
                <div className="flex items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-all p-2 rounded-md gap-2 relative">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                    <UserRound size="20" />
                  </div>
                  <div className="max-w-40">
                    <h1 className="font-semibold text-sm tracking-tight truncate capitalize">
                      {userData?.name}
                    </h1>
                    <p className="text-xs capitalize">{userData?.role}</p>
                  </div>
                  <ChevronsUpDown className="absolute right-3" size={16} />
                </div>
              </DropdownMenuTrigger>
            ) : (
              <AccountSkeleton />
            )}

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width]"
              align="start"
            >
              <DropdownMenuItem className="m-1.5">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                  <UserRound size="20" />
                </div>
                <div className="max-w-40">
                  <h1 className="font-semibold tracking-tight truncate">
                    {userData?.email}
                  </h1>
                  <p className="text-xs capitalize">{userData?.role}</p>
                </div>
              </DropdownMenuItem>
              <Separator />
              <Link href={"/profile"}>
                <DropdownMenuItem className="m-1.5">
                  <UserRoundPen />
                  <span>My Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="m-1.5" onClick={handleSignOut}>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {monitoring.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Data History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {history.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Reportase</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {report.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Master Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {master.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="absolute bottom-0 w-full flex items-center justify-center gap-x-2 px-2 h-10 bg-gradient-to-t from-white dark:from-slate-950 from-50% to-transparent">
          <p className="text-xs text-muted-foreground">
            © 2024. All Rights Reserved.
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
