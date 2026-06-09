import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import testimonialsBg from "@/assets/testimonials-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const testimonials = [
  { name: "Priya S.", text: "My son started speaking clearly after just 3 months of therapy. The therapist is incredibly patient and skilled. We are so grateful!", rating: 5, type: "Parent" },
  { name: "Rajesh K.", text: "After my stroke, I thought I'd never speak properly again. Connect Speech gave me my voice back. Truly life-changing therapy.", rating: 5, type: "Adult Patient" },
  { name: "Anitha M.", text: "The team understands children so well. My daughter looks forward to every session! The progress has been amazing.", rating: 5, type: "Parent" },
  { name: "Suresh R.", text: "My stammering has reduced significantly after regular sessions. I feel much more confident in meetings now.", rating: 5, type: "Adult Patient" },
  { name: "Lakshmi D.", text: "The parent training sessions were eye-opening. We learned so many techniques to help our child at home.", rating: 5, type: "Parent" },
  { name: "Kavitha P.", text: "Our autistic child has shown remarkable improvement in communication. The personalized approach makes all the difference.", rating: 5, type: "Parent" },
  { name: "Arun T.", text: "Voice therapy helped me recover after vocal cord issues. Professional, caring, and highly effective treatment.", rating: 4, type: "Adult Patient" },
  { name: "Meena J.", text: "The feeding therapy for my toddler was a game-changer. He now eats so much better. Thank you!", rating: 5, type: "Parent" },
];

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Feedback is required").max(1000),
});

const Testimonials = () => {
  const { toast } = useToast();
  const [feedbackForm, setFeedbackForm] = useState({ name: "", email: "", message: "", rating: 5 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = feedbackSchema.safeParse(feedbackForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    toast({ title: "Thank you!", description: "Your feedback has been submitted." });
    setFeedbackForm({ name: "", email: "", message: "", rating: 5 });
    setErrors({});
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img src={testimonialsBg} alt="" width={1920} height={1280} loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/95 to-background/60" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Testimonials</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Real stories from real families and patients who trusted us with their communication journey.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={16} className={j < t.rating ? "fill-primary text-primary" : "text-muted"} />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">{t.type}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback form */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-accent/50 via-background to-secondary/40">
        <div className="absolute inset-0 pattern-grid opacity-50 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[hsl(195,55%,55%)]/15 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading title="Leave Your Feedback" subtitle="Your experience matters to us" />
          <Card className="max-w-lg mx-auto border-border/50">
            <CardContent className="p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fb-name">Your Name *</Label>
                  <Input id="fb-name" value={feedbackForm.name} onChange={(e) => { setFeedbackForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: "" })); }} placeholder="Your name" className="mt-1" />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="fb-email">Email *</Label>
                  <Input id="fb-email" type="email" value={feedbackForm.email} onChange={(e) => { setFeedbackForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: "" })); }} placeholder="your@email.com" className="mt-1" />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(r => (
                      <button key={r} type="button" onClick={() => setFeedbackForm(p => ({ ...p, rating: r }))}>
                        <Star size={24} className={r <= feedbackForm.rating ? "fill-primary text-primary" : "text-muted"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="fb-message">Your Feedback *</Label>
                  <Textarea id="fb-message" value={feedbackForm.message} onChange={(e) => { setFeedbackForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: "" })); }} placeholder="Share your experience" className="mt-1" rows={4} />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full font-semibold">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
