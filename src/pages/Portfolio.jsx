import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ProjectCard from "../components/ProjectCard";
import { Logo } from "../components/Logo";

// Section Component
const PortfolioSection = ({ title, children }) => (
    <div className="mb-32">
        <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] bg-blue-500/30 flex-grow max-w-[50px]"></div>
            <h2 className="text-2xl font-heading font-bold uppercase tracking-[0.2em] text-cyan-400">
                {title}
            </h2>
            <div className="h-[1px] bg-blue-500/30 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
        </div>
    </div>
);

export default function Portfolio() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#050b1e] to-black text-white pt-10 px-6">

            {/* Navigation */}
            <nav className="max-w-7xl mx-auto mb-20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Logo size="sm" />
                    <div className="flex flex-col leading-none">
                        <span className="font-heading font-bold text-lg tracking-widest text-white uppercase">VERTEX</span>
                        <span className="font-heading text-xs tracking-[0.3em] text-blue-400 font-medium uppercase">DIGITAL</span>
                    </div>
                </div>
                <a href="/" className="text-xs font-bold hover:text-blue-400 transition-colors uppercase tracking-[0.3em]">Return Home</a>
            </nav>

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-24 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                    Our <span className="text-blue-500">Portfolio</span>
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    A curated selection of high-impact digital systems, creative designs, and strategic content.
                </p>
            </div>

            <div className="max-w-7xl mx-auto pb-20">

                {/* WEBSITES */}
                <PortfolioSection title="Websites & Platforms">
                    <ProjectCard
                        title="Royal Club Équestre"
                        category="Premium Website"
                        description="A luxurious digital presence for a top-tier equestrian club, featuring booking systems and immersive galleires."
                        image="/projects/royal-club.png"
                        services={[
                            "UI/UX Design",
                            "Booking System Integration",
                            "Responsive Web Design",
                            "Interactive Gallery"
                        ]}
                        link="#"
                    />

                    <ProjectCard
                        title="Smart Business Hub"
                        category="E-Commerce / Business"
                        description="An intelligent business platform for booking appointments, retail orders, and construction quotes."
                        image="/projects/smart-hub.png"
                        services={[
                            "E-Commerce Development",
                            "Service Booking System",
                            "Quote Generation",
                            "Modern UI Architecture"
                        ]}
                        link="#"
                    />

                    <ProjectCard
                        title="Professional Painting Company"
                        category="Business Website"
                        description="A modern, conversion-focused website designed for a professional painting company to showcase services and build trust."
                        image="/projects/painting-website.jpg"
                        services={[
                            "UI/UX Design",
                            "Business Branding",
                            "Performance Optimization",
                            "SEO Structure"
                        ]}
                        link="https://twamof.github.io/adampeinture74/"
                    />

                    <ProjectCard
                        title="Pure Harmony"
                        category="Beauty & Wellness"
                        description="A sanctuary where modern artistry meets timeless luxury. A premium booking and services showcase for a high-end beauty salon."
                        image="/projects/pure-harmony.png"
                        services={[
                            "UI/UX Design",
                            "Booking Integration",
                            "Brand Philosophy",
                            "Responsive Layout"
                        ]}
                        link="https://twamof.github.io/beauty_salon/"
                    />
                </PortfolioSection>

                {/* DESIGNS */}
                <PortfolioSection title="Designs (Canva / Products)">
                    {[
                        { title: "Restaurant Menu Design", image: "/projects/designs/Black Illustrative Restaurant Menu.jpg", category: "Print Design", description: "Elegant and modern restaurant menu layout designed for high-end dining experiences." },
                        { title: "Beauty Social Post", image: "/projects/designs/Elegant Blush Pink Beauty Post.png", category: "Social Media", description: "Aesthetic social media template tailored for beauty and wellness brands." },
                        { title: "Professional Book Cover", image: "/projects/designs/book (1).png", category: "Print Design", description: "Captivating book cover design focused on typography and visual impact." },
                        { title: "Modern Menu Concept", image: "/projects/designs/restaurant menu.jpg", category: "Print Design", description: "Clean and functional menu design optimized for readability and brand alignment." },
                        { title: "Creative Composition 1", image: "/projects/designs/1.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 2", image: "/projects/designs/2.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 3", image: "/projects/designs/3.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 4", image: "/projects/designs/4.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 6", image: "/projects/designs/6.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 8", image: "/projects/designs/8.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 11", image: "/projects/designs/11.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 12", image: "/projects/designs/12.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 13", image: "/projects/designs/13.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                        { title: "Creative Composition 14", image: "/projects/designs/14.png", category: "Branding", description: "Strategic visual composition for brand identity systems." },
                    ].map((project, i) => (
                        <ProjectCard
                            key={i}
                            title={project.title}
                            category={project.category}
                            description={project.description}
                            image={project.image}
                            services={["Graphic Design", "Brand Identity", "Visual Communication"]}
                            link="#"
                            onClick={() => setSelectedImage(project.image)}
                        />
                    ))}
                </PortfolioSection>

                {/* VIDEOS */}
                <PortfolioSection title="Video Production">
                    <ProjectCard
                        title="Corporate Promo Reel"
                        category="Video Editing"
                        description="High-energy promotional video showcasing company culture and core values for a tech startup."
                        image="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=2070&auto=format&fit=crop"
                        services={[
                            "Video Editing",
                            "Motion Graphics",
                            "Sound Design",
                            "Color Grading"
                        ]}
                        link="#"
                    />
                </PortfolioSection>

                {/* INSTAGRAM TEMPLATES */}
                <PortfolioSection title="Instagram Templates">
                    <ProjectCard
                        title="Influencer Growth Pack"
                        category="Social Media"
                        description="A set of 50+ aesthetic Instagram templates designed to boost engagement and maintain brand consistency."
                        image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
                        services={[
                            "Instagram Stories",
                            "Post Templates",
                            "Highlight Covers",
                            "Canva Editable"
                        ]}
                        link="#"
                    />
                </PortfolioSection>

            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={40} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Preview"
                            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
