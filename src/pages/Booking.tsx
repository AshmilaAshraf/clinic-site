import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ArrowRight, ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const timeSlots = [
  "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00",
  "11:00 - 11:30", "11:30 - 12:00", "14:00 - 14:30", "14:30 - 15:00",
  "15:00 - 15:30", "15:30 - 16:00", "16:00 - 16:30", "16:30 - 17:00",
  "17:00 - 17:30", "17:30 - 18:00",
];

const bookingSchema = z.object({
  patientName: z.string().trim().min(1, "Name is required").max(100),
  age: z.string().trim().min(1, "Age is required"),
  patientType: z.string().min(1, "Please select patient type"),
  concern: z.string().trim().min(1, "Please describe your concern").max(1000),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
});

const Booking = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({
    patientName: "", age: "", patientType: "", concern: "", email: "", phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleNext = async () => {
    if (step === 1 && !date) {
      toast({ title: "Please select a date", variant: "destructive" });
      return;
    }
    if (step === 2 && !slot) {
      toast({ title: "Please select a time slot", variant: "destructive" });
      return;
    }
    if (step === 3) {
      const result = bookingSchema.safeParse(form);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((e) => { fieldErrors[e.path[0] as string] = e.message; });
        setErrors(fieldErrors);
        return;
      }
    }
    if (step === 4) {
      try {
        toast({ title: "Booking Appointment...", description: "Please wait.", duration: 15000 });
        const { submitBooking } = await import("@/lib/api");
        await submitBooking({
          ...form,
          date: date ? format(date, "PPP") : "",
          slot,
        });
        setSubmitted(true);
        toast({ title: "Booking Request Sent!", description: "The clinic will contact you shortly to confirm your appointment." });
      } catch (error) {
        toast({ title: "Submission Failed", description: "Could not book appointment right now. Please try again.", variant: "destructive" });
      }
      return;
    }
    setStep((s) => s + 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center border-border/50">
          <CardContent className="p-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Request Received!</h2>
            <p className="text-muted-foreground mb-6">Your booking request has been sent to Connect Speech and Rehabilitation Centre.</p>
            <div className="bg-accent rounded-xl p-4 text-left space-y-2 text-sm">
              <p><strong>Date:</strong> {date && format(date, "PPP")}</p>
              <p><strong>Time:</strong> {slot}</p>
              <p><strong>Patient:</strong> {form.patientName}</p>
              <p><strong>Type:</strong> {form.patientType}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Phone:</strong> {form.phone}</p>
            </div>
            <p className="text-muted-foreground text-xs mt-4">Our clinic will call you shortly on your provided phone number to confirm your booking and slot availability.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent via-background to-secondary py-12 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">Book an Appointment</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Schedule your consultation in just a few simple steps.</p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-card">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-10 gap-2">
            {["Date", "Time", "Details", "Confirm"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                  step > i + 1 ? "bg-primary text-primary-foreground" :
                  step === i + 1 ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {step > i + 1 ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={cn("text-xs font-medium hidden sm:inline", step === i + 1 ? "text-foreground" : "text-muted-foreground")}>{label}</span>
                {i < 3 && <div className={cn("w-8 h-0.5", step > i + 1 ? "bg-primary" : "bg-muted")} />}
              </div>
            ))}
          </div>

          <Card className="border-border/50">
            <CardContent className="p-6 lg:p-8">
              {/* Step 1: Date */}
              {step === 1 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-4">Select a Date</h2>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date() || d.getDay() === 0}
                      className="rounded-xl border border-border pointer-events-auto"
                    />
                  </div>
                  {date && <p className="text-center mt-4 text-sm text-muted-foreground">Selected: <strong className="text-foreground">{format(date, "PPP")}</strong></p>}
                </div>
              )}

              {/* Step 2: Time */}
              {step === 2 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-2">Select a Time Slot</h2>
                  <p className="text-muted-foreground text-sm mb-6">Each session is 30 minutes. Select an available slot.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlot(s)}
                        className={cn(
                          "flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all",
                          slot === s
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-accent"
                        )}
                      >
                        <Clock size={14} /> {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Details */}
              {step === 3 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">Patient Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="patientName">Patient Name *</Label>
                      <Input id="patientName" value={form.patientName} onChange={(e) => updateForm("patientName", e.target.value)} placeholder="Full name" className="mt-1" />
                      {errors.patientName && <p className="text-destructive text-xs mt-1">{errors.patientName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age *</Label>
                        <Input id="age" value={form.age} onChange={(e) => updateForm("age", e.target.value)} placeholder="Age" className="mt-1" />
                        {errors.age && <p className="text-destructive text-xs mt-1">{errors.age}</p>}
                      </div>
                      <div>
                        <Label>Patient Type *</Label>
                        <Select value={form.patientType} onValueChange={(v) => updateForm("patientType", v)}>
                          <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="adult">Adult</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.patientType && <p className="text-destructive text-xs mt-1">{errors.patientType}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="concern">Primary Concern *</Label>
                      <Textarea id="concern" value={form.concern} onChange={(e) => updateForm("concern", e.target.value)} placeholder="Briefly describe your concern" className="mt-1" rows={3} />
                      {errors.concern && <p className="text-destructive text-xs mt-1">{errors.concern}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="your@email.com" className="mt-1" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+91 XXXX XXXX XX" className="mt-1" />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">Review & Confirm</h2>
                  <div className="bg-accent rounded-xl p-6 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium text-foreground">{date && format(date, "PPP")}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium text-foreground">{slot}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Patient</span><span className="font-medium text-foreground">{form.patientName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Age</span><span className="font-medium text-foreground">{form.age}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-foreground capitalize">{form.patientType}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium text-foreground">{form.email}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium text-foreground">{form.phone}</span></div>
                    <div><span className="text-muted-foreground">Concern</span><p className="font-medium text-foreground mt-1">{form.concern}</p></div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 1}>
                  <ArrowLeft size={16} className="mr-1" /> Back
                </Button>
                <Button onClick={handleNext}>
                  {step === 4 ? "Confirm Booking" : "Next"} {step < 4 && <ArrowRight size={16} className="ml-1" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Booking;
