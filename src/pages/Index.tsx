import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import { motion } from "framer-motion";
import {
  MessageCircle, Brain, Hand, BookOpen, Heart, Baby,
  AlertCircle, CheckCircle, ArrowRight, Star, Phone, MapPin, Mail
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  }),
};

const services = [
  { icon: MessageCircle, title: "Speech Therapy", desc: "Comprehensive speech and language therapy for children and adults." },
  { icon: Hand, title: "Occupational Therapy", desc: "Helping individuals develop daily living and motor skills." },
  { icon: Brain, title: "Behavioral Therapy", desc: "Supporting positive behavioral development and communication." },
  { icon: BookOpen, title: "Special Education", desc: "Tailored educational support for diverse learning needs." },
];

const symptoms = [
  "Child not speaking at expected age",
  "Difficulty pronouncing words clearly",
  "Stammering or stuttering",
  "Difficulty understanding or following instructions",
  "Speech difficulties after stroke or brain injury",
  "Voice quality changes or hoarseness",
  "Feeding or swallowing difficulties",
  "Social communication challenges",
];

const testimonials = [
  { name: "Priya S.", text: "My son started speaking clearly after just 3 months of therapy. The therapist is incredibly patient and skilled.", rating: 5 },
  { name: "Rajesh K.", text: "After my stroke, I thought I'd never speak properly again. Connect Speech gave me my voice back.", rating: 5 },
  { name: "Anitha M.", text: "The team understands children so well. My daughter looks forward to every session!", rating: 5 },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-secondary py-16 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Welcome to</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Connect Speech &<br />
                <span className="text-gradient">Rehabilitation Centre</span>
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Helping Children and Adults Communicate with Confidence. Professional speech, language, and communication therapy services for individuals of all ages.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/booking">
                  <Button size="lg" className="text-base font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    Book Appointment <ArrowRight size={18} className="ml-1" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="text-base font-semibold px-8 py-6 rounded-xl">
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/50 blur-3xl" />
      </section>

      {/* About intro */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="bg-accent rounded-2xl aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Heart size={40} className="text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Therapist Photo Placeholder</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">About Us</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Dedicated to Your Communication Journey
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Connect Speech and Rehabilitation Centre is dedicated to helping individuals improve their communication abilities and overall confidence. We provide specialized speech and language therapy services for both children and adults facing communication challenges.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Led by <strong className="text-foreground">Amala Tressa Jose (BASLP)</strong>, a qualified Speech Therapist, our therapy programs focus on personalized care, evidence-based techniques, and creating a comfortable environment for patients and families.
              </p>
              <Link to="/about">
                <Button variant="outline" className="font-semibold">
                  Learn More About Us <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Services" subtitle="Comprehensive therapy programs tailored to your needs" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div key={service.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full hover:shadow-lg transition-shadow border-border/50 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                      <service.icon size={28} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline" className="font-semibold">
                View All Services <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who Needs Speech Therapy */}
      <section className="py-16 lg:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <SectionHeading title="Who Needs Speech Therapy?" subtitle="Recognizing the signs early leads to better outcomes" />
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {symptoms.map((symptom, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border/50"
              >
                <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
                <p className="text-foreground text-sm">{symptom}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/booking">
              <Button className="font-semibold">
                Book a Consultation <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter end={1000} label="Therapy Sessions Conducted" />
            <StatCounter end={500} label="Happy Patients" />
            <StatCounter end={5} suffix="+" label="Years of Experience" />
            <StatCounter end={100} suffix="%" label="Personalized Plans" />
          </div>
        </div>
      </section>

      {/* Testimonials preview */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading title="What Our Patients Say" subtitle="Real stories from real families" />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button variant="outline" className="font-semibold">
                Read More Testimonials <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact bar */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Phone size={20} /> <span className="font-medium">+91 XXXX XXXX XX</span>
            </a>
            <a href="mailto:info@connectspeech.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Mail size={20} /> <span className="font-medium">info@connectspeech.com</span>
            </a>
            <div className="flex items-center gap-2 text-foreground">
              <MapPin size={20} /> <span className="font-medium">Hyderabad, India</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
