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
} from "lucide-react";

const monitoring = [
  { icon: <ChartSpline />, name: "Dashboard", href: "/" },
  { icon: <Cog />, name: "Devices", href: "/devices" },
];

const master = [
  { icon: <UserRoundCheck />, name: "Super Admin", href: "/super-admin" },
  { icon: <UserPen />, name: "Admin", href: "/" },
  { icon: <UserCog />, name: "Teknisi", href: "/" },
];

export function AppSidebar() {
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
            <DropdownMenuTrigger asChild className="mt-2">
              <div className="flex items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-all p-2 rounded-md gap-2 relative">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                  <UserRound size="20" />
                </div>
                <div className="max-w-40">
                  <h1 className="font-semibold text-sm tracking-tight truncate">
                    John Doe
                  </h1>
                  <p className="text-xs">Super Admin</p>
                </div>
                <ChevronsUpDown className="absolute right-3" size={16} />
              </div>
            </DropdownMenuTrigger>
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
                    johndoe@mail.com
                  </h1>
                  <p className="text-xs">Super Admin</p>
                </div>
              </DropdownMenuItem>
              <Separator />
              <Link href={"/"}>
                <DropdownMenuItem className="m-1.5">
                  <UserRoundPen />
                  <span>My Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="m-1.5">
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
