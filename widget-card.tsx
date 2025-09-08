"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type ReactNode } from "react";

interface WidgetCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

export function WidgetCard({
  title,
  description,
  href,
  icon,
}: WidgetCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <Card
      className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="font-headline">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {icon}
        </div>
      </CardHeader>
    </Card>
  );
}
