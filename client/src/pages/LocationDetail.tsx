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
import { 
  Users, Monitor, Briefcase, Globe, 
  Video, Coffee, Armchair, Zap, 
  ChevronLeft, LayoutGrid, CheckCircle2 
} from "lucide-react";

const offerings = [
  { 
    title: "4-Seater Private Cabin", 
    icon: Users, 
    desc: "A thoughtfully designed 4-seater private cabin ideal for small teams that need focus, comfort, and a professional setting. Fully furnished with ergonomic workstations, high-speed internet, and a lockable layout, this space offers the perfect balance of privacy and collaboration within the vibrant ecosystem of Distinct Co-working." 
  },
  { 
    title: "6-Seater Private Cabin", 
    icon: Users, 
    desc: "An exclusive, fully serviced 6-seater executive cabin crafted for teams that value privacy, prestige, and performance. Thoughtfully designed with premium furnishings, ergonomic workstations, and seamless high-speed connectivity, this lockable space offers a refined, distraction-free setting for strategic work and high-value client meetings — all within the sophisticated ecosystem of Distinct Co-working." 
  },
  { title: "Hot Desk / Open Desk", icon: Armchair, desc: "Flexible, vibrant workspaces in our shared lounge. Our space is ideal for entrepreneurs, startups, and growing teams who want more than just a desk—they want the right environment to do their best work." },
  { title: "4-Seater Conference Room", icon: Video, desc: "Intimate rooms for focused collaborations and professional meetings." },
  { title: "6-Seater Conference Room", icon: Monitor, desc: "Equipped for seamless hybrid presentations and team syncs." },
  { title: "10-Seater Conference Room", icon: LayoutGrid, desc: "Boardroom excellence for major decisions and corporate presentations." },
  { title: "Virtual Office", icon: Globe, desc: "Premium business identity without physical boundaries." },
  { title: "Business Address", icon: Briefcase, desc: "Prestigious mailing address in Malviya Nagar, Harisons House." },
];

const amenities = [
  { name: "Ergonomic workstations", desc: "Designed for comfort and productivity." },
  { name: "High-speed internet", desc: "Enterprise-grade connectivity." },
  { name: "Meeting Booths & Conference Rooms", desc: "Private spaces for calls and meetings." },
  { name: "Brainstorming Area & Standing Desks", desc: "Dynamic spaces for creative work." },
  { name: "Well equipped self-service pantry", desc: "Refreshments at your convenience." },
  { name: "Comfortable breakout and collaboration areas", desc: "Spaces to unwind and network." },
  { name: "Professional ambience that reflects your brand", desc: "An environment built for success." },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1497215842964-2229243eefd4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=800"
];

export default function LocationDetail() {
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

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center">
        <Reveal>
          <span className="text-primary text-xs tracking-[0.2em] uppercase">The Branch</span>
          <h1 className="text-5xl md:text-7xl font-serif mt-4">Malviya Nagar</h1>
          <p className="text-neutral-400 font-light mt-6 max-w-2xl mx-auto italic">
            "A thoughtfully designed luxury workspace built for professionals, startups, and growing teams."
          </p>
        </Reveal>
      </section>

      {/* Offerings */}
      <section className="py-24 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
               <span className="text-primary text-xs tracking-[0.2em] uppercase">What We Offer</span>
               <h2 className="text-4xl font-serif mt-4">Our Spaces</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerings.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full bg-neutral-900 border border-white/5 p-8 hover:border-primary/30 transition-all group">
                  <item.icon className="w-8 h-8 text-primary mb-6 transition-transform group-hover:scale-110" />
                  <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Breakout Zone Special */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <h2 className="text-4xl font-serif">Breakout Zone</h2>
            <p className="text-neutral-400 font-light text-lg leading-relaxed">
              A vibrant relaxation corner designed to recharge your mind between tasks. 
              Featuring indoor games and a curated selection of books, this space is perfect for 
              unwinding, sparking creativity, or enjoying casual conversations with fellow members. 
              The ideal balance of productivity and play, right inside the Distinct Co-working community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-32 px-6 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary text-xs tracking-[0.2em] uppercase">The Environment</span>
              <h2 className="text-4xl font-serif mt-4">Gallery of Distinction</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((src, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="aspect-[4/3] overflow-hidden border border-white/5">
                  <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-32 px-6">
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

      {/* Booking Form */}
      <section className="py-32 px-6 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif">Request a Private Tour</h2>
              <p className="text-neutral-400 font-light mt-4">Visit Harisons House, No. 6 Raj Bhavan Rd, Malviya Nagar.</p>
            </div>
          </Reveal>
          <div className="bg-background p-8 md:p-12 border border-white/5">
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
                          <Input placeholder="John Doe" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 h-12" {...field} />
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
                          <Input placeholder="john@company.com" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-6 flex justify-center">
                  <LuxuryButton type="submit" variant="solid" className="min-w-[200px]" disabled={createBooking.isPending}>
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
