import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import LocationDetail from "@/pages/LocationDetail";
import NotFound from "@/pages/not-found";
import { ChatWidget } from "@/components/chat/ChatWidget";

// --- NEW IMPORTS ---
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import RefundPolicy from "@/pages/RefundPolicy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/locations/malviya-nagar" component={LocationDetail}/>
      
      // --- NEW ROUTES ---
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />

      // Catch-all route must stay at the bottom!
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ChatWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;