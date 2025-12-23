import React from 'react'
import Marquee from './Marquee'

const reviews = [
    {
        name: "Bruce Wayne",
        username: "CEO, Wayne Enterprises",
        body: "Toolie AI made undercutting all of our competitors an absolute breeze. The speed and quality are unmatched.",
        img: "https://i.pinimg.com/736x/62/96/c9/6296c9aecf55225bd053377c12ccca38.jpg"
    },
    {
        name: "Sanjay Singhania",
        username: "CEO, Air Voice",
        body: "This platform helped us launch our product twice as fast as expected. The API is incredibly stable.",
        img: "https://imgs.search.brave.com/K-I01V4jYEvUpjjKi6bbrjjx3EVW65q24326wgz5d6M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYi9SMjl2/WjJ4bC9BVnZYc0Vp/MW5pYkJtQkhFTG5r/QVN5dVE3TVJ6VVRy/cnNyRU9xU3d2bFhv/d19GRkIwbWxEUlM3/MTdZUmdvN3Q5bHRr/T2pfbGFuVkFhU1Fs/OGFQaUI2MTZoVFRq/M2pEbFFZNFBIaW5o/VnpCRW5PUGIxYWxG/RFN1QnBnTGVxQ19z/T1l5UHF0S19oYUIt/RS9zNDAwL2doYWpp/bmk3LmpwZw"
    },
    {
        name: "Tyler Durden",
        username: "CEO, Fight Club",
        body: "Incredible support and a fantastic experience from start to finish. Highly recommended for new startups.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStTXFYDm9r3pTJ4291jpi-TO5mV3IWXWyMIQ&s"
    }
]

const ReviewCard = ({ img, name, username, body }) => {
    return (
        <div className="relative w-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-6 hover:shadow-lg dark:hover:shadow-teal-500/10 transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
                <img className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-700" src={img} alt={name} />
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        {name}
                        <span className="text-teal-500 dark:text-teal-400" title="Verified">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{username}</p>
                </div>
            </div>
            <svg className="w-8 h-8 text-teal-500 dark:text-teal-400 mb-3 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"/>
            </svg>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">{body}</p>
        </div>
    )
}

export default function Testimonial() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
                * { font-family: 'Poppins', sans-serif; }
            `}</style>
            <section className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-700/60 text-teal-600 dark:text-teal-300 text-sm font-medium mb-6">
                             <svg width="14" height="14" viewBox="0 0 13 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.5 8.5c-.8 0-1.5-.7-1.5-1.5V3c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5v2.5" />
                                <path d="M8.5 8.5c-.8 0-1.5-.7-1.5-1.5V3c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5v2.5" />
                                <path d="M5.5 6.5A3.5 3.5 0 0 0 2 10v1.5" />
                                <path d="M11.5 6.5A3.5 3.5 0 0 0 8 10v1.5" />
                            </svg>
                            User Stories
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 px-2">
                            Loved by builders everywhere.
                        </h2>
                        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl px-4">
                            Don't just take our word for it. Here is what the community has to say about Toolie AI.
                        </p>
                    </div>
            
                    {/* Marquee Grid */}
                    <div className="relative flex flex-col gap-6">
                        <Marquee pauseOnHover className="py-4">
                            {reviews.map((review, index) => (
                                <ReviewCard key={`first-${index}`} {...review} />
                            ))}
                        </Marquee>
                        <Marquee reverse pauseOnHover className="py-4">
                            {reviews.map((review, index) => (
                                <ReviewCard key={`second-${index}`} {...review} />
                            ))}
                        </Marquee>
                        
                        {/* Gradient overlays */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-white dark:from-slate-900 to-transparent"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-white dark:from-slate-900 to-transparent"></div>
                    </div>
                </div>
            </section>
        </>
    );
}