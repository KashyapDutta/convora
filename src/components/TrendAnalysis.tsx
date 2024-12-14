import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const TrendAnalysis = () => {
  // Placeholder data - replace with actual API data
  const trends = [
    {
      category: "Color Palettes",
      trend: "up",
      percentage: 45,
      description: "Muted earth tones with neon accents",
    },
    {
      category: "Visual Styles",
      trend: "up",
      percentage: 32,
      description: "Brutalist design with organic elements",
    },
    {
      category: "Typography",
      trend: "down",
      percentage: 12,
      description: "Geometric sans-serif fonts",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trends.map((trend, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="p-6 glass h-full">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">{trend.category}</h3>
              {trend.trend === "up" ? (
                <TrendingUp className="text-green-500 h-5 w-5" />
              ) : (
                <TrendingDown className="text-red-500 h-5 w-5" />
              )}
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold mb-1">
                {trend.percentage}%
              </div>
              <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trend.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${
                    trend.trend === "up" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {trend.description}
            </p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};