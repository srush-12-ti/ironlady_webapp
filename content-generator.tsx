"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateNewContent } from "@/ai/flows/generate-new-content";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

const formSchema = z.object({
  courseMaterial: z
    .string()
    .min(50, "Please provide at least 50 characters of material."),
  contentType: z
    .string()
    .min(3, "Please specify the type of content to generate."),
});

export function ContentGenerator() {
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseMaterial: "",
      contentType: "a 3-question multiple choice quiz",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setGeneratedContent("");
    try {
      const result = await generateNewContent(values);
      setGeneratedContent(result.newContent);
    } catch (error) {
      console.error("Failed to generate content:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate content. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate New Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="courseMaterial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste Course Material Here</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., The mitochondrion is the powerhouse of the cell..."
                        className="h-48 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Content to Generate</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., quiz questions, examples, a poem"
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
                    Generating...
                  </>
                ) : (
                  "Generate Content"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Generated Output</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          {generatedContent && (
            <div className="p-4 space-y-4 prose prose-sm max-w-none dark:prose-invert rounded-md bg-secondary text-secondary-foreground font-code whitespace-pre-wrap">
              {generatedContent}
            </div>
          )}
          {!loading && !generatedContent && (
            <div className="flex items-center justify-center h-48 text-center border-2 border-dashed rounded-lg border-border">
              <p className="text-sm text-muted-foreground">
                Your generated content will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
