"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Send } from "lucide-react";

const formSchema = z.object({
  rating: z.string({
    required_error: "You need to select a rating.",
  }),
  comments: z
    .string()
    .min(10, {
      message: "Comments must be at least 10 characters.",
    })
    .max(500, {
      message: "Comments must not be longer than 500 characters.",
    }),
});

export function FeedbackForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Feedback submitted:", values);
    // Here you would typically send the data to a server.
    toast({
      title: "Feedback Sent!",
      description: "Thank you for helping us improve.",
    });
    setIsSubmitted(true);
  }
  
  if (isSubmitted) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4 p-8">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="text-muted-foreground">Your feedback has been successfully submitted.</p>
            <Button onClick={() => {
                form.reset();
                setIsSubmitted(false);
            }}>Submit Another Response</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Submit Your Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How would you rate this course overall?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={String(value)} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {value}{" "}
                            {value === 1 ? "(Poor)" : value === 5 ? "(Excellent)" : ""}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your experience..."
                      className="resize-y min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What did you like or dislike? What could be improved?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
