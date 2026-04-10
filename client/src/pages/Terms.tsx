import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function Terms() {
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
        <h1 className="text-4xl md:text-5xl font-serif text-white">General Terms and Conditions </h1>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="space-y-8 text-foreground/80 leading-relaxed font-light">
          
          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">1. Introduction </h2>
            <p>Welcome to Distinct Co-working. These General Terms and Conditions govern the use of our co-working spaces, facilities, and services. By accessing or using our premises or digital platforms, you agree to comply with these terms, which apply to all members, visitors, and users.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">2. Membership and Usage </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Memberships are non-transferable and valid only for the individual or entity specified in the agreement.</li>
              <li>The workspace and facilities shall be used solely for lawful business or professional purposes.</li>
              <li>Members must comply with all Distinct Co-working rules, regulations, and operational guidelines communicated at the time of onboarding or from time to time.</li>
              <li>Distinct Co-working reserves the right to refuse, suspend, or terminate membership in case of misconduct, policy violations, or non-payment.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">3. Conduct and Behavior </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Members must maintain professional decorum and respect other co-workers, staff, and guests.</li>
              <li>Any form of harassment, abusive language, or disruptive behavior will not be tolerated.</li>
              <li>The use of alcohol, tobacco, or illegal substances is strictly prohibited within the premises.</li>
              <li>Members are expected to keep their workspace tidy and dispose of waste appropriately.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">4. Access and Operating Hours </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access to the premises will be available only during operational hours as defined by Distinct Co-working at each location.</li>
              <li>Extended or after-hours access may be provided upon prior approval and may attract additional charges.</li>
              <li>Access cards/keys, if issued, are the property of Distinct Co-working and must be returned upon termination of membership.</li>
              <li>In case of loss or damage to keys/access cards, replacement charges will apply.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">5. Payment and Fees </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All fees, deposits, and additional charges must be paid in full and on time, as per the agreed terms.</li>
              <li>All bookings and advances (including token amounts) are non-refundable in nature and refunds shall be processed only on exceptional grounds as decided by the Management of Distinct Co-working.</li>
              <li>Distinct Co-working reserves the right to suspend access or services for any unpaid dues.</li>
              <li>Any additional usage beyond agreed terms (e.g., overtime, printing, meeting room use) will be charged separately. Taxes and statutory levies will be applicable as per government regulations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">6. Property Care and Liability </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Members shall be responsible for maintaining the workspace and facilities in good condition.</li>
              <li>Any damage to furniture, fixtures, or property caused by a member or their guests must be compensated by the member.</li>
              <li>Distinct Co-working will not be liable for loss, theft, or damage to personal belongings. Members are encouraged to secure their valuables and data at all times.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">7. Internet and Technology Usage </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>The internet connection provided is intended for business use only.</li>
              <li>Members must not engage in illegal, unethical, or unauthorized online activities, including downloading restricted or copyrighted content.</li>
              <li>Any attempt to hack, disrupt, or compromise the network or IT infrastructure will lead to immediate termination and possible legal action.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">8. Health, Safety, and Maintenance </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Members must adhere to all safety, fire, and emergency procedures displayed within the premises.</li>
              <li>Smoking/E-cigarettes, open flames, alcohol or hazardous materials are not permitted.</li>
              <li>Distinct Co-working may conduct routine maintenance or repairs, during which access to certain areas may be temporarily restricted. Members are requested to cooperate during cleaning, maintenance or safety checks.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">9. Visitors and Guests </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Visitors are permitted only during operational hours and must be registered at reception.</li>
              <li>Members are responsible for the behavior and compliance of their guests.</li>
              <li>Overnight stays, personal meetings unrelated to business, or large gatherings without approval are not permitted.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">10. Confidentiality and Privacy </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Members must respect the confidentiality of other members and their business activities.</li>
              <li>Any misuse or sharing of confidential information obtained within the workspace is strictly prohibited.</li>
              <li>Distinct Co-working may collect and use personal data in accordance with its Privacy Policy to manage memberships and improve services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">11. Termination and Notice </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>A prior written notice (as specified in the membership agreement) is required before vacating the space.</li>
              <li>Distinct Co-working reserves the right to terminate access without refund in cases of misconduct, illegal activity, or violation of these terms.</li>
              <li>Upon termination, members must vacate the premises and return all access cards, keys, or assets belonging to Distinct Co-working.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">12. Force Majeure </h2>
            <p>Distinct Co-working shall not be held liable for failure to perform its obligations due to events beyond its reasonable control, including but not limited to natural disasters, strikes, power outages, government regulations, or technical failures.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">13. Right of Admission and Policy Updates </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Distinct Co-working reserves the right of admission and may refuse entry or services at its discretion.</li>
              <li>These terms and conditions are subject to change without prior notice. Updated versions will be made available on the official Distinct Co-working communication channels. Continued use of the workspace after updates constitutes acceptance of the revised terms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">14. Governing Law and Jurisdiction </h2>
            <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to Distinct Co-working services shall be subject to the exclusive jurisdiction of the courts in Bhopal, Madhya Pradesh.</p>
          </div>

        </div>
      </section>
    </div>
  );
}