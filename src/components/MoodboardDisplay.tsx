import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";

export const MoodboardDisplay = () => {
  const moodboardData = {
    mainImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    secondaryImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
    accentImage: "https://images.unsplash.com/photo-1526040652367-ac003a0475fe",
    title: "Digital Minimalism",
    description: "A blend of modern minimalism with organic elements",
    keywords: ["minimalism", "modern", "organic", "design"],
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-8">
      {/* Background geometric shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-2xl" />
      </motion.div>

      <Card className="relative overflow-hidden glass border-0 bg-transparent">
        <div className="relative min-h-[600px] p-6">
          {/* Main collage elements */}
          <motion.div
            initial={{ scale: 1.1, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-10 right-10 w-2/3 h-80 rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src={moodboardData.mainImage}
              alt="Main visual"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlapping secondary image */}
          <motion.div
            initial={{ scale: 0.9, x: -20 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute top-40 left-10 w-1/2 h-64 rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src={moodboardData.secondaryImage}
              alt="Secondary visual"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Accent image with geometric overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-20 left-1/4 w-1/3 h-48 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={moodboardData.accentImage}
              alt="Accent visual"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
          </motion.div>

          {/* Geometric decorative elements */}
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 left-20 w-20 h-20 border-4 border-orange-500/30 rounded-full"
          />
          <motion.div
            initial={{ rotate: 10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-40 right-20 w-16 h-16 border-4 border-emerald-500/30"
          />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 via-black/30 to-transparent">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">{moodboardData.title}</h2>
              <p className="text-white/80 mb-4">{moodboardData.description}</p>
              <div className="flex flex-wrap gap-2">
                {moodboardData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm rounded-full text-white/90"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
};