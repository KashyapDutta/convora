import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";

export const MoodboardDisplay = () => {
  // Placeholder data - replace with actual API data
  const moodboardData = {
    imageUrl: "https://source.unsplash.com/random/1200x800",
    title: "Digital Nostalgia Wave",
    description: "A fusion of retro computing aesthetics with modern minimalism",
    keywords: ["retrowave", "digital art", "minimalism", "neon", "synthwave"],
  };

  return (
    <Card className="overflow-hidden glass">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative aspect-video"
      >
        <img
          src={moodboardData.imageUrl}
          alt={moodboardData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{moodboardData.title}</h2>
          <p className="text-sm text-white/80 mb-4">{moodboardData.description}</p>
          <div className="flex flex-wrap gap-2">
            {moodboardData.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-white/20 backdrop-blur-sm rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Card>
  );
};