import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const categories = ["All", "Therapy Room", "Activities", "Clinic Environment"];

const galleryImages = [
  { src: "/placeholder.svg", alt: "Therapy room with activities", category: "Therapy Room" },
  { src: "/placeholder.svg", alt: "Child engaged in speech therapy", category: "Activities" },
  { src: "/placeholder.svg", alt: "Comfortable clinic environment", category: "Clinic Environment" },
  { src: "/placeholder.svg", alt: "Therapy materials and tools", category: "Therapy Room" },
  { src: "/placeholder.svg", alt: "Group activity session", category: "Activities" },
  { src: "/placeholder.svg", alt: "Welcoming reception area", category: "Clinic Environment" },
  { src: "/placeholder.svg", alt: "Sensory play activities", category: "Activities" },
  { src: "/placeholder.svg", alt: "Therapy session in progress", category: "Therapy Room" },
  { src: "/placeholder.svg", alt: "Clinic exterior", category: "Clinic Environment" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-accent via-background to-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Gallery</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Take a look at our therapy rooms, activities, and the comfortable environment we've created for our patients.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={`${img.alt}-${i}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="cursor-pointer group"
                onClick={() => setLightbox(i)}
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-accent border border-border/50">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="text-muted-foreground text-xs mt-2 text-center">{img.alt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setLightbox(null)}>
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={filtered[lightbox]?.src}
              alt={filtered[lightbox]?.alt}
              className="max-w-full max-h-[80vh] rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
