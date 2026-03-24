import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">C</span>
              </div>
              <div>
                <p className="font-heading font-bold text-sm">Connect Speech &</p>
                <p className="font-heading text-xs opacity-70">Rehabilitation Centre</p>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Helping children and adults communicate with confidence through professional speech and rehabilitation therapy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Book Appointment", path: "/booking" },
                { label: "Testimonials", path: "/testimonials" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Our Services</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span>Speech Therapy</span>
              <span>Occupational Therapy</span>
              <span>Behavioral Therapy</span>
              <span>Special Education</span>
              <span>Parent Training</span>
              <span>AAC Support</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
                <Phone size={16} /> +91 XXXX XXXX XX
              </a>
              <a href="mailto:info@connectspeech.com" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
                <Mail size={16} /> info@connectspeech.com
              </a>
              <div className="flex items-start gap-2 text-sm opacity-70">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Connect Speech and Rehabilitation Centre. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
