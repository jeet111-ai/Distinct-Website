import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Reveal } from "@/components/ui/reveal";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "wouter";
import { 
  Users, Monitor, Briefcase, Globe, 
  Video, Armchair, LayoutGrid, CheckCircle2,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const offerings = [
  { 
    title: "4-Seater Private Cabin", 
    icon: Users, 
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
    desc: "A thoughtfully designed 4-seater private cabin ideal for small teams that need focus, comfort, and a professional setting." 
  },
  { 
    title: "6-Seater Private Cabin", 
    icon: Users, 
    img: "https://images.unsplash.com/photo-1497215842964-2229243eefd4?auto=format&fit=crop&q=80&w=1200",
    desc: "An exclusive, fully serviced 6-seater executive cabin crafted for teams that value privacy, prestige, and performance." 
  },
  { 
    title: "Hot Desk / Open Desk", 
    icon: Armchair, 
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
    desc: "Flexible, vibrant workspaces in our shared lounge. Ideal for entrepreneurs and startups." 
  },
  { title: "4-Seater Conference Room", icon: Video, img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800", desc: "Intimate rooms for focused collaborations." },
  { title: "6-Seater Conference Room", icon: Monitor, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", desc: "Equipped for seamless hybrid presentations." },
  { title: "10-Seater Conference Room", icon: LayoutGrid, img: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=800", desc: "Boardroom excellence for major decisions." },
  { title: "Virtual Office", icon: Globe, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", desc: "Premium business identity without physical boundaries." },
  { title: "Business Address", icon: Briefcase, img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=800", desc: "Prestigious mailing address in Malviya Nagar." },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1497215842964-2229243eefd4?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600"
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
  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "Malviya Nagar",
      message: "",
    },
  });

  const onSubmit = (data: InsertBooking) => {
    createBooking.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center bg-background/80 backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Overview
        </Link>
        <div className="text-xl tracking-[0.2em] font-serif font-bold">DISTINCT CO-WORKING</div>
      </nav>

      {/* Hero with Enhanced Background - Slower animation */}
      <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 scale-[1.05] hover:scale-100 transition-transform duration-[20s] ease-linear">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Background"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        
        <div className="relative z-10">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-serif mt-4">Malviya Nagar</h1>
            <p className="text-neutral-400 font-light mt-6 max-w-2xl mx-auto italic">
              "A thoughtfully designed luxury workspace built for professionals, startups, and growing teams."
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery - Full View Slider with Upside Word */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Restructured Title - Top Part */}
        <div className="absolute top-32 left-0 right-0 z-20 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="inline-block">
                <span className="text-primary text-xs tracking-[0.3em] uppercase block mb-2 opacity-80">Premises</span>
                <h2 className="text-5xl md:text-7xl font-serif text-white/90">Visual Journey</h2>
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
            <img 
              src={galleryImages[currentSlide]} 
              className="w-full h-full object-cover opacity-70" 
              alt="Gallery" 
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        {/* Controls - Bottom Part */}
        <div className="absolute inset-x-0 bottom-20 px-6 z-10">
          <div className="max-w-7xl mx-auto flex justify-end">
            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                className="w-14 h-14 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md transition-all rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-14 h-14 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md transition-all rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings (Renamed from Our Spaces) */}
      <section className="py-24 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
               <span className="text-primary text-xs tracking-[0.2em] uppercase">Tailored Environments</span>
               <h2 className="text-4xl font-serif mt-4">Offerings</h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {offerings.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group overflow-hidden bg-neutral-900 border border-white/5 hover:border-primary/30 transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-serif">{item.title}</h3>
                    </div>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form - Enhanced with Phone and Company */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif">Request a Private Tour</h2>
              <p className="text-neutral-400 font-light mt-4 italic">Visit Harisons House, No. 6 Raj Bhavan Rd, Malviya Nagar.</p>
            </div>
          </Reveal>
          <div className="bg-neutral-900/50 p-8 md:p-12 border border-white/5 rounded-sm backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Full Name" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary transition-colors" {...field} />
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
                        <FormControl>
                          <Input placeholder="Email Address" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary transition-colors" {...field} />
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
                          <Input placeholder="Mobile Number" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary transition-colors" {...field} />
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
                          <Input placeholder="Company Name" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 h-12 focus-visible:border-primary transition-colors" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-6 flex justify-center">
                  <LuxuryButton type="submit" variant="solid" className="w-full md:w-auto min-w-[240px] h-14 text-lg" disabled={createBooking.isPending}>
                    {createBooking.isPending ? "Submitting..." : "Send Request"}
                  </LuxuryButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-black text-center">
        <div className="text-xl font-serif tracking-widest text-primary mb-2">DISTINCT CO-WORKING</div>
        <div className="text-neutral-500 text-[10px] uppercase tracking-widest mb-4">Harisons House, No. 6 Raj Bhavan Rd, Malviya Nagar, Bhopal-462003</div>
        <div className="text-neutral-600 text-[10px] uppercase tracking-widest">info.distinctcoworking@gmail.com | +91 6366460968</div>
      </footer>
    </div>
  );
}
