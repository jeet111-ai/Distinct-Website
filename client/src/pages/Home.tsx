import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Reveal } from "@/components/ui/reveal";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "wouter";
import { MapPin, Calendar, ArrowRight, Shield, Users, Monitor, Instagram, Facebook, Mail, Phone, Search, CheckCircle2 } from "lucide-react";

const amenities = [
  { name: "Ergonomic workstations", desc: "Designed for comfort and productivity." },
  { name: "High-speed internet", desc: "Enterprise-grade connectivity." },
  { name: "Meeting Booths & Conference Rooms", desc: "Private spaces for calls and meetings." },
  { name: "Brainstorming Area & Standing Desks", desc: "Dynamic spaces for creative work." },
  { name: "Well equipped self-service pantry", desc: "Refreshments at your convenience." },
  { name: "Comfortable breakout and collaboration areas", desc: "Spaces to unwind and network." },
  { name: "Professional ambience that reflects your brand", desc: "An environment built for success." },
];

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

  const mapUrl = "https://www.google.com/maps/dir//Lower+Ground+Floor,+Distinct+Co-working,+Harisons+House,+6,+Rajbhavan+Rd,+Malviya+Nagar,+Bhopal,+Madhya+Pradesh+462003/@23.2392843,77.4027938,17z/data=!4m16!1m7!3m6!1s0x397c43c91d370e13:0xf68319a51f4bc03e!2sDistinct+Co-working!8m2!3d23.2392794!4d77.4053687!16s%2Fg%2F11yywgqy1m!4m7!1m0!1m5!1m1!1s0x397c43c91d370e13:0xf68319a51f4bc03e!2m2!1d77.4053687!2d23.2392794?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-xl tracking-[0.2em] font-serif font-bold">DISTINCT CO-WORKING</div>
      </nav>

      {/* Hero Section with Upper Right Form */}
      <section className="relative h-screen flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Office Space"
            className="w-full h-full object-cover grayscale opacity-60"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Headline */}
          <div className="lg:max-w-2xl space-y-8 text-center lg:text-left">
            <Reveal>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-none">
                Work <br/><span className="text-primary italic">Distinctly</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-neutral-300 font-light tracking-wide max-w-xl">
                An ultra-premium workspace curated for the ambitious. 
                Distinct Co-working provides a thoughtfully designed luxury environment 
                built for professionals, startups, and growing teams.
              </p>
            </Reveal>
          </div>

          {/* Upper Right Side: Inquiry Form */}
          <Reveal delay={0.4} className="w-full max-w-md lg:mt-[-4rem]">
            <div className="bg-black/40 backdrop-blur-xl p-8 md:p-10 border border-white/10 shadow-2xl rounded-sm">
              <h2 className="text-2xl font-serif text-white mb-6 text-center">Inquire Now</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="First Name" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 text-white placeholder:text-neutral-500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Last Name" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 text-white placeholder:text-neutral-500" />
                      </FormControl>
                    </FormItem>
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email Address" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 text-white placeholder:text-neutral-500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Mobile Number" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 text-white placeholder:text-neutral-500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Company Name" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 text-white placeholder:text-neutral-500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LuxuryButton 
                    type="submit" 
                    variant="solid" 
                    className="w-full mt-4 h-12"
                    disabled={createBooking.isPending}
                  >
                    {createBooking.isPending ? "Processing..." : "Secure Access"}
                  </LuxuryButton>
                </form>
              </Form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-primary text-xs tracking-[0.2em] uppercase">Our Expertise</span>
              <h2 className="text-4xl md:text-6xl font-serif mt-4">Premium Offerings</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Private Offices", icon: Shield, desc: "Soundproofed executive suites for absolute privacy and focus." },
              { title: "Hot Desk", icon: Users, desc: "Flexible workspace in a dynamic, professional environment." },
              { title: "Conference Rooms", icon: Monitor, desc: "High-tech meeting spaces for seamless collaboration." }
            ].map((offering, i) => (
              <Reveal key={offering.title} delay={i * 0.1}>
                <div className="text-center space-y-6 group">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center border border-primary/20 rounded-full group-hover:bg-primary/10 transition-colors">
                    <offering.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif">{offering.title}</h3>
                  <p className="text-neutral-500 font-light leading-relaxed">{offering.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-32 px-6 bg-secondary/10 border-y border-white/5">
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

      {/* Why Distinct - Moved from Location page */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-primary text-xs tracking-[0.2em] uppercase">Why Distinct?</span>
              <h2 className="text-4xl font-serif mt-4">What Makes Us Different</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {amenities.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <h4 className="font-serif text-xl">{item.name}</h4>
                  </div>
                  <p className="text-neutral-500 text-sm font-light pl-8">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Detailed Contact Section */}
      <footer className="py-24 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 text-left">
          <div className="space-y-8">
            <div className="text-2xl font-serif font-bold tracking-widest text-primary">DISTINCT CO-WORKING</div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div className="text-neutral-300 font-light text-sm leading-relaxed">
                  Distinct Co-working, Lower Ground floor,<br />
                  Harisons House, No.6 Raj Bhavan Road,<br />
                  Malviya Nagar, Bhopal - 462003, MP
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info.distinctcoworking@gmail.com" className="text-neutral-300 font-light text-sm hover:text-primary transition-colors">
                  info.distinctcoworking@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div className="flex flex-col text-neutral-300 font-light text-sm">
                  <a href="tel:+916366460968" className="hover:text-primary transition-colors">+91 6366460968</a>
                  <a href="tel:+919243807744" className="hover:text-primary transition-colors">+91 9243807744</a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-primary text-xs tracking-widest uppercase font-semibold">Find Your Way</h4>
            <div className="aspect-[16/9] bg-neutral-900 border border-white/10 relative overflow-hidden group rounded-sm shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14663.856!2d77.4053687!3d23.2392794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43c91d370e13%3A0xf68319a51f4bc03e!2sDistinct+Co-working!5e0!3m2!1sen!2sin!4v1711234567890"
                className="w-full h-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a 
                href={mapUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-all"
              >
                <div className="text-center group-hover:scale-105 transition-transform">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <span className="text-[9px] uppercase tracking-widest text-white border border-primary/30 bg-black/60 px-4 py-2 backdrop-blur-sm">Get Directions</span>
                </div>
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-primary text-xs tracking-widest uppercase font-semibold">Digital Presence</h4>
            <div className="space-y-4">
              <a 
                href="https://www.instagram.com/distinctcoworking/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-neutral-400 text-sm tracking-widest uppercase hover:text-primary transition-colors group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61587662000138" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-neutral-400 text-sm tracking-widest uppercase hover:text-primary transition-colors group"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.google.com/search?q=Distinct+Co-working" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-neutral-400 text-sm tracking-widest uppercase hover:text-primary transition-colors group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                <span>Google</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-neutral-600 text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} Distinct Co-working Spaces.
        </div>
      </footer>
    </div>
  );
}
