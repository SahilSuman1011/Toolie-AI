import React from 'react';
import { assets } from '../assets/assets';
import TAI from '../assets/TAI.png';

export default function Example() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-col items-center justify-around w-full py-4 text-sm bg-slate-50 text-gray-800/70">
                <img src={TAI} alt="ToolieAI Logo" className="w-32" />
                <p>Built by <a href="https://sahil-suman.vercel.app" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-800 hover:text-black transition-all">Sahil Suman</a>. The source code is available on <a href="https://github.com/SahilSuman1011/Toolie-AI" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-800 hover:text-black transition-all">GitHub</a>.</p>
                <p className="mt-4 text-center">Copyright © 2025 <a href="#">ToolieAI</a>. All rights reservered.</p>
                <div className="flex items-center gap-4 mt-6">
                    <a href="https://github.com/SahilSuman1011/Toolie-AI" className="font-medium text-gray-800 hover:text-black transition-all">
                        Github
                    </a>
                    <div className="h-4 w-px bg-black/20"></div>
                    <a href="https://www.linkedin.com/in/sahilsuman11/" className="font-medium text-gray-800 hover:text-black transition-all">
                        Linkedin
                    </a>
                    <div className="h-4 w-px bg-black/20"></div>
                    <a href="https://github.com/SahilSuman1011/Toolie-AI/issues" className="font-medium text-gray-800 hover:text-black transition-all">
                        Support
                    </a>
                     <div className="h-4 w-px bg-black/20"></div>
                    <a href="mailto:sahilsuman1202@gmail.com" className="font-medium text-gray-800 hover:text-black transition-all">
                        Contact
                    </a>
                </div>
                     
            </footer>
        </>
    );
};