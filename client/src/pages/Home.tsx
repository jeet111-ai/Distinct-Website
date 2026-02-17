import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Reveal } from "@/components/ui/reveal";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { MapPin, Wifi, Armchair, Coffee, ShieldCheck, Calendar } from "lucide-react";

export default function Home() {
  const createBooking = useCreateBooking();
  
  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertBooking) => {
    createBooking.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-xl tracking-[0.2em] font-serif font-bold">DISTINCT</div>
        <button onClick={scrollToBooking} className="text-xs uppercase tracking-widest hover:text-primary transition-colors">
          Book a Tour
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          {/* Unsplash: Minimalist dark architecture/office */}
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
              Refined aesthetics, unparalleled service, and absolute privacy.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <LuxuryButton onClick={scrollToBooking} className="mt-8 border-white/30 text-white hover:bg-white hover:text-black hover:border-white">
              Request Access
            </LuxuryButton>
          </Reveal>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-white/50" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-6">
              <span className="text-primary text-xs tracking-[0.2em] uppercase">The Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                Sanctuary for <br/>Modern Leadership.
              </h2>
              <Separator className="w-24 bg-primary/30" />
              <p className="text-neutral-400 font-light leading-relaxed text-lg">
                We believe your environment dictates your output. Distinct offers a 
                meticulously designed ecosystem that eliminates distractions and 
                amplifies focus. Every detail, from the acoustics to the lighting, 
                is engineered for excellence.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] md:aspect-square">
               {/* Unsplash: Minimalist architectural detail */}
              <img 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200"
                alt="Interior Detail"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-full h-full border border-primary/20 -z-10" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Amenities Grid (Bento Box) */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="text-primary text-xs tracking-[0.2em] uppercase">Amenities</span>
              <h2 className="text-4xl font-serif mt-4">Curated Excellence</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Card 1 - Large */}
            <Reveal delay={0.1}>
              <div className="md:col-span-2 h-full relative group overflow-hidden bg-neutral-900 border border-white/5 hover:border-primary/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                {/* Unsplash: Private office */}
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                  alt="Private Suites"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" 
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <Armchair className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-serif mb-2">Private Executive Suites</h3>
                  <p className="text-neutral-400 font-light text-sm max-w-md">
                    Soundproofed sanctuaries furnished with ergonomic masterpieces. 
                    Your private headquarters away from home.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 2 */}
            <Reveal delay={0.2}>
              <div className="h-full bg-neutral-900 border border-white/5 p-8 flex flex-col justify-end hover:border-primary/30 transition-colors duration-500 group">
                <ShieldCheck className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-serif mb-3">Concierge Service</h3>
                <p className="text-neutral-400 font-light text-sm">
                  Dedicated staff to handle your mail, guests, and reservations. 
                  Focus on your work; we'll handle the rest.
                </p>
              </div>
            </Reveal>

            {/* Card 3 */}
            <Reveal delay={0.3}>
              <div className="h-full bg-neutral-900 border border-white/5 p-8 flex flex-col justify-end hover:border-primary/30 transition-colors duration-500 group">
                <Wifi className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-serif mb-3">Gigabit Infrastructure</h3>
                <p className="text-neutral-400 font-light text-sm">
                  Enterprise-grade fiber internet with redundancy. 
                  Secure, private VLANs for every member.
                </p>
              </div>
            </Reveal>

            {/* Card 4 - Large */}
            <Reveal delay={0.4}>
              <div className="md:col-span-2 h-full relative group overflow-hidden bg-neutral-900 border border-white/5 hover:border-primary/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                {/* Unsplash: Luxury lounge/coffee area */}
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200"
                  alt="Lounge"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" 
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <Coffee className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-serif mb-2">The Members Lounge</h3>
                  <p className="text-neutral-400 font-light text-sm max-w-md">
                    Artisanal coffee, networking events, and a relaxed atmosphere 
                    for casual meetings or evening cocktails.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="order-2 lg:order-1 h-[500px] bg-neutral-800 relative grayscale hover:grayscale-0 transition-all duration-700 border border-white/5">
             {/* Map Placeholder */}
             <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-neutral-500 tracking-widest text-xs uppercase">Interactive Map</p>
                </div>
             </div>
             {/* Overlay specific location text */}
             <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur p-6 border border-white/10 max-w-xs">
               <h4 className="font-serif text-lg mb-1">Distinct HQ</h4>
               <p className="text-neutral-400 text-sm font-light">Upper Lake Viewpoint<br/>Bhopal, MP 462002</p>
             </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8">
            <Reveal>
              <span className="text-primary text-xs tracking-[0.2em] uppercase">The Location</span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 leading-tight">
                Centrally Located,<br/>Yet Worlds Away.
              </h2>
              <Separator className="w-24 bg-primary/30" />
              <p className="text-neutral-400 font-light text-lg leading-relaxed">
                Situated overlooking the serene Upper Lake, our location offers a tranquil escape 
                from the urban chaos while remaining accessible. Inspiration flows as freely as the water views.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 text-sm text-neutral-300 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>15 min from Airport</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Premium Parking Available</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-32 bg-secondary/20 relative">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-16 space-y-4">
              <Calendar className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-serif">Begin Your Journey</h2>
              <p className="text-neutral-400 font-light">Inquire about membership or schedule a private tour.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-background p-8 md:p-12 border border-white/5 shadow-2xl shadow-black/50">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-neutral-500">Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-12" {...field} value={field.value || ''} />
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
                          <FormLabel className="text-xs uppercase tracking-wider text-neutral-500">Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors h-12" {...field} value={field.value || ''} />
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
                        <FormLabel className="text-xs uppercase tracking-wider text-neutral-500">Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your requirements..." 
                            className="bg-transparent border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors min-h-[100px] resize-none" 
                            {...field} 
                            value={field.value || ''} 
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
      <footer className="py-12 border-t border-white/5 bg-black text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-serif font-bold tracking-widest mb-2">DISTINCT</div>
            <p className="text-neutral-500 text-xs uppercase tracking-wider">Redefining Workspace Luxury</p>
          </div>
          
          <div className="flex gap-8 text-sm text-neutral-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} Distinct Spaces. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
