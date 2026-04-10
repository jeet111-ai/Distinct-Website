import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <nav className="fixed top-0 left-0 right-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#E6E8EB]/95 backdrop-blur-md border-b border-[#143866]/10 shadow-sm">
        {/* We replaced the <Link> with a <button> that triggers window.history.back() */}
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0A1E3C] hover:text-[#265B96] transition-colors font-semibold cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Go Back
        </button>
      </nav>

      <section className="pt-32 pb-12 px-6 bg-[#0A1E3C] text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-white">Booking Cancellation, Refund & Modification Policy </h1>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="space-y-8 text-foreground/80 leading-relaxed font-light">
          
          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">1. Booking Cancellation Policy </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All cancellations must be requested in writing via email or through official Distinct Co-working communication channels.</li>
              <li>No refund will be applicable once a booking has been confirmed and payment received.</li>
              <li>In case of cancellation, the amount paid may be adjusted toward a future booking of the same value, subject to management approval.</li>
              <li>Cancellations made due to unavoidable circumstances will be reviewed on a case-by-case basis at the discretion of Distinct Co-working management.</li>
              <li>Distinct Co-working reserves the right to cancel or reschedule a booking in case of operational issues, maintenance work, or unforeseen events. In such cases, members will be informed in advance, and alternate dates will be offered.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">2. Refund Policy </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All payments made to Distinct Co-working (Distinctspace Ventures LLP) are non-refundable under any circumstances.</li>
              <li>Refunds will not be issued for partial usage, early termination, or non-utilization of booked services.</li>
              <li>Distinct Co-working shall not be responsible for bank delays or transaction failures during refund processing.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">3. Booking Modification & Reschedule Policy </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Requests for modification (change of date, time, or type of space) must be made in writing and at least 48 hours prior to the scheduled booking.</li>
              <li>Modifications and reschedules are subject to space availability and management approval.</li>
              <li>Rate differences, if any, arising from the change in booking type, timing, or duration, must be paid by the client before confirmation.</li>
              <li>A booking can be rescheduled only once within the validity period (unless otherwise approved).</li>
              <li>No modification or reschedule request will be entertained after the booking time has started or once the validity period expires.</li>
              <li>Distinct Co-working reserves the right to approve or deny any modification or rescheduling request at its sole discretion.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">General Notes </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All communication regarding booking, cancellation, or modification must be made through official Distinct Co-working channels.</li>
              <li>Distinct Co-working management’s decision will be final and binding in all matters related to cancellations, refunds, or modifications.</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}