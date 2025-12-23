import React from 'react';
import TAI from '../assets/TAI.png';
import { assets } from '../assets/assets';

export default function Example() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-col items-center justify-around w-full py-6 px-3 text-xs sm:text-sm bg-slate-900 text-slate-400">

            <div className='flex items-center gap-2'>
            <img src={assets.tool} alt='logo' className='w-4 h-10 sm:w-12 cursor-pointer'/>
            <h3 className="relative z-10 text-2xl font-bold text-white mb-2 text-center">
            Toolie<span className='text-blue-500'> AI</span>
            </h3>
            </div>
            <br/>
                <p className="text-center px-2">Built by <a href="https://sahil-suman.vercel.app" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-emerald-400 transition-all">Sahil Suman</a>. The source code is available on <a href="https://github.com/SahilSuman1011/Toolie-AI" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-emerald-400 transition-all">GitHub</a>.</p>
                <p className="mt-4 text-center px-2">Copyright © 2025 <a href="#" target="_blank" rel="noopener noreferrer">ToolieAI</a>. All rights reservered.</p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 px-2">
                    <a href="https://github.com/SahilSuman1011/Toolie-AI" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-emerald-400 transition-all">
                        Github
                    </a>
                    <div className="h-4 w-px bg-white/20"></div>
                    <a href="https://www.linkedin.com/in/sahilsuman11/" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-emerald-400 transition-all">
                        Linkedin
                    </a>
                    <div className="h-4 w-px bg-white/20"></div>
                    <a href="https://github.com/SahilSuman1011/Toolie-AI/issues" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-emerald-400 transition-all">
                        Support
                    </a>
                     <div className="h-4 w-px bg-white/20"></div>
                    <a href="mailto:sahilsuman1202@gmail.com" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-emerald-400 transition-all">
                        Contact
                    </a>
                </div>
                     
            </footer>
        </>
    );
};