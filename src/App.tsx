import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, Mail, Send, Linkedin, MessageCircle, Send as TelegramIcon } from 'lucide-react';

export default function App() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Tu marca, es la extension de Ti.",
    "Transformamos ideas en resultados digitales de alto impacto.",
    "Estrategia, diseño y ejecución impecable.",
    "Tu marca, elevada al siguiente nivel."
  ];

  // Carousel logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Behold branding removal logic
  useEffect(() => {
    const removeBeholdBranding = () => {
      // 1. Regular DOM search
      document.querySelectorAll('a[href*="behold.so"]').forEach(el => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.pointerEvents = 'none';
        el.remove();
      });

      // 2. Shadow DOM search
      const widgets = document.querySelectorAll('behold-widget');
      widgets.forEach(widget => {
        if (widget.shadowRoot) {
          const branding = widget.shadowRoot.querySelector('a[href*="behold.so"]') || 
                          widget.shadowRoot.querySelector('.behold-branding');
          if (branding) {
            (branding as HTMLElement).style.display = 'none';
            branding.remove();
          }
        }
      });
    };

    // Aggressive interval to catch it when it loads
    const interval = setInterval(removeBeholdBranding, 300);
    
    // MutationObserver for a more robust approach
    const observer = new MutationObserver((mutations) => {
      removeBeholdBranding();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Twitter timeline loading logic
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      if (window.twttr && window.twttr.widgets) {
        // @ts-ignore
        window.twttr.widgets.load();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      {/* Social Sidebar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2">
        <a href="https://www.instagram.com/anyelinadigital.ve/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#E1306C] text-white flex items-center justify-center rounded-r-lg hover:pl-4 transition-all duration-300">
          <Instagram size={20} />
        </a>
        <a href="https://www.facebook.com/people/Anyelina-digital/61576639120709/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] text-white flex items-center justify-center rounded-r-lg hover:pl-4 transition-all duration-300">
          <Facebook size={20} />
        </a>
        <a href="mailto:digitalvibes.ve@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#d656ae] text-white flex items-center justify-center rounded-r-lg hover:pl-4 transition-all duration-300">
          <Mail size={20} />
        </a>
        <a href="https://t.me/anyelinadigital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0088cc] text-white flex items-center justify-center rounded-r-lg hover:pl-4 transition-all duration-300">
          <TelegramIcon size={20} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-r-lg hover:pl-4 transition-all duration-300">
          <i className="fab fa-tiktok"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0077b5] text-white flex items-center justify-center rounded-r-lg hover:pl-4 transition-all duration-300">
          <Linkedin size={20} />
        </a>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
        {/* WhatsApp Float */}
        <a href="https://wa.me/584120253955" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group hover:scale-110 transition-transform duration-300">
          <MessageCircle size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">¿Hablamos?</span>
        </a>
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="LOGO.PNG" alt="Anyelina Digital Logo" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
            <span className="font-bold text-xl tracking-tight uppercase">Anyelina Digital</span>
          </div>
          <ul className="flex items-center gap-8 font-medium text-sm uppercase tracking-widest">
            <li><a href="#galeria" className="hover:text-pink-600 transition-colors">Proyectos</a></li>
            <li><a href="#contacto-mixto" className="hover:text-pink-600 transition-colors">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero / Highlights */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-50">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200 via-transparent to-transparent"></div>
          </div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-serif italic text-gray-800 leading-tight"
              >
                "{messages[currentMessage]}"
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Gallery / Instagram */}
        <section id="galeria" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 -translate-x-1/2">
              Nuestra Estética en Instagram
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-pink-500 rounded-full"></div>
            </h2>
            <div className="max-w-5xl mx-auto bg-gray-50 rounded-3xl p-8 shadow-inner overflow-hidden">
              <div data-behold-id="3s1awxzVDs7px0MuJFrL"></div>
              <script src="https://w.behold.so/widget.js" type="module"></script>
            </div>
          </div>
        </section>

        {/* Contact & Twitter */}
        <section id="contacto-mixto" className="py-20 bg-gray-900 text-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white text-gray-900 p-10 rounded-3xl shadow-2xl"
              >
                <h2 className="text-3xl font-bold mb-4">Solicitud de Cotización</h2>
                <p className="text-gray-500 mb-8">Cuéntanos sobre tu proyecto y hagámoslo realidad.</p>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nombre</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                      <input type="email" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all" placeholder="tu@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">¿Cómo podemos ayudarte?</label>
                    <textarea className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all" rows={5} placeholder="Cuéntanos los detalles..." required></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/20">
                    Enviar Mensaje
                  </button>
                </form>
              </motion.div>

              {/* Twitter Feed */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-bold">Comunidad en X</h3>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 h-[500px] overflow-y-auto custom-scrollbar">
                  <a 
                    className="twitter-timeline" 
                    data-lang="es" 
                    data-theme="dark" 
                    data-chrome="noheader nofooter noborders transparent" 
                    href="https://twitter.com/jalberto24?ref_src=twsrc%5Etfw"
                  >
                    Tweets by jalberto24
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Anyelina Digital</h3>
              <p className="text-gray-500 leading-relaxed">
                Transformando la presencia digital de marcas con propósito a través de estrategias innovadoras y diseño de vanguardia.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Ubicación</h3>
              <p className="text-gray-500">
                Avenida La Paz, C.C. Profesional, Ofic 29-A<br />
                Puerto Cabello, Carabobo
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Conecta</h3>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.instagram.com/anyelinadigital.ve/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-500 hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/people/Anyelina-digital/61576639120709/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
                <a href="https://wa.me/584120253955" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all">
                  <MessageCircle size={20} />
                </a>
                <a href="https://t.me/anyelinadigital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0088cc] hover:text-white transition-all">
                  <TelegramIcon size={20} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-100 text-center text-gray-400 text-sm">
            &copy; 2026 ANYELINA DIGITAL VE. All Rights Reserved.
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
