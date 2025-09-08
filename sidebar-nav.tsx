"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  GraduationCap,
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  MessageSquare,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/todo",
    label: "To-Do List",
    icon: CheckSquare,
  },
  {
    href: "/dashboard/course",
    label: "AI Tools",
    icon: Sparkles,
  },
  {
    href: "/dashboard/feedback",
    label: "Feedback",
    icon: MessageSquare,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold font-headline">Iron_lady</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="w-5 h-5 mr-3 text-accent" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <p className="px-2 text-xs text-muted-foreground">© 2024 Iron_lady</p>
      </SidebarFooter>
    </>
  );
}
