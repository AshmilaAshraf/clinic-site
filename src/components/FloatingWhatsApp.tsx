import { MessageCircle } from "lucide-react";
import { CLINIC } from "@/config/clinic";

const FloatingWhatsApp = () => {
  if (!CLINIC.whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${CLINIC.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default FloatingWhatsApp;
