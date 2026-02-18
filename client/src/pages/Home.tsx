import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Reveal } from "@/components/ui/reveal";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "wouter";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

export default function Home() {
  const createBooking = useCreateBooking();
  
  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "General Inquiry",
      message: "",
    },
  });

  const onSubmit = (data: InsertBooking) => {
    createBooking.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-xl tracking-[0.2em] font-serif font-bold">DISTINCT CO-WORKING</div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Office Space"
            className="w-full h-full object-cover grayscale opacity-60"
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <Reveal>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight">
              Work <span className="text-primary italic">Distinctly</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-neutral-300 font-light tracking-wide max-w-2xl mx-auto mb-10">
              An ultra-premium workspace curated for the ambitious. 
              Distinct Co-working provides a thoughtfully designed luxury environment 
              built for professionals, startups, and growing teams.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-32 px-6 bg-secondary/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary text-xs tracking-[0.2em] uppercase">Our Presence</span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4">Selected Locations</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal delay={0.1}>
              <div className="group relative aspect-[16/10] overflow-hidden border border-white/5 bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                  alt="Malviya Nagar"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-4xl font-serif mb-4">Malviya Nagar</h3>
                  <Link href="/locations/malviya-nagar">
                    <LuxuryButton variant="outline" className="border-primary/50 text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      Explore Space <ArrowRight className="ml-2 w-4 h-4" />
                    </LuxuryButton>
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative aspect-[16/10] overflow-hidden border border-white/5 bg-neutral-900 opacity-80 cursor-not-allowed">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover opacity-30 grayscale"
                  alt="MP Nagar"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-serif mb-2">MP Nagar</h3>
                  <span className="bg-primary/20 text-primary text-[10px] uppercase tracking-widest px-4 py-2 border border-primary/30">Opening Soon</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 space-y-4">
              <Calendar className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-serif text-center w-full">Begin Your Journey</h2>
              <p className="text-neutral-400 font-light text-center">Connect with our concierge team to find your ideal workspace.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-secondary/30 p-8 md:p-12 border border-white/5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-neutral-500">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-neutral-500">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@company.com" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-neutral-500">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your requirements..." 
                            className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors min-h-[100px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-6 flex justify-center">
                    <LuxuryButton 
                      type="submit" 
                      variant="solid" 
                      className="w-full md:w-auto min-w-[200px]"
                      disabled={createBooking.isPending}
                    >
                      {createBooking.isPending ? "Submitting..." : "Submit Inquiry"}
                    </LuxuryButton>
                  </div>
                </form>
              </Form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-2xl font-serif font-bold tracking-widest mb-4">DISTINCT CO-WORKING</div>
          <div className="text-neutral-600 text-[10px] uppercase tracking-widest">
            info.distinctcoworking@gmail.com | +91 6366460968
          </div>
        </div>
      </footer>
    </div>
  );
}
