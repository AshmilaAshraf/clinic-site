import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Award, GraduationCap, Users, CheckCircle } from "lucide-react";
import therapistImg from "@/assets/therapist.jpg";
import aboutBg from "@/assets/about-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-22 lg:py-36">
        <div className="absolute inset-0 z-0">
          <img src={aboutBg} alt="" width={1920} height={1280} loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/95 to-background/60" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">About Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Learn about our mission, our approach, and the dedicated therapist behind Connect Speech and Rehabilitation Centre.</p>
        </div>
      </section>

      {/* Clinic story */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="About Connect Speech and Rehabilitation Centre" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Connect Speech and Rehabilitation Centre is dedicated to helping individuals improve their communication abilities and overall confidence. We provide specialized speech and language therapy services for both children and adults facing communication challenges.</p>
              <p>Our therapy programs focus on improving speech clarity, language development, fluency, voice quality, and social communication skills. Each therapy plan is designed according to the individual needs of the patient to ensure effective and meaningful progress.</p>
              <p>We aim to create a supportive and comfortable environment where patients and families feel encouraged throughout their communication journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Therapist profile */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="rounded-2xl aspect-square max-w-md mx-auto overflow-hidden shadow-xl">
                <img src={therapistImg} alt="AXXXX XXXXX XXXX, BASLP - Speech Therapist" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Meet Our Therapist</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">Axxxx Xxxxx Xxxxx</h2>
              <p className="text-primary font-medium mb-4">BASLP - Speech Therapist</p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>AXXXX XXXXX XXXX is a qualified Speech Therapist with a Bachelor's degree in Audiology and Speech-Language Pathology (BASLP). She is dedicated to helping children and adults overcome communication challenges and improve their speech and language abilities.</p>
                <p>Her therapy approach focuses on personalized care, evidence-based techniques, and creating a comfortable environment for patients and families.</p>
                <p>She works closely with patients to develop practical communication skills that enhance confidence and everyday interaction.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Award, label: "BASLP Qualified" },
                  { icon: Users, label: "Children & Adults" },
                  { icon: Heart, label: "Personalized Care" },
                  { icon: CheckCircle, label: "Evidence-Based" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <item.icon size={18} className="text-primary shrink-0" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-accent/60 via-background to-secondary/50">
        <div className="absolute inset-0 pattern-grid opacity-60 pointer-events-none" />
        <div className="absolute top-10 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-64 h-64 rounded-full bg-[hsl(195,55%,55%)]/15 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading title="Our Philosophy" subtitle="What drives us every day" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Personalized Therapy", desc: "Every patient receives a therapy plan designed specifically for their unique needs and goals.", icon: Heart },
              { title: "Supportive Environment", desc: "We create a warm, encouraging space where patients and families feel comfortable and confident.", icon: Users },
              { title: "Evidence-Based Practice", desc: "Our methods are grounded in the latest research and proven therapeutic techniques.", icon: Award },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full text-center border-border/50">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
