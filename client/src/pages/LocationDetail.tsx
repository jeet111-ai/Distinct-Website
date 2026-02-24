import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Reveal } from "@/components/ui/reveal";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Link } from "wouter";
import { 
  Users, Monitor, Briefcase, Globe, 
  Video, Armchair, LayoutGrid, CheckCircle2,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// --- Custom Frontend Form Schema for Split Names & Strict Validation ---
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit number"),
  company: z.string().min(1, "Company name is required"),
});
type FormData = z.infer<typeof formSchema>;

const offerings = [
  { 
    title: "4-Seater Private Cabin", 
    icon: Users, 
    img: "https://media.licdn.com/dms/image/v2/D5622AQGXc0yvOR7s8g/feedshare-shrink_1280/B56Zwjli7jGUAc-/0/1770123577433?e=1773273600&v=beta&t=Ta6Iz8yoD2E0FT_YlOiBuAFJ_XCuof0iWOrNU2w8pEQ",
    desc: "A thoughtfully designed 4-seater private cabin ideal for small teams that need focus, comfort, and a professional setting." 
  },
  { 
    title: "6-Seater Private Cabin", 
    icon: Users, 
    img: "https://media.licdn.com/dms/image/v2/D5622AQGsK6iqug1ZMw/feedshare-shrink_1280/B56ZwjlivIKIAc-/0/1770123576506?e=1773273600&v=beta&t=uwpMDBLeOEfg19U1_2pVUmm3ayM5cOvcxukvgwVt0fA",
    desc: "An exclusive, fully serviced 6-seater executive cabin crafted for teams that value privacy, prestige, and performance." 
  },
  { 
    title: "Hot Desk / Open Desk", 
    icon: Armchair, 
    img: "https://media.licdn.com/dms/image/v2/D5622AQHWmZxDH9RdEQ/feedshare-shrink_2048_1536/B56ZwjliTCIQAk-/0/1770123574508?e=1773273600&v=beta&t=4LEzU1KLgAvAaQYD43tz3QFerOqkVEZ-4EC5uRm4Zt0",
    desc: "Flexible, vibrant workspaces in our shared lounge. Ideal for entrepreneurs and startups." 
  },
  { title: "4-Seater Conference Room", icon: Video, img: "https://media.licdn.com/dms/image/v2/D5622AQGXcJzw8eCxMg/feedshare-shrink_1280/B56Zwjlg7sHcAg-/0/1770123567421?e=1773273600&v=beta&t=391W8Ms2E5w_EQLMuVZUUCtjyMXtlT3DUNU811paA3c", desc: "Intimate rooms for focused collaborations." },
  { title: "6-Seater Conference Room", icon: Monitor, img: "https://media.licdn.com/dms/image/v2/D5622AQHeL1_RhDBtCA/feedshare-shrink_2048_1536/B56ZwjliLnJYAk-/0/1770123574514?e=1773273600&v=beta&t=c2IOKohfLQdXaiEKP242b7KLlZEkbXNLyrbRDtuQUiY", desc: "Equipped for seamless hybrid presentations." },
  { title: "10-Seater Conference Room", icon: LayoutGrid, img: "https://media.licdn.com/dms/image/v2/D5622AQHyDsYBvRbDBw/feedshare-shrink_2048_1536/B56ZwjlgHkIwAk-/0/1770123565664?e=1773273600&v=beta&t=1SbBD-FLjMK-WN8fX5wBIidhPPlVE6eYaolpvmT_BO4", desc: "Boardroom excellence for major decisions." },
  { title: "Virtual Office", icon: Globe, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", desc: "Premium business identity without physical boundaries." },
  { title: "Business Address", icon: Briefcase, img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=800", desc: "Prestigious mailing address in Malviya Nagar." },
];

const galleryImages = [
  "https://media.licdn.com/dms/image/v2/D5622AQFO_2kYrX-csw/feedshare-shrink_2048_1536/B56ZwjliMSGUAk-/0/1770123573693?e=1773273600&v=beta&t=dKg2lV6rfrRRhM06OoPfkurXRk_9wQ0QbcBHccNxnQA",
  "https://media.licdn.com/dms/image/v2/D5622AQHWmZxDH9RdEQ/feedshare-shrink_2048_1536/B56ZwjliTCIQAk-/0/1770123574508?e=1773273600&v=beta&t=4LEzU1KLgAvAaQYD43tz3QFerOqkVEZ-4EC5uRm4Zt0",
  "https://media.licdn.com/dms/image/v2/D5622AQHO7AexYa3i1A/feedshare-shrink_2048_1536/B56Zwjlgi9KIAk-/0/1770123567304?e=1773273600&v=beta&t=Zpr8PW0llXhroOKmhOwIxJFb6u_ZRxn9m6Cp36O20nc",
  "https://media.licdn.com/dms/image/v2/D5622AQFTl__bclrjqg/feedshare-shrink_2048_1536/B56ZwjleYuI4Ao-/0/1770123557934?e=1773273600&v=beta&t=4CL9d28RnmEbmt5ux47jYcSTA_V793nPy0m-7QafN9Q",
  "https://media.licdn.com/dms/image/v2/D5622AQFHF7-UcXUKow/feedshare-shrink_2048_1536/B56ZwjljHOKIAk-/0/1770123579489?e=1773273600&v=beta&t=SplM4cDqtT_-6opj0WwOfkbOFmpdLB6k_Rr2mA6NM64",
  "https://media.licdn.com/dms/image/v2/D5622AQEEEztiv-rvSg/feedshare-shrink_2048_1536/B56ZwjlhahJoAk-/0/1770123570457?e=1773273600&v=beta&t=9ddcHYkvTNiLB2Gp23WzzCx60oLB_R0zFltmVT6zKdA",
  "https://media.licdn.com/dms/image/v2/D5622AQGvzLqSqN-n8Q/feedshare-shrink_2048_1536/B56ZwjlhdNJoAk-/0/1770123570527?e=1773273600&v=beta&t=-k237UwgF291lZnDfPENPWcs1h885pxLugzpOE5sAIg"
];

export default function LocationDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

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
    // 1. Send to Local Database & trigger your bottom toast message
    createBooking.mutate({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      company: data.company,
      location: "Malviya Nagar",
      message: "" 
    }, {
      onSuccess: () => form.reset() // This clears the form and shows the nice bottom msg!
    });

    try {
      // 2. Send separated data directly to Google Apps Script
      // IMPORTANT: Paste your actual Google Script URL here!
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
    } catch (error) {
      console.error("Google Script failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation - Text first, Logo on the RIGHT (Mist Grey Background) */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 px-6 py-3 md:py-4 flex justify-between items-center bg-[#E6E8EB]/95 backdrop-blur-md border-b border-[#143866]/10 shadow-sm transition-all">
        {/* Left Side: Back Button */}
        <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0A1E3C] hover:text-[#265B96] transition-colors font-semibold">
          <ChevronLeft className="w-4 h-4" /> Back to Overview
        </Link>
        
        {/* Right Side: Text THEN Big Brand Logo */}
        <Link href="/" className="flex items-center gap-3 md:gap-5 cursor-pointer group">
          <span className="text-lg md:text-xl tracking-[0.2em] font-serif font-bold text-[#0A1E3C] hidden md:block">DISTINCT CO-WORKING</span>
          <img 
            src="/Distinct Final_Icon.png" 
            alt="Distinct Co-working Logo" 
            className="h-24 md:h-28 lg:h-32 w-auto object-contain -my-6 md:-my-8 lg:-my-10 group-hover:scale-105 transition-transform"
          />
        </Link>
      </nav>
      {/* Hero with Enhanced Background - Dark Luxury */}
      <section className="relative pt-40 pb-32 px-6 text-center overflow-hidden bg-[#0A1E3C]">
        <div className="absolute inset-0 z-0 opacity-40 scale-[1.05] hover:scale-100 transition-transform duration-[20s] ease-linear mix-blend-luminosity">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E3C] via-transparent to-[#0A1E3C]/90" />
        </div>
        
        <div className="relative z-10">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-serif mt-4 text-white">Malviya Nagar</h1>
            <p className="text-white/80 font-light mt-6 max-w-2xl mx-auto italic">
              "A thoughtfully designed luxury workspace built for professionals, startups, and growing teams."
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery - Full View Slider */}
      <section className="relative h-screen overflow-hidden bg-[#0A1E3C]">
      {/* Adjusted top spacing for mobile: top-24 instead of top-32 */}
        <div className="absolute top-24 md:top-32 left-0 right-0 z-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="inline-block">
                <span className="text-secondary text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-2 font-bold">Premises</span>
                {/* Scaled down from 5xl to 3xl/4xl on mobile, keeps massive 7xl on desktop! */}
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white">Visual Journey</h2>
              </div>
            </Reveal>
          </div>
        </div>

        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute inset-0"
          >
            {/* FIX: object-contain on mobile shows the full photo, object-cover keeps it grand on desktop! */}
            <img 
              src={galleryImages[currentSlide]} 
              className="w-full h-full object-contain md:object-cover" 
              alt="Gallery" 
            />
          </motion.div>
        </AnimatePresence>

        {/* FIX 2: Edge Gradients! Only dark at the top and bottom so text is readable, middle is totally clear. */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0A1E3C]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A1E3C]/50 to-transparent pointer-events-none z-10" />

        <div className="absolute inset-x-0 bottom-20 px-6 z-20">
          <div className="max-w-7xl mx-auto flex justify-end">
            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                className="w-14 h-14 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-[#0A1E3C] backdrop-blur-md transition-all rounded-full shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-14 h-14 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-[#0A1E3C] backdrop-blur-md transition-all rounded-full shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings (Light Theme) */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
               <span className="text-primary text-xs tracking-[0.2em] uppercase font-bold">Tailored Environments</span>
               <h2 className="text-4xl font-serif mt-4 text-foreground">Offerings</h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {offerings.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group overflow-hidden bg-white shadow-xl border border-primary/10 hover:border-primary/30 transition-all rounded-sm">
                  {/* Taller box shape so photos don't aggressively crop */}
                  <div className="aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700" 
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/30 text-primary group-hover:bg-primary/10 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-serif text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-foreground/70 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    {/* Booking Form - Light Luxury */}
      <section className="py-32 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-foreground">Request a Private Tour</h2>
              <p className="text-foreground/70 font-light mt-4 italic">Visit Harisons House, No. 6 Raj Bhavan Rd, Malviya Nagar.</p>
            </div>
          </Reveal>
          <div className="bg-white p-8 md:p-12 border border-primary/10 rounded-sm shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* FIXED: First Name & Last Name Split Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="First Name" className="bg-transparent border-b border-primary/20 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary text-foreground placeholder:text-foreground/50 transition-colors" {...field} />
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
                            <Input placeholder="Last Name" className="bg-transparent border-b border-primary/20 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary text-foreground placeholder:text-foreground/50 transition-colors" {...field} />
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
                          <Input placeholder="Email Address" className="bg-transparent border-b border-primary/20 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary text-foreground placeholder:text-foreground/50 transition-colors" {...field} />
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
                          <Input placeholder="Mobile Number" className="bg-transparent border-b border-primary/20 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary text-foreground placeholder:text-foreground/50 transition-colors" {...field} />
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
                          <Input placeholder="Company Name" className="bg-transparent border-b border-primary/20 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary text-foreground placeholder:text-foreground/50 transition-colors" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-6 flex justify-center">
                  <LuxuryButton type="submit" variant="solid" className="w-full md:w-auto min-w-[240px] h-14 text-lg bg-primary text-white hover:bg-primary/90" disabled={createBooking.isPending}>
                    {createBooking.isPending ? "Submitting..." : "Send Request"}
                  </LuxuryButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist Centered Layout with PERFECT Logo Size */}
      <footer className="py-16 md:py-20 border-t border-white/10 bg-[#0A1E3C] flex flex-col items-center text-center px-6">
        
        {/* 1. Centered White Logo (The Goldilocks Size!) */}
        <img 
          src="/Distinct Final_Logo_White.png" 
          alt="Distinct Co-working Logo" 
          /* Dialed back to w-[300px] on desktop for the perfect balance */
          className="w-[200px] md:w-[260px] lg:w-[300px] h-auto object-contain mb-10 hover:scale-105 transition-transform duration-500 drop-shadow-lg"
        />
        
        {/* 2. Clean Location & Contact Info */}
        <div className="space-y-3">
          <div className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.2em]">
            Harisons House, No. 6 Raj Bhavan Rd, Malviya Nagar, Bhopal-462003
          </div>
          <div className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.2em] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <a href="mailto:info@distinctcoworking.com" className="hover:text-white transition-colors">
              info@distinctcoworking.com
            </a>
            <span className="hidden md:inline-block text-white/30">|</span>
            <div className="flex items-center gap-3">
              <a href="tel:+916366460968" className="hover:text-white transition-colors">+91 6366460968</a>
              <span className="text-white/30">|</span>
              <a href="tel:+919243807744" className="hover:text-white transition-colors">+91 9243807744</a>
            </div>
          </div>
        </div>
        
        {/* 3. Subtle Copyright Line */}
        <div className="mt-12 pt-8 border-t border-white/5 w-full max-w-2xl text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} Distinct Co-working Spaces. All rights reserved.
        </div>
      </footer>
    </div>
  );
}