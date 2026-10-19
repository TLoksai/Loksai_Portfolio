import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { AVAILABILITY } from "../data/portfolio";

const WhatsApp = () => {
  const { pathname } = useLocation();
  // the contact page has its own WhatsApp link, and the floating button would cover "Send Message" on phones
  if (pathname === "/contact") return null;

  const text = encodeURIComponent("Hi Loksai, I found your portfolio and have a project I'd like to discuss.");

  return (
    <a
      href={`https://wa.me/${AVAILABILITY.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Loksai on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition duration-300 z-50"
    >
      <FaWhatsapp className="w-6 h-6 sm:w-[30px] sm:h-[30px]" aria-hidden="true" />
    </a>
  );
};

export default WhatsApp;
