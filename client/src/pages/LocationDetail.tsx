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
  { title: "4 Seater Cabins", icon: Users, desc: "Private soundproofed sanctuaries for small teams." },
  { title: "6 Seater Cabins", icon: Users, desc: "Spacious executive suites with premium furnishing." },
  { title: "Hot Desk / Open Desk", icon: Armchair, desc: "Flexible, vibrant workspaces in our shared lounge." },
  { title: "4 Seater Conference", icon: Video, desc: "Intimate rooms for focused collaborations." },
  { title: "6 Seater Conference", icon: Monitor, desc: "Equipped for seamless hybrid presentations." },
  { title: "10 Seater Conference", icon: LayoutGrid, desc: "Boardroom excellence for major decisions." },
  { title: "Virtual Office", icon: Globe, desc: "Premium business identity without physical boundaries." },
  { title: "Business Address", icon: Briefcase, desc: "Prestigious mailing address in Malviya Nagar." },
];

const amenities = [
  "Meeting Booths",
  "Standing Desks with Whiteboard",
  "Brainstorming Areas",
  "Breakout Area",
  "Premium Pantry"
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
        <div className="text-xl tracking-[0.2em] font-serif font-bold">DISTINCT</div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center">
        <Reveal>
          <span className="text-primary text-xs tracking-[0.2em] uppercase">Now Active</span>
          <h1 className="text-5xl md:text-7xl font-serif mt-4">Malviya Nagar</h1>
          <p className="text-neutral-400 font-light mt-6 max-w-2xl mx-auto">
            Our flagship location offering a seamless blend of luxury and productivity 
            in the heart of Bhopal.
          </p>
        </Reveal>
      </section>

      {/* Offerings */}
      <section className="py-24 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-serif mb-16 text-center">Curated Spaces</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full bg-neutral-900 border border-white/5 p-8 hover:border-primary/30 transition-all group">
                  <item.icon className="w-8 h-8 text-primary mb-6 transition-transform group-hover:scale-110" />
                  <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary text-xs tracking-[0.2em] uppercase">The Environment</span>
              <h2 className="text-4xl font-serif mt-4">Gallery of Distinction</h2>
            </div>
          </Reveal>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <img src={src} alt={`Gallery ${i}`} className="w-full grayscale hover:grayscale-0 transition-all duration-700 border border-white/5" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-32 px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-8">
              <h2 className="text-4xl font-serif">Thoughtful Amenities</h2>
              <div className="grid grid-cols-1 gap-4">
                {amenities.map((item) => (
                  <div key={item} className="flex items-center gap-4 text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-lg font-light tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="aspect-square bg-neutral-900 border border-white/5 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200" alt="Amenities" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif">Request a Private Tour</h2>
              <p className="text-neutral-400 font-light mt-4">Experience the Malviya Nagar branch firsthand.</p>
            </div>
          </Reveal>
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
        <div className="text-xl font-serif tracking-widest text-primary mb-2">DISTINCT</div>
        <div className="text-neutral-600 text-[10px] uppercase tracking-widest">Premium Workspace Solutions</div>
      </footer>
    </div>
  );
}
