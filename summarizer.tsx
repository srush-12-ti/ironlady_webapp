"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { summarizeCourseContent } from "@/ai/flows/summarize-course-content";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Info } from "lucide-react";

const formSchema = z.object({
  content: z
    .string()
    .min(100, "Please provide at least 100 characters for a good summary."),
});

export function Summarizer() {
  const [summary, setSummary] = useState("");
  const [hasContext, setHasContext] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSummary("");
    setHasContext(true);
    try {
      const result = await summarizeCourseContent({ content: values.content });
      setSummary(result.summary);
      setHasContext(result.hasContext);
    } catch (error) {
      console.error("Failed to summarize content:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not summarize content. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Summarize Your Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste Your Content Here</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste a long block of text from your course materials..."
                        className="h-48 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  "Generate Summary"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          {!hasContext && !loading && (
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Insufficient Context</AlertTitle>
              <AlertDescription>
                The provided text lacks enough context for an accurate summary.
                Please provide a more detailed text.
              </AlertDescription>
            </Alert>
          )}
          {hasContext && summary && (
             <div className="p-4 space-y-4 prose prose-sm max-w-none dark:prose-invert rounded-md bg-secondary text-secondary-foreground">
                {summary}
            </div>
          )}
          {!loading && !summary && (
            <div className="flex items-center justify-center h-48 text-center border-2 border-dashed rounded-lg border-border">
              <p className="text-sm text-muted-foreground">
                Your summary will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
