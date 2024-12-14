import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MoodboardDisplay } from '@/components/MoodboardDisplay';
import { TrendAnalysis } from '@/components/TrendAnalysis';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { CrawlForm } from '@/components/CrawlForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReport = () => {
    toast({
      title: "Downloading Report",
      description: "Your PDF report is being generated...",
    });
    // Implement PDF download logic here
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-sm text-primary/80 bg-primary/5 rounded-full mb-4">
            Latest Trends • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Visual Trend Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover this month's trending aesthetics and insights, beautifully visualized through AI-generated moodboards.
          </p>
        </motion.div>

        <Tabs defaultValue="moodboard" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="moodboard">Current Moodboard</TabsTrigger>
            <TabsTrigger value="analysis">Trend Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="moodboard" className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <MoodboardDisplay />
            </motion.div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TrendAnalysis />
            </motion.div>
            <div className="mt-8">
              <CrawlForm />
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-4 mt-12"
        >
          <Button
            onClick={handleDownloadReport}
            className="glass hover:bg-primary/10 transition-all duration-300"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button
            variant="outline"
            className="glass hover:bg-primary/10 transition-all duration-300"
          >
            <Calendar className="mr-2 h-4 w-4" />
            View Archive
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;