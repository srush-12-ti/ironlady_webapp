"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const courses = [
  {
    name: "Executive Leadership Mastery",
    duration: "12 weeks",
    mode: "Hybrid (Online + In-Person)",
    description: "Comprehensive program for senior executives and C-suite professionals",
    features: ["Strategic thinking", "Crisis management", "Team dynamics", "Global leadership"],
  },
  {
    name: "Emerging Leaders Program",
    duration: "8 weeks",
    mode: "Online",
    description: "Perfect for mid-level managers ready to step into leadership roles",
    features: ["Leadership foundations", "Communication skills", "Performance management", "Innovation mindset"],
  },
  {
    name: "Women in Leadership",
    duration: "10 weeks",
    mode: "Hybrid (Online + In-Person)",
    description: "Specialized program addressing unique challenges faced by women leaders",
    features: ["Confidence building", "Negotiation skills", "Work-life integration", "Mentorship networks"],
  },
  {
    name: "Digital Leadership Transformation",
    duration: "6 weeks",
    mode: "Online",
    description: "Leading in the digital age with technology and innovation focus",
    features: ["Digital strategy", "Remote team leadership", "Change management", "Data-driven decisions"],
  },
];

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  course: z.string({
    required_error: "Please select a course.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("studentName", values.username);
    localStorage.setItem("courseName", values.course);
    
    toast({
      title: "Login Successful",
      description: `Welcome, ${values.username}!`,
    });
    router.push("/dashboard");
  }

  return (
    <Card className="w-full max-w-sm mt-8 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Student Login</CardTitle>
        <CardDescription>
          Enter your details to access your course dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.name} value={course.name}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Access Dashboard
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
