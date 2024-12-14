import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendService } from '@/utils/TrendService';
import { Card } from "@/components/ui/card";

interface TrendResult {
  source: string;
  title: string;
  description: string;
  url: string;
  timestamp: string;
}

export const CrawlForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trendResults, setTrendResults] = useState<TrendResult[] | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setProgress(0);
    setTrendResults(null);
    
    try {
      setProgress(30);
      const result = await TrendService.getAllTrends();
      setProgress(70);
      
      if (result.success && result.data) {
        setTrendResults(result.data);
        toast({
          title: "Success",
          description: "Trend analysis completed",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to analyze trends",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error analyzing trends:', error);
      toast({
        title: "Error",
        description: "Failed to analyze trends",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Trend Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Analyze current design trends from Reddit and GitHub
          </p>
        </div>
        
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
        
        <Button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200"
        >
          {isLoading ? "Analyzing..." : "Start Analysis"}
        </Button>
      </div>

      {trendResults && (
        <Card className="mt-6 p-4">
          <h3 className="text-lg font-semibold mb-4">Latest Trends</h3>
          <div className="space-y-4">
            {trendResults.map((trend, index) => (
              <div key={index} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">
                    {trend.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(trend.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-medium mb-1">{trend.title}</h4>
                <p className="text-sm text-muted-foreground">{trend.description}</p>
                <a
                  href={trend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline mt-2 inline-block"
                >
                  View Source →
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};