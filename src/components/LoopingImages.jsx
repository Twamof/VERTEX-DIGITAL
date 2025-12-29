import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { LOOPING_IMAGES } from '../constants';

export function LoopingImages() {
    const [images, setImages] = useState(LOOPING_IMAGES);

    return (
        <div className="relative w-full max-w-[300px] aspect-square md:max-w-[500px] flex items-center justify-center">
            {/* Spinning Circle Container */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full"
            >
                {images.map((src, index) => {
                    const total = images.length;
                    const angle = (index / total) * 360;
                    const radius = 180; // Distance from center

                    // Convert polar to cartesian
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    return (
                        <motion.div
                            key={index}
                            className="absolute w-20 h-20 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl glass"
                            style={{
                                left: "50%",
                                top: "50%",
                                x: x - 64, // Center offset (half of width)
                                y: y - 64,
                                transform: `rotate(${angle + 90}deg)` // Orient outwards
                            }}
                        >
                            <motion.div
                                animate={{ rotate: -360 }} // Counter-rotate image to keep it upright-ish or just let it spin
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full"
                            >
                                <img src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Center Visual/Text (Optional, but looks cool) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-center">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 text-center">Vertex<br />Core</span>
                </div>
            </div>
        </div>
    );
}
