"use client";

import { useState } from "react";
import { getPersonalizedRecommendations } from "@/ai/flows/get-personalized-recommendations";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BookOpenCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Recommender() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    setLoading(true);
    setRecommendations([]);
    try {
      const courseName = localStorage.getItem("courseName") || "General Studies";
      const studentName = localStorage.getItem("studentName") || "Student";
      
      const result = await getPersonalizedRecommendations({
        learningPath: courseName,
        interests: `Topics related to ${courseName} for user ${studentName}`,
        contentFormat: "article, tutorial",
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch recommendations. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Get Fresh Recommendations"
        )}
      </Button>

      {recommendations.length > 0 && (
        <div className="space-y-3">
            <h3 className="font-semibold">Here are some topics you might find interesting:</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
              >
                <BookOpenCheck className="w-5 h-5 text-primary" />
                <span className="text-secondary-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!loading && recommendations.length === 0 && (
        <p className="text-sm text-muted-foreground">Click the button to generate personalized content recommendations.</p>
      )}
    </div>
  );
}
