"use client";
import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/dashboard/user-nav";

export function Header() {
  const [studentName, setStudentName] = React.useState("");

  React.useEffect(() => {
    // This runs only on the client, after hydration
    const name = localStorage.getItem("studentName");
    if (name) {
      setStudentName(name);
    }
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        {studentName && (
          <h2 className="text-lg font-semibold">Welcome, {studentName}!</h2>
        )}
      </div>
      <UserNav />
    </header>
  );
}
