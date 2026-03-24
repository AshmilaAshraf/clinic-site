import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageCircle, Baby, User, Sparkles, ArrowRight,
  Brain, Hand, BookOpen, Heart, Mic, Volume2, Utensils,
  Users, Lightbulb, Languages
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const pediatricServices = [
  { icon: MessageCircle, title: "Speech Delay Therapy", desc: "Helping children who are late in developing speech and language skills through structured, play-based therapy." },
  { icon: Languages, title: "Language Development", desc: "Building strong receptive and expressive language skills through interactive activities." },
  { icon: Utensils, title: "Feeding & Oral Motor Therapy", desc: "Addressing feeding difficulties and strengthening oral motor skills in children." },
  { icon: Brain, title: "Behavioral & Communication Support", desc: "Supporting children with behavioral challenges that affect communication and social interaction." },
  { icon: BookOpen, title: "Learning & Developmental Support", desc: "Tailored educational support for children with diverse learning needs and developmental challenges." },
  { icon: Heart, title: "Social Communication Skills", desc: "Helping children develop social interaction, turn-taking, and pragmatic language skills." },
];

const adultServices = [
  { icon: Mic, title: "Post-Stroke Speech Rehabilitation", desc: "Therapy for aphasia, dysarthria, and other speech difficulties resulting from stroke or brain injury." },
  { icon: Volume2, title: "Stammering & Fluency Therapy", desc: "Evidence-based techniques to improve speech fluency and confidence in daily communication." },
  { icon: MessageCircle, title: "Voice Disorders", desc: "Assessment and therapy for voice quality issues including hoarseness, vocal strain, and resonance problems." },
  { icon: Utensils, title: "Swallowing & Speech Coordination", desc: "Therapy for swallowing difficulties (dysphagia) and speech coordination challenges." },
];

const specializedPrograms = [
  { icon: Lightbulb, title: "Language Stimulation Therapy", desc: "Guiding parents and caregivers in using everyday interactions to support language development naturally." },
  { icon: Hand, title: "AAC Communication Support", desc: "Augmentative and Alternative Communication strategies for individuals who need additional tools to communicate." },
  { icon: Sparkles, title: "Echolalia & GLP Support", desc: "Supporting children who communicate through echolalia or gestalt language processing patterns." },
  { icon: Users, title: "Parent Training & Guidance", desc: "Practical strategies for families to support speech and language progress at home." },
];

const casesWeHandle = [
  "Autism Spectrum Disorder", "Speech & Language Delay", "Voice Disorders", "Stuttering/Stammering",
  "Gestalt Language Processing", "Cerebral Palsy", "Learning Disabilities", "Speech Sound Disorders",
  "Apraxia of Speech", "Aphasia", "Dysarthria", "Feeding Therapy",
];

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent via-background to-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Comprehensive speech, language, and rehabilitation therapy programs for children and adults.</p>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="pediatric" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-10 h-auto">
              <TabsTrigger value="pediatric" className="py-3 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Baby size={16} className="mr-2 hidden sm:inline" /> Pediatric
              </TabsTrigger>
              <TabsTrigger value="adult" className="py-3 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User size={16} className="mr-2 hidden sm:inline" /> Adult
              </TabsTrigger>
              <TabsTrigger value="specialized" className="py-3 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Sparkles size={16} className="mr-2 hidden sm:inline" /> Specialized
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pediatric">
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Pediatric Speech Therapy</h2>
                <p className="text-muted-foreground">We provide specialized therapy for children experiencing speech and language development challenges. Therapy sessions are designed to be engaging, supportive, and tailored to the individual developmental needs of each child.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pediatricServices.map((s, i) => (
                  <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                    <Card className="h-full border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                          <s.icon size={24} className="text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="adult">
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Adult Communication Therapy</h2>
                <p className="text-muted-foreground">For adults, we provide therapy for various speech and communication difficulties that may arise due to medical conditions or long-term speech challenges. Our goal is to help adults regain confidence and communicate effectively.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {adultServices.map((s, i) => (
                  <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                    <Card className="h-full border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                          <s.icon size={24} className="text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specialized">
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Specialized Programs</h2>
                <p className="text-muted-foreground">Our specialized programs address unique communication needs through targeted strategies and family-centered approaches.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {specializedPrograms.map((s, i) => (
                  <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                    <Card className="h-full border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                          <s.icon size={24} className="text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Cases We Handle */}
      <section className="py-16 lg:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <SectionHeading title="Cases We Handle" subtitle="We work with a wide range of communication and developmental conditions" />
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {casesWeHandle.map((c, i) => (
              <motion.span
                key={c}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-card border border-border/50 text-foreground text-sm font-medium px-4 py-2 rounded-full"
              >
                {c}
              </motion.span>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/booking">
              <Button className="font-semibold">
                Book a Consultation <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
