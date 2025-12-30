import React from 'react';

export default function ProjectCard({
    title,
    category,
    description,
    image,
    services,
    link
}) {
    return (
        <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300">

            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 text-xs uppercase tracking-widest bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full backdrop-blur">
                    {category}
                </span>
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-2 text-white">
                    {title}
                </h3>

                <p className="text-sm text-gray-400 mb-4">
                    {description}
                </p>

                {/* Services */}
                {services && (
                    <ul className="text-xs text-gray-300 space-y-1 mb-5">
                        {services.map((service, index) => (
                            <li key={index}>• {service}</li>
                        ))}
                    </ul>
                )}

                {/* Action */}
                <a
                    href={"https://twamof.github.io/adampeinture74/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
                >
                    View Project →
                </a>
            </div>
        </div>
    );
}
