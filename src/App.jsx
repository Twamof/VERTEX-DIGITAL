import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageSquare, ArrowRight, Menu, X, Send } from 'lucide-react';
import { Logo } from './components/Logo';
import { SERVICES, PORTFOLIO } from './constants';
import { LoopingImages } from './components/LoopingImages';

// Reusable component for 3D Tilt Effect on Images
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative perspective-1000 ${className || ''}`}
    >
      {children}
    </motion.div>
  );
};

const CircuitBackground = ({ scrollY }) => {
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <svg width="100%" height="100%" className="absolute top-0 left-0">
          <pattern id="circuit1" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
            <path d="M0 200 H100 L150 150 V50 H250 L300 0" fill="none" stroke="#00D2FF" strokeWidth="0.5" />
            <circle cx="100" cy="200" r="2" fill="#00D2FF" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit1)" />
        </svg>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute inset-0 scale-110">
        <svg width="100%" height="100%" className="absolute top-0 left-0">
          <pattern id="circuit2" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
            <path d="M300 150 H200 L150 200 V300" fill="none" stroke="#7b2ff7" strokeWidth="0.5" />
            <circle cx="200" cy="150" r="2" fill="#7b2ff7" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit2)" />
        </svg>
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Hero 3D Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const motionScrollY = useMotionValue(0);
  useEffect(() => {
    motionScrollY.set(scrollY);
  }, [scrollY]);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#050505] text-white">
      {/* 3D Parallax Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <CircuitBackground scrollY={motionScrollY} />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Logo size="sm" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-lg tracking-widest text-white uppercase">VERTEX</span>
              <span className="font-heading text-xs tracking-[0.3em] text-blue-400 font-medium uppercase">DIGITAL</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Portfolio'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold hover:text-blue-400 transition-colors uppercase tracking-[0.3em]">{item}</a>
            ))}
            <a href="#contact" className="px-8 py-3 rounded-full bg-white text-black text-[10px] font-black hover:bg-blue-400 hover:text-white transition-all uppercase tracking-[0.2em]">Get a Quote</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-12 md:hidden"
          >
            <button className="absolute top-10 right-10 text-white" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
            {['Services', 'About', 'Portfolio'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-bold font-heading uppercase tracking-widest">{item}</a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="px-12 py-5 rounded-full bg-blue-500 text-white text-xl font-bold uppercase tracking-widest">Get a Quote</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-20">

        {/* Hero Section */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1500px" }}
        >
          {/* Animated Binary Streams */}
          <div className="absolute inset-0 pointer-events-none opacity-10 font-mono text-[10px]">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -500, x: Math.random() * window.innerWidth }}
                animate={{ y: window.innerHeight + 500 }}
                transition={{ duration: 10 + Math.random() * 20, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
                className="absolute text-blue-500"
              >
                {Math.random() > 0.5 ? '0' : '1'}<br />{Math.random() > 0.5 ? '1' : '0'}<br />{Math.random() > 0.5 ? '0' : '1'}
              </motion.div>
            ))}
          </div>

          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.5, translateZ: -200 }}
            animate={{ opacity: 1, scale: 1, translateZ: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mb-16 relative"
          >
            <div style={{ transform: "translateZ(100px)" }}>
              <Logo size="xl" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-blue-500/10 rounded-full scale-125 pointer-events-none"
              style={{ transform: "translateZ(-50px)" }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-6xl text-6xl md:text-[9rem] font-heading font-bold mb-8 tracking-tighter text-glow-blue leading-[0.8] uppercase"
          >
            VERTEX <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-[length:200%_auto] animate-gradient-flow">
              DIGITAL.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-3xl text-gray-300 text-lg md:text-2xl mb-14 leading-relaxed font-light tracking-widest uppercase opacity-80"
          >
            Future-ready systems designed for global scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="flex flex-col sm:flex-row gap-8"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-6 rounded-full bg-blue-600 text-white font-black text-xs uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all shadow-2xl shadow-blue-500/40 flex items-center gap-4 group"
            >
              Explore <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-6 rounded-full border border-white/20 text-white font-black text-xs uppercase tracking-[0.5em] hover:bg-white/10 transition-all"
            >
              Initialize
            </motion.a>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-40 border-t border-white/5 relative">
          <div className="text-center mb-32">
            <h2 className="text-xs font-black text-cyan-400 uppercase tracking-[1em] mb-6 shadow-cyan-500/50 drop-shadow-lg">Network Architecture</h2>
            <h3 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-none text-white drop-shadow-2xl">Solutions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service, index) => (
              <TiltCard key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass p-12 rounded-[3rem] border border-white/5 hover:border-cyan-500/40 transition-all cursor-default group relative overflow-hidden h-full"
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-cyan-500/20 transition-all" />
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-cyan-400 mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all">
                    {React.cloneElement(service.icon, { size: 32 })}
                  </div>
                  <h4 className="text-3xl font-bold mb-6 font-heading uppercase tracking-tighter" style={{ transform: "translateZ(30px)" }}>{service.title}</h4>
                  <p className="text-gray-500 leading-relaxed font-light text-base uppercase tracking-wider" style={{ transform: "translateZ(20px)" }}>{service.shortLine}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-40 grid md:grid-cols-2 gap-16 items-center relative z-20">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-sm md:text-base font-black text-cyan-400 uppercase tracking-[1em] mb-12">Node Identity</h2>
            <h3 className="text-5xl md:text-7xl font-heading font-bold mb-12 tracking-tighter leading-none uppercase text-white">
              The Apex of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Digital Engineering.</span>
            </h3>
            <p className="text-gray-400 text-xl md:text-2xl mb-16 leading-relaxed font-light tracking-wide max-w-xl">
              Vertex Digital is a high-frequency agency. We deliver architectures that aren't just modern—they're evolutionary.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 md:mb-0">
              {["Neural Workflows", "UX/UI Evolution", "Scale Automation", "Logic Architecture"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3 glass rounded-full border border-white/10 hover:bg-white/10 transition-colors group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22D3EE] group-hover:scale-150 transition-transform" />
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full flex justify-center md:justify-end perspective-1000"
          >
            <div className="absolute inset-0 bg-blue-600/20 blur-[150px] rounded-full translate-x-1/4" />
            <LoopingImages />
          </motion.div>

        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="max-w-7xl mx-auto px-6 py-40 border-t border-white/5">
          <div className="flex flex-col items-center justify-center mb-32 gap-8 text-center">
            <div>
              <h2 className="text-xs font-black text-cyan-400 uppercase tracking-[1em] mb-6 shadow-cyan-500/50 drop-shadow-lg">Archive</h2>
              <h3 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter uppercase leading-none text-white drop-shadow-2xl">Telemetry</h3>
            </div>
            <a href="#" className="px-14 py-5 rounded-full glass border border-white/10 hover:border-cyan-400 transition-all font-black text-[10px] uppercase tracking-[0.4em]">
              Protocol: Full Archive
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PORTFOLIO.map((item, index) => (
              <TiltCard key={item.id} className="h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-[4rem] overflow-hidden aspect-[4/5] cursor-pointer border border-white/5 h-full"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
                    style={{ transform: "translateZ(-20px)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
                  <div className="absolute inset-0 p-14 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700" style={{ transform: "translateZ(50px)" }}>
                    <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">{item.category}</span>
                    <h4 className="text-4xl font-bold font-heading mb-8 tracking-tighter uppercase leading-none">{item.title}</h4>
                    <div className="w-16 h-1 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[5rem] p-16 md:p-24 relative overflow-hidden border border-white/10"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 blur-[150px] rounded-full" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-24">
              <div>
                <h3 className="text-6xl font-heading font-bold mb-8 tracking-tighter leading-[0.8] uppercase">Signal <br />Initiated.</h3>
                <p className="text-gray-400 mb-12 font-light text-xl tracking-wide">Secure your position in the digital evolution. Our architects are on standby.</p>
                <div className="flex items-center gap-6 text-cyan-400 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <Send size={24} />
                  </div>
                  <span className="text-sm font-black uppercase tracking-[0.4em]">hello@vertex.digital</span>
                </div>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-6">
                  <input type="text" placeholder="NODE IDENTIFIER / NAME" className="w-full bg-white/5 border border-white/5 rounded-3xl p-7 focus:outline-none focus:border-cyan-500 transition-all font-mono text-[10px] uppercase tracking-[0.3em] placeholder:opacity-30 text-white" />
                  <input type="email" placeholder="ENCRYPTED EMAIL ADDRESS" className="w-full bg-white/5 border border-white/5 rounded-3xl p-7 focus:outline-none focus:border-cyan-500 transition-all font-mono text-[10px] uppercase tracking-[0.3em] placeholder:opacity-30 text-white" />
                  <textarea rows={5} placeholder="TRANSMISSION CONTENT" className="w-full bg-white/5 border border-white/5 rounded-3xl p-7 focus:outline-none focus:border-cyan-500 transition-all resize-none font-mono text-[10px] uppercase tracking-[0.3em] placeholder:opacity-30 text-white"></textarea>
                </div>
                <button className="w-full py-8 rounded-3xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.6em] flex items-center justify-center gap-4 hover:bg-cyan-500 transition-all shadow-2xl shadow-blue-500/40">
                  Broadcast Transmission <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-40 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24 mb-32">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-4 mb-10">
                <Logo size="sm" />
                <span className="font-heading font-bold text-2xl uppercase tracking-widest">VERTEX</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed font-light tracking-widest uppercase opacity-60">
                High-frequency digital architectures for the new era of global intelligence.
              </p>
            </div>
            {['Systems', 'Node', 'Signal'].map((title, i) => (
              <div key={title}>
                <h5 className="font-black mb-10 text-[10px] uppercase tracking-[0.5em] text-cyan-400">{title}</h5>
                <ul className="space-y-5 text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">
                  {[['Core', 'Agents', 'UX', 'Growth'], ['About', 'Work', 'Protocol', 'Grid'], ['Social', 'LinkedIn', 'Git', 'Mail']][i].map(link => (
                    <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] text-gray-700 font-mono uppercase tracking-[0.5em]">
            <p>VERTEX DIGITAL SYSTEMS v4.0 // ARCHIVE: {new Date().getFullYear()}</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Operational SLA</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Action Node */}
      <motion.a
        href="https://wa.me/#"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.15, rotate: 10, translateZ: 50 }}
        className="fixed bottom-12 right-12 z-50 w-24 h-24 rounded-[2rem] bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/50 border border-white/20 perspective-1000"
      >
        <MessageSquare size={40} style={{ transform: "translateZ(30px)" }} />
      </motion.a>
    </div>
  );
};

export default App;
