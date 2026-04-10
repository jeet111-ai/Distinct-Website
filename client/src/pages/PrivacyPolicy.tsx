import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl md:text-5xl font-serif text-white">Privacy Policy </h1>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="space-y-10 text-foreground/80 leading-relaxed font-light">
          
          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">1. Introduction </h2>
            <p>Distinct Co-working is committed to protecting your personal information and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our coworking spaces, services, and digital platforms. By using Distinct Co-working’s facilities or services, you consent to the practices described in this policy.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">2. Information We Collect </h2>
            
            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">2.1 Personal Information </h3>
            <p className="mb-2">We may collect the following information from members, visitors, and users:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Full name, company name, and designation</li>
              <li>Contact details (phone number, email address, mailing address)</li>
              <li>Government-issued ID proof (for verification and security access if required)</li>
              <li>Payment details and billing information</li>
              <li>Emergency contact details</li>
              <li>Photographs or CCTV footage (for security purposes as required)</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">2.2 Usage Information </h3>
            <p className="mb-2">We may also collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access logs and Wi-Fi usage data</li>
              <li>Workspace entry/exit records</li>
              <li>Device and browser information (for digital access)</li>
              <li>Preferences or feedback related to workspace usage and services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">3. How We Use Your Information </h2>
            <p className="mb-2">We use your personal data to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Manage memberships, bookings, and payments </li>
              <li>Provide access to workspace and facilities </li>
              <li>Send invoices, payment reminders, and service updates </li>
              <li>Ensure workplace safety, security, and compliance </li>
              <li>Communicate promotional offers, newsletters, or event updates (only with your consent) </li>
              <li>Improve customer experience and operational efficiency </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">4. Data Sharing and Disclosure </h2>
            <p className="mb-2">Distinct Co-working does not sell, rent, or trade personal data. However, we may share data with:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Authorized third-party service providers (e.g., payment gateways, IT support) </li>
              <li>Government authorities or law enforcement, if required by law </li>
              <li>Professional advisors (auditors, legal counsel) under confidentiality agreements </li>
            </ul>
            <p>All third parties are required to maintain the same level of data protection as Distinct Co-working.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">5. Data Security </h2>
            <p className="mb-2">We take appropriate technical and organizational measures to secure your personal data, including:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Encrypted storage of sensitive data </li>
              <li>Secure access control for authorized personnel only </li>
              <li>Regular system monitoring and security audits </li>
              <li>Firewalls and antivirus protection for digital systems </li>
            </ul>
            <p>Despite best efforts, no electronic storage or transmission method is 100% secure. Distinct Co-working cannot guarantee absolute data security but ensures reasonable safeguards are maintained at all times.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">6. Data Retention </h2>
            <p>We retain personal information only as long as necessary to fulfill the purpose for which it was collected or as required by applicable law. After the retention period, your data is securely deleted or anonymized.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">7. Your Rights </h2>
            <p className="mb-2">As a member or visitor, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Access and review your personal data </li>
              <li>Request correction or update of inaccurate information </li>
              <li>Withdraw consent for marketing communications </li>
              <li>Request deletion of your data (subject to legal or contractual obligations) </li>
            </ul>
            <p>You can exercise these rights by writing to <a href="mailto:support@distinctcoworking.com" className="text-primary hover:underline">support@distinctcoworking.com</a>.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">8. Cookies and Digital Tracking </h2>
            <p>Our website may use cookies or similar technologies to enhance user experience and collect usage analytics. You can choose to disable cookies through your browser settings, but some features of our website may not function properly without them.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">9. CCTV and Surveillance </h2>
            <p>For security purposes, Distinct Co-working premises are monitored via CCTV. Cameras are installed only in public and common areas — not in private offices, against the screens in meeting rooms, or washrooms. The footage is stored securely and accessed only by authorized personnel when required for safety, investigation, or legal compliance.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">10. Third-Party Links </h2>
            <p>Our website or communications may include links to external websites. Distinct Co-working is not responsible for the privacy practices or content of those third-party sites. We encourage users to review the privacy policies of any external services they interact with.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">11. Policy Updates </h2>
            <p>Distinct Co-working may update this Privacy Policy periodically to reflect operational, legal, or regulatory changes. Updated versions will be published on our official website and effective upon posting. Members are encouraged to review this policy regularly.</p>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-foreground mb-3 font-medium">12. Contact Us </h2>
            <p className="mb-1">For any privacy-related concerns, questions, or requests, please contact:</p>
            <div className="bg-secondary/10 p-4 rounded-sm border border-secondary/20 inline-block mt-2">
              <p className="font-semibold text-foreground">Distinctspace Ventures LLP (Brand Name: Distinct Co-working) </p>
              <p className="mt-1">Email: <a href="mailto:support@distinctcoworking.com" className="text-primary hover:underline">support@distinctcoworking.com</a> </p>
              <p>Phone: <a href="tel:+916366460968" className="hover:text-primary transition-colors">+91 6366460968</a> / <a href="tel:+919243807744" className="hover:text-primary transition-colors">+91 9243807744</a> </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}