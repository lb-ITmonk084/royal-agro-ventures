import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Contact = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();

  return (
    <section id="contact" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}>
          <span className="text-accent font-medium tracking-wider uppercase text-sm">Get in Touch</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Ready to partner with us? Reach out for enquiries, bulk orders, or to learn more about our products.
          </p>
          
          <div className="mt-8">
            <span className="text-accent font-medium tracking-wider uppercase text-sm">Licensed & Certified</span>
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              {["MSME", "APEDA", "IEC", "GST", "FSSAI"].map((license) => (
                <span
                  key={license}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold tracking-wide"
                >
                  {license}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={cardsRef} className={`grid md:grid-cols-3 gap-8 max-w-4xl mx-auto stagger-children ${cardsVisible ? "visible" : ""}`}>
          <div className="text-center p-8 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-accent text-accent-foreground rounded-full mb-5">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-4">Phone</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <a href="tel:+918919790302" className="block hover:text-accent transition-colors">+91 8919790302</a>
              <a href="tel:+919849533564" className="block hover:text-accent transition-colors">+91 9849533564</a>
              <a href="tel:+919030718204" className="block hover:text-accent transition-colors">+91 9030718204</a>
            </div>
          </div>

          <div className="text-center p-8 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-accent text-accent-foreground rounded-full mb-5">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-4">Email</h3>
            <a href="mailto:royalagroventure@gmail.com" className="text-primary-foreground/80 hover:text-accent transition-colors break-all">
              royalagroventure@gmail.com
            </a>
          </div>

          <div className="text-center p-8 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-accent text-accent-foreground rounded-full mb-5">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-4">Address</h3>
            <p className="text-primary-foreground/80">
              Plot No. 108, Hasthinapuram Central,<br />
              Indraprastha Colony, Phase 1,<br />
              Karmanghat, Hyderabad,<br />
              Rangareddy, Telangana, 500079<br />
              India
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-primary-foreground/60 space-y-2">
          <p>GSTIN: 36DCMPA2744A1Z2</p>
          <p>IEC: DCMPA2744A</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
