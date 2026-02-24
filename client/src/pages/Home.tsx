import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Reveal } from "@/components/ui/reveal";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Link } from "wouter";
//import { MapPin, ArrowRight, Shield, Users, Monitor, Instagram, Facebook, Mail, Phone, Search, CheckCircle2 } from "lucide-react";
import { MapPin, ArrowRight, Shield, Users, Monitor, Instagram, Facebook, Mail, Phone, Search, CheckCircle2, Linkedin } from "lucide-react";

// --- Custom Frontend Form Schema for Split Names ---
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit number"), // Strict 10-digit check
  company: z.string().min(1, "Company name is required"), // Now mandatory!
});
type FormData = z.infer<typeof formSchema>;

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
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // 1. Send to Local Database safely
    createBooking.mutate({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      company: data.company || "",
      location: "General Inquiry",
      message: "" 
    });

    try {
      // 2. Send separated data directly to Google Apps Script
      await fetch("https://script.google.com/macros/s/AKfycbxbBJ3c_vImRSgulIpKNbCVrqo2skuQiRUPPErxgn-y3YVLDnWUUFkNmltF0fik9TST/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type":"text/plain;charset=utf-8" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          company: data.company
        }),
      });

      //alert("Inquiry received! Our concierge will contact you shortly.");
      form.reset();

    } catch (error) {
      console.error("Google Script failed:", error);
      //alert("Something went wrong with the form. Please try calling us directly.");
    }
  };

  const mapUrl = "https://www.google.com/maps/dir//Lower+Ground+Floor,+Distinct+Co-working,+Harisons+House,+6,+Rajbhavan+Rd,+Malviya+Nagar,+Bhopal,+Madhya+Pradesh+462003/@23.2392843,77.4027938,17z/data=!4m16!1m7!3m6!1s0x397c43c91d370e13:0xf68319a51f4bc03e!2sDistinct+Co-working!8m2!3d23.2392794!4d77.4053687!16s%2Fg%2F11yywgqy1m!4m7!1m0!1m5!1m1!1s0x397c43c91d370e13:0xf68319a51f4bc03e!2m2!1d77.4053687!2d23.2392794?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
     {/* Navigation - Sleek on Mobile, Massive on Desktop */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 px-4 md:px-6 py-2 md:py-4 flex justify-between items-center bg-[#E6E8EB]/95 backdrop-blur-md border-b border-[#143866]/10 shadow-sm transition-all">
        <Link href="/" className="flex items-center gap-3 md:gap-5 cursor-pointer group">
          <img 
            src="/Distinct Final_Icon.png" 
            alt="Distinct Co-working Logo" 
            /* Shrinks to h-12 on mobile, expands back to h-32 on desktop */
            className="h-12 md:h-28 lg:h-32 w-auto object-contain -my-2 md:-my-8 lg:-my-10 group-hover:scale-105 transition-transform"
          />
          {/* Scaled down text size and line-height for mobile screens */}
          <span className="text-[13px] md:text-xl tracking-widest md:tracking-[0.2em] font-serif font-bold text-[#0A1E3C] leading-tight">
            DISTINCT CO-WORKING
          </span>
        </Link>
      </nav>

      {/* Hero Section (Stays dark for dramatic impact) */}
      {/* FIX 2: Added min-h-screen and pt-32 for mobile so text doesn't hide behind the navbar */}
      <section className="relative min-h-screen lg:h-screen flex items-center px-6 md:px-12 overflow-hidden pt-32 pb-20 lg:pt-0 lg:pb-0">
        <div className="absolute inset-0 z-0 bg-[#0A1E3C]">
          <div className="absolute inset-0 bg-[#0A1E3C]/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Office Space"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 mt-8 lg:mt-0">
          {/* Left Side: Headline */}
          <div className="lg:max-w-2xl space-y-8 text-center lg:text-left">
            <Reveal>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-none">
                {/* FIX 1: Added pr-4 and inline-block so the 'y' gets enough space! */}
                Work <br/><span className="text-secondary italic pr-4 inline-block">Distinctly</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-xl mx-auto lg:mx-0">
                Distinct Co-working is a thoughtfully designed luxury workspace built for professionals, startups, and growing teams who want more than just a desk — they want the right environment to do their best work.
              </p>
            </Reveal>
          </div>

          {/* Upper Right Side: Inquiry Form (Glassmorphism) */}
          <Reveal delay={0.4} className="w-full max-w-md lg:mt-[-4rem]">
            <div className="bg-[#0A1E3C]/40 backdrop-blur-xl p-8 md:p-10 border border-white/10 shadow-2xl rounded-sm">
              <h2 className="text-2xl font-serif text-white mb-6 text-center">Enquire Now</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="First Name" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-secondary transition-colors h-11 text-white placeholder:text-white/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Last Name" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-secondary transition-colors h-11 text-white placeholder:text-white/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email Address" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-secondary transition-colors h-11 text-white placeholder:text-white/50" {...field} />
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
                          <Input placeholder="Mobile Number" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-secondary transition-colors h-11 text-white placeholder:text-white/50" {...field} />
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
                          <Input placeholder="Company Name" className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-secondary transition-colors h-11 text-white placeholder:text-white/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <LuxuryButton 
                    type="submit" 
                    variant="solid" 
                    className="w-full mt-4 h-12 bg-primary text-white hover:bg-primary/90"
                    disabled={createBooking.isPending}
                  >
                    {createBooking.isPending ? "Processing..." : "Submit"}
                  </LuxuryButton>
                </form>
              </Form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Offerings (Light Theme) */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-primary text-xs tracking-[0.2em] uppercase font-bold">Our Expertise</span>
              <h2 className="text-4xl md:text-6xl font-serif mt-4 text-foreground">Offerings</h2>
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
                  <div className="w-16 h-16 mx-auto flex items-center justify-center border border-primary/20 bg-secondary/30 rounded-full group-hover:bg-primary/10 transition-colors">
                    <offering.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground">{offering.title}</h3>
                  <p className="text-foreground/70 font-light leading-relaxed">{offering.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section (Light Theme) */}
      <section className="py-32 px-6 bg-secondary/20 border-y border-primary/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary text-xs tracking-[0.2em] uppercase font-bold">Our Presence</span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">Locations</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal delay={0.1}>
              {/* Made taller on mobile (aspect-[4/3]) and normal on desktop */}
              <div className="group relative aspect-[4/3] md:aspect-[16/10] overflow-hidden border border-primary/10 bg-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  alt="Malviya Nagar"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3C]/90 to-transparent" />
                
                {/* Reduced padding and text size on mobile screens */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-white">Malviya Nagar</h3>
                  <Link href="/locations/malviya-nagar">
                    <LuxuryButton variant="outline" className="w-full sm:w-auto text-xs md:text-sm border-white/50 text-white hover:bg-white hover:text-[#0A1E3C] transition-all">
                      Explore Space <ArrowRight className="ml-2 w-4 h-4" />
                    </LuxuryButton>
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative aspect-[16/10] overflow-hidden border border-primary/10 bg-[#0A1E3C] opacity-90 cursor-not-allowed shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                  alt="MP Nagar"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-serif mb-2 text-white">MP Nagar</h3>
                  <span className="bg-secondary text-[#0A1E3C] text-[10px] uppercase tracking-widest px-4 py-2 border border-secondary/50 font-bold">Opening Soon</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Distinct (Light Theme) */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-primary text-xs tracking-[0.2em] uppercase font-bold">Why Distinct?</span>
              <h2 className="text-4xl font-serif mt-4 text-foreground">What Makes Us Different</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {amenities.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <h4 className="font-serif text-xl text-foreground">{item.name}</h4>
                  </div>
                  <p className="text-foreground/70 text-sm font-light pl-8">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

{/* Footer - Clean, Professional Enterprise Layout */}
      <footer className="py-20 lg:py-24 px-6 bg-[#0A1E3C] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 text-left">
          
          {/* Section 1 (Left 33%): The Brand Hub */}
          <div className="lg:col-span-4 flex flex-col justify-center h-full border-b lg:border-b-0 lg:border-r border-white/10 pb-12 lg:pb-0 lg:pr-8">
            {/* 1. THE CLEAN LOGO - Reduced Size */}
            <div className="mb-auto mt-auto">
              <img 
                src="/Distinct Final_Logo_White.png" 
                alt="Distinct Co-working Logo" 
                className="w-full max-w-[160px] md:max-w-[200px] lg:max-w-[240px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Section 2 (Middle 33%): The Map & Digital Presence */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-secondary text-xs tracking-widest uppercase font-semibold mb-6">Find Your Way</h4>
            <div className="w-full h-48 md:h-56 bg-black/50 border border-white/10 relative overflow-hidden group rounded-sm shadow-2xl mb-10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14663.856!2d77.4053687!3d23.2392794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43c91d370e13%3A0xf68319a51f4bc03e!2sDistinct+Co-working!5e0!3m2!1sen!2sin!4v1711234567890"
                className="absolute inset-0 w-full h-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a 
                href={mapUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-[#0A1E3C]/40 group-hover:bg-[#0A1E3C]/10 transition-all duration-500"
              >
                <div className="text-center group-hover:scale-105 transition-transform duration-500">
                  <MapPin className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <span className="text-[9px] uppercase tracking-widest text-[#0A1E3C] font-bold border border-secondary bg-secondary px-4 py-2 backdrop-blur-sm">Get Directions</span>
                </div>
              </a>
            </div>

            {/* 2. Digital Presence - Moved exactly below the map! */}
            <div className="w-full flex flex-col items-start">
              <h4 className="text-secondary text-xs tracking-widest uppercase font-semibold mb-5">Digital Presence</h4>
              <div className="flex items-center gap-6">
                <a href="https://www.instagram.com/distinctcoworking/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors group">
                  <Instagram className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all" /> 
                </a>
                <a href="https://www.facebook.com/profile.php?id=61587662000138" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors group">
                  <Facebook className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all" /> 
                </a>
                <a href="https://www.google.com/search?q=Distinct+Co-working" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors group">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/distinct-co-working/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors group">
                  <Linkedin className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all" /> 
                </a>
              </div>
            </div>
          </div>

          {/* Section 3 (Right 33%): Contact Us */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-secondary text-xs tracking-widest uppercase font-semibold mb-6">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-secondary mt-1 shrink-0" />
                <div className="text-white/70 font-light text-sm leading-relaxed">
                  Distinct Co-working, Lower Ground floor,<br />
                  Harisons House, No.6 Raj Bhavan Road,<br />
                  Malviya Nagar, Bhopal - 462003, MP
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href="mailto:info@distinctcoworking.com" className="text-white/70 font-light text-sm hover:text-white transition-colors">
                  info@distinctcoworking.com
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-secondary mt-1 shrink-0" />
                <div className="flex flex-col text-white/70 font-light text-sm">
                  <a href="tel:+916366460968" className="hover:text-white transition-colors">+91 6366460968</a>
                  <a href="tel:+919243807744" className="hover:text-white transition-colors">+91 9243807744</a>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Footer Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-2 text-white/40 text-[10px] uppercase tracking-widest text-center">
          <span>© {new Date().getFullYear()} Distinct Co-working Spaces. All rights reserved.</span>
          <span>Bhopal, Madhya Pradesh</span>
        </div>
      </footer>
    </div>
  );
}