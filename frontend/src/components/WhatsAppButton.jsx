import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '923283381841';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hello! I would like to inquire about your services.')}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} className="fill-white text-[#25D366]" />
      <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline-block">
        WhatsApp Us
      </span>
      {/* Pulse ring animation */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none -z-10" />
    </motion.a>
  );
};

export default WhatsAppButton;
