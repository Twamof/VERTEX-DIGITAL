import React from 'react';
import logo from '../assets/logo.png';

export const Logo = ({ size = 'md' }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        xl: 'w-24 h-24'
    };

    return (
        <div className={`relative ${sizes[size]} flex items-center justify-center`}>
            <img src={logo} alt="Vertex Digital" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
        </div>
    );
};
