import React from 'react';
import ProjectCard from "../components/ProjectCard";
import { Logo } from "../components/Logo";

export default function Portfolio() {
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
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                    Our <span className="text-blue-500">Portfolio</span>
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    A selection of high-impact digital systems, AI solutions and scalable platforms.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                <ProjectCard
                    title="Professional Painting Company Website"
                    category="Business Website"
                    description="A modern, conversion-focused website designed for a professional painting company to showcase services, build trust, and generate leads."
                    image="/projects/painting-website.jpg"
                    services={[
                        "UI/UX Design",
                        "Responsive Web Design",
                        "Business Branding",
                        "Performance Optimization",
                        "SEO Structure"
                    ]}
                    link="https://example-client-website.com"
                />

                {/* Placeholder for future projects */}
                {/* 
        <ProjectCard
           title="Next Project" 
           ...
        />
        */}
            </div>
        </div>
    );
}
