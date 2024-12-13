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
  CalendarCog,
  UserRoundCheck,
  UserCog,
} from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggler } from "./theme-toggler";

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
      <SidebarContent className="bg-white dark:bg-slate-950">
        <SidebarGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="mt-2">
              <div className="flex items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-all p-2 rounded-md gap-2 relative">
                <Image
                  src="/shadcn.jpg"
                  alt="shadcn"
                  width={35}
                  height={35}
                  className="rounded-lg"
                />
                <div className="">
                  <h1 className="font-semibold text-sm tracking-tight max-w-36">
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
                <Image
                  src="/shadcn.jpg"
                  alt="shadcn"
                  width={35}
                  height={35}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="font-semibold tracking-tight">John Doe</h1>
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
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <Link href={"/"}>
                    <ChartSpline />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <Link href={"/"}>
                    <Cog />
                    <span>Sensors</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <Link href={"/"}>
                    <CalendarCog />
                    <span>Sensor Parameters</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Master Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <Link href={"/"}>
                    <UserRoundCheck />
                    <span>Super Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <Link href={"/"}>
                    <UserCog />
                    <span>Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="absolute bottom-3 w-full flex items-center gap-x-2 px-2">
          <Button variant="outline" className="w-full">
            <LogOut />
            Sign out
          </Button>
          <div>
            <ThemeToggler />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
