import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { motion, useAnimation } from 'framer-motion';
import { LOOPING_IMAGES } from '../constants';

const Square = ({ src, index }) => {
    const controls = useAnimation();

    useEffect(() => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 10 + Math.random() * 10;

        controls.start({
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: randomDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: randomDelay
            }
        });
    }, [controls]);

    return (
        <motion.div
            animate={controls}
            className={`absolute w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl glass`}
            style={{
                top: `${Math.floor(index / 2) * 100}px`,
                left: `${(index % 2) * 120}px`,
                zIndex: index,
                transform: `rotate(${Math.random() * 10 - 5}deg)`
            }}
        >
            <img src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
        </motion.div>
    );
};

export function LoopingImages() {
    // Use the logo repeated 6 times for the effect
    const visibleImages = Array(6).fill(logo);

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center">
            <div className="relative w-[300px] h-[300px]">
                {visibleImages.map((src, index) => (
                    <Square key={index} src={src} index={index} />
                ))}
            </div>
        </div>
    );
}
