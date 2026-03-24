import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    try {
      toast({ title: "Sending message...", description: "Please wait.", duration: 10000 });
      const { submitFeedback } = await import("@/lib/api");
      await submitFeedback(form);
      toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      toast({ title: "Failed to send message", description: "Please try again later.", variant: "destructive" });
    }
  };

  const update = (key: string, value: string) => {
    setForm(p => ({ ...p, [key]: value }));
    setErrors(p => ({ ...p, [key]: "" }));
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-accent via-background to-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We'd love to hear from you. Reach out to us for appointments, queries, or any information.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">+91 XXXX XXXX XX</p>
                  </div>
                </a>
                <a href={`https://wa.me/91XXXXXXXXXX`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <MessageCircle size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p className="font-medium text-foreground">+91 XXXX XXXX XX</p>
                  </div>
                </a>
                <a href="mailto:info@connectspeech.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">info@connectspeech.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <MapPin size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">Hyderabad, India</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden border border-border/50 bg-accent aspect-video flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Google Maps Embed - Coming Soon</p>
              </div>
            </div>

            {/* Form */}
            <div>
              <Card className="border-border/50">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="c-name">Name *</Label>
                      <Input id="c-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="mt-1" />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="c-email">Email *</Label>
                      <Input id="c-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" className="mt-1" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="c-phone">Phone *</Label>
                      <Input id="c-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 XXXX XXXX XX" className="mt-1" />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="c-message">Message *</Label>
                      <Textarea id="c-message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="How can we help you?" className="mt-1" rows={5} />
                      {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" className="w-full font-semibold">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
