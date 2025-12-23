import React from 'react'

const LogoScroller = () => {
    const features = [
        "AI Article Writing",
        "Image Generation", 
        "Background Removal",
        "LinkedIn Optimization",
        "Blog Title Ideas",
        "Object Removal"
    ];

    return (
        <>
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none px-2">
                <div className="absolute left-0 top-0 h-full w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "25s" }}>
                    <div className="flex items-center">
                        {[...features, ...features].map((feature, index) => (
                            <div key={index} className="flex items-center mx-8 sm:mx-12">
                                <span className="text-slate-400 text-sm sm:text-base font-medium whitespace-nowrap">{feature}</span>
                                <span className="mx-8 sm:mx-12 text-slate-300">•</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-12 sm:w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </>
    );
};

export default LogoScroller
