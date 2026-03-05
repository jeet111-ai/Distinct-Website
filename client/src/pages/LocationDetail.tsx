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
import { Coffee, Lightbulb, BookOpen, Sparkles } from 'lucide-react';

/* ---------------- FORM SCHEMA ---------------- */

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit number"),
  company: z.string().min(1, "Company name is required"),
});
type FormData = z.infer<typeof formSchema>;

/* ---------------- DATA ARRAYS ---------------- */

const offerings = [
  { 
    title: "4-Seater Private Cabin", 
    icon: Users, 
    images: [
      "/images/4-seater-cabin2.webp",
      "/images/4-seater-cabin1.webp",
      "/images/4-seater-zone.webp"
    ],
    desc: "A thoughtfully designed 4-seater private cabin ideal for small teams that need focus, comfort, and a professional setting." 
  },
  { 
    title: "6-Seater Private Cabin", 
    icon: Users, 
    images: [
      "/images/6-seater-cabin1.webp",
      "/images/6-seater-cabin2.webp",
      "/images/reception-3.webp"
    ],
    desc: "An exclusive, fully serviced 6-seater executive cabin crafted for teams that value privacy, prestige, and performance." 
  },
  { 
    title: "Hot Desk / Open Desk", 
    icon: Armchair, 
    images: [
      "/images/background1.webp",
      "/images/open-area3.webp",
      "/images/hotdesk.webp"
    ],
    desc: "Flexible, vibrant workspaces in our shared lounge. Ideal for entrepreneurs and startups." 
  },
  { 
    title: "4-Seater Conference Room", 
    icon: Video, 
    images: ["/images/4-seater-conference1.webp"],
    desc: "Intimate rooms for focused collaborations." 
  },
  { 
    title: "6-Seater Conference Room", 
    icon: Monitor, 
    images: ["/images/6-seater-conference1.webp","/images/6-seater-conference2.webp"],
    desc: "Equipped for seamless hybrid presentations." 
  },
  { 
    title: "10-Seater Conference Room", 
    icon: LayoutGrid, 
    images: ["/images/10-seater-conference1.webp","/images/10-seater-conference2.webp"],
    desc: "Boardroom excellence for major decisions." 
  },
  { 
    title: "Virtual Office", 
    icon: Globe, 
    images: ["/images/virtual-office.webp"],
    desc: "Premium business identity without physical boundaries."
  },
  { 
    title: "Business Address", 
    icon: Briefcase, 
    images: ["/images/frontview.webp"],
    desc: "Prestigious mailing address in Malviya Nagar." 
  },
];

const premiumAmenities = [
  {
    title: "Self-Service Pantry",
    icon: Coffee,
    images: [
      "/images/pantry-1.webp",
      "/images/pantry-2.webp",
    ],
    desc: "Fuel your day with our fully stocked self-service pantry, featuring complimentary, unlimited tea, bean to cup coffee, and cookies."
  },
  {
    title: "Brainstorming Area",
    icon: Lightbulb,
    images: [
      "/images/brainstorming1.webp",
      "/images/brainstorming2.webp",
      "/images/brainstorming3.webp"
    ],
    desc: "A dynamic, active workspace equipped with standing desks and expansive whiteboards to map out your next big project."
  },
  {
    title: "Breakout & Chill Zone",
    icon: BookOpen,
    images: [
      "/images/breakout2.webp",
      "/images/breakout3.webp",
      "/images/breakout1.webp"
    ],
    desc: "Step away from the screen. A dedicated relaxation space stocked with curated books and board games to help you disconnect and recharge."
  },
  {
    title: "Dedicated Washrooms",
    icon: Sparkles,
    images: [
      "/images/washroom-1.webp",
      "/images/washroom-2.webp",
      "/images/washroom-3.webp"
    ],
    desc: "Impeccably maintained and continuously serviced washroom facilities ensuring uncompromising hygiene and comfort."
  }
];

const galleryImages = [
  "/images/reception-2.webp",
  "/images/reception-1.webp",
  "/images/open-area1.webp",
  "/images/meeting-area1.webp",
  "/images/meeting-area2.webp",  
  "/images/open-area2.webp",
  "/images/lobby1.webp",
  "/images/open-area3.webp",
  "/images/open-area4.webp",
  "/images/hotdesk.webp"
];

/* ---------------- CAROUSEL LOGIC ---------------- */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.5,
  }),
  center: { x: 0, opacity: 1, zIndex: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0.5,
    zIndex: 0
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

/* ---------------- UNIVERSAL CAROUSEL CARD ---------------- */

const InteractiveCarouselCard = ({ item, variant = "dark" }: { item: any, variant?: "light" | "dark" }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  
  const imagesList = item.images || [];
  const imageIndex = imagesList.length > 0 
    ? ((page % imagesList.length) + imagesList.length) % imagesList.length 
    : 0;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const isLight = variant === "light";

  return (
    <div className={`group overflow-hidden flex flex-col h-full transition-all ${
      isLight ? "bg-white shadow-xl border border-primary/10 hover:border-primary/30 rounded-sm" 
              : "bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
    }`}>
      
      {/* IMAGE CAROUSEL */}
      <div className={`relative w-full shrink-0 overflow-hidden ${
        isLight ? "aspect-[4/3] md:aspect-[3/2] bg-gray-100" : "h-[300px] md:h-[360px] bg-[#0A1E3C]"
      }`}>
        {imagesList.length > 0 && (
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={imagesList[imageIndex]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0 w-full h-full object-cover object-center cursor-grab active:cursor-grabbing"
              drag={imagesList.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
            />
          </AnimatePresence>
        )}

        {/* ARROWS */}
        {imagesList.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all z-10 opacity-0 group-hover:opacity-100 ${
                isLight ? "bg-white/80 text-primary hover:bg-primary hover:text-white" 
                        : "bg-black/40 text-white hover:bg-[#0A1E3C] backdrop-blur-md"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => paginate(1)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all z-10 opacity-0 group-hover:opacity-100 ${
                isLight ? "bg-white/80 text-primary hover:bg-primary hover:text-white" 
                        : "bg-black/40 text-white hover:bg-[#0A1E3C] backdrop-blur-md"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* DOTS */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {imagesList.map((_: any, idx: number) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === imageIndex
                      ? (isLight ? "w-6 bg-primary" : "w-6 md:w-8 bg-white")
                      : (isLight ? "w-2 bg-primary/40" : "w-1.5 md:w-2 bg-white/50")
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* TEXT SECTION */}
      <div className={`p-6 md:p-8 space-y-4 flex-grow flex flex-col ${isLight ? "bg-white" : "bg-[#0A1E3C]"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
            isLight ? "bg-secondary/30 text-primary group-hover:bg-primary/10" 
                    : "bg-white/10 text-white group-hover:bg-white group-hover:text-[#0A1E3C]"
          }`}>
            <item.icon className="w-5 h-5" />
          </div>
          <h3 className={`text-xl md:text-2xl font-serif ${isLight ? "text-foreground" : "text-white tracking-wide"}`}>
            {item.title}
          </h3>
        </div>
        {item.desc && (
          <p className={`text-sm md:text-base leading-relaxed ${isLight ? "text-foreground/70 font-light" : "text-gray-400"}`}>
            {item.desc}
          </p>
        )}
      </div>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function LocationDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    galleryImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return; 
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, isAutoPlaying]);

  const handleManualNext = () => {
    setIsAutoPlaying(false);
    nextSlide();
  };

  const handleManualPrev = () => {
    setIsAutoPlaying(false);
    prevSlide();
  };

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
    createBooking.mutate({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      company: data.company,
      location: "Malviya Nagar",
      message: "" 
    }, {
      onSuccess: () => form.reset() 
    });

    try {
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
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 px-6 py-3 md:py-4 flex justify-between items-center bg-[#E6E8EB]/95 backdrop-blur-md border-b border-[#143866]/10 shadow-sm transition-all">
        <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0A1E3C] hover:text-[#265B96] transition-colors font-semibold">
          <ChevronLeft className="w-4 h-4" /> Back to Overview
        </Link>
        
        <Link href="/" className="flex items-center gap-3 md:gap-5 cursor-pointer group">
          <span className="text-lg md:text-xl tracking-[0.2em] font-serif font-bold text-[#0A1E3C] hidden md:block">DISTINCT CO-WORKING</span>
          <img 
            src="/logo/Distinct Final_Icon.png" 
            alt="Distinct Co-working Logo" 
            className="h-24 md:h-28 lg:h-32 w-auto object-contain -my-6 md:-my-8 lg:-my-10 group-hover:scale-105 transition-transform"
          />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6 text-center overflow-hidden bg-[#0A1E3C]">
        <div className="absolute inset-0 z-0 opacity-40 scale-[1.05] hover:scale-100 transition-transform duration-[20s] ease-linear mix-blend-luminosity">
          <img 
            src="/images/background1.webp"
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

      {/* Gallery Slider */}
      <section className="relative h-screen overflow-hidden bg-[#0A1E3C]">
        <div className="absolute top-24 md:top-32 left-0 right-0 z-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="inline-block">
                <span className="text-secondary text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-2 font-bold">Premises</span>
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
            <img 
              src={galleryImages[currentSlide]} 
              className="w-full h-full object-contain md:object-cover" 
              alt="Gallery" 
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0A1E3C]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A1E3C]/50 to-transparent pointer-events-none z-10" />

        <div className="absolute inset-x-0 bottom-20 px-6 z-20">
          <div className="max-w-7xl mx-auto flex justify-end">
            <div className="flex gap-4">
              <button 
                onClick={handleManualPrev}
                className="w-14 h-14 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-[#0A1E3C] backdrop-blur-md transition-all rounded-full shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleManualNext}
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
          
          {/* Note: Reveal wraps the entire grid now to fix equal-height bugs */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {offerings.map((item) => (
                <InteractiveCarouselCard key={item.title} item={item} variant="light" />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Premium Amenities (Dark Theme) */}
      <section className="relative py-24 bg-[#0A1E3C] z-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <span className="text-secondary text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-2 font-bold">
                Beyond the Desk
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
                Premium Amenities
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Experience a workspace designed for more than just tasks. From a pristine self-service pantry to dynamic brainstorming zones, every detail is crafted to elevate your daily routine.
              </p>
            </div>
          </Reveal>

          {/* Note: Reveal wraps the entire grid now to fix equal-height bugs */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {premiumAmenities.map((amenity, index) => (
                <InteractiveCarouselCard key={index} item={amenity} variant="dark" />
              ))}
            </div>
          </Reveal>
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

      {/* Footer */}
      <footer className="py-16 md:py-20 border-t border-white/10 bg-[#0A1E3C] flex flex-col items-center text-center px-6">
        <img 
          src="/logo/Distinct Final_Logo_White.png" 
          alt="Distinct Co-working Logo" 
          className="w-[200px] md:w-[260px] lg:w-[300px] h-auto object-contain mb-10 hover:scale-105 transition-transform duration-500 drop-shadow-lg"
        />
        
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
        
        <div className="mt-12 pt-8 border-t border-white/5 w-full max-w-2xl text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} Distinct Co-working Spaces. All rights reserved.
        </div>
      </footer>
    </div>
  );
}