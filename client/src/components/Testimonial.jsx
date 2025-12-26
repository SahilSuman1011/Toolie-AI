import React from 'react'

const reviews = [
    {
        name: "Bruce Wayne",
        username: "CEO, Wayne Enterprises",
        body: "Toolie AI made undercutting all of our competitors an absolute breeze. The speed and quality are unmatched.",
        img: "https://i.pinimg.com/736x/62/96/c9/6296c9aecf55225bd053377c12ccca38.jpg",
        rating: 5,
        gradient: "from-teal-500/10 to-emerald-500/10"
    },
    {
        name: "Sanjay Singhania",
        username: "CEO, Air Voice",
        body: "This platform helped us launch our product twice as fast as expected. The API is incredibly stable.",
        img: "https://imgs.search.brave.com/K-I01V4jYEvUpjjKi6bbrjjx3EVW65q24326wgz5d6M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYi9SMjl2/WjJ4bC9BVnZYc0Vp/MW5pYkJtQkhFTG5r/QVN5dVE3TVJ6VVRy/cnNyRU9xU3d2bFhv/d19GRkIwbWxEUlM3/MTdZUmdvN3Q5bHRr/T2pfbGFuVkFhU1Fs/OGFQaUI2MTZoVFRq/M2pEbFFZNFBIaW5o/VnpCRW5PUGIxYWxG/RFN1QnBnTGVxQ19z/T1l5UHF0S19oYUIt/RS9zNDAwL2doYWpp/bmk3LmpwZw",
        rating: 5,
        gradient: "from-cyan-500/10 to-blue-500/10"
    },
    {
        name: "Tyler Durden",
        username: "CEO, Fight Club",
        body: "Incredible support and a fantastic experience from start to finish. Highly recommended for new startups.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStTXFYDm9r3pTJ4291jpi-TO5mV3IWXWyMIQ&s",
        rating: 5,
        gradient: "from-amber-500/10 to-orange-500/10"
    }
]

const ReviewCard = ({ img, name, username, body, rating, gradient }) => {
    return (
        <div className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm hover:border-teal-600/60 transition-all duration-500 hover:scale-[1.02]">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Content */}
            <div className="relative p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-16 h-16 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"/>
                    </svg>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                    {[...Array(rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                    ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-200 text-base leading-relaxed mb-6 relative z-10">
                    "{body}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <img className="relative w-14 h-14 rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-teal-500 transition-all" src={img} alt={name} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white text-base">{name}</h3>
                            <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-sm text-slate-400">{username}</p>
                    </div>
                </div>
            </div>
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
            <section className="py-12 px-3 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/30 border border-teal-700/60 text-teal-300 text-xs sm:text-sm font-medium mb-6">
                             <svg width="14" height="14" viewBox="0 0 13 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.5 8.5c-.8 0-1.5-.7-1.5-1.5V3c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5v2.5" />
                                <path d="M8.5 8.5c-.8 0-1.5-.7-1.5-1.5V3c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5v2.5" />
                                <path d="M5.5 6.5A3.5 3.5 0 0 0 2 10v1.5" />
                                <path d="M11.5 6.5A3.5 3.5 0 0 0 8 10v1.5" />
                            </svg>
                            User Stories
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 px-4">
                            Loved by builders everywhere.
                        </h2>
                        <p className="text-base md:text-lg text-slate-400 max-w-2xl px-4">
                            Don't just take our word for it. Here is what the community has to say about Toolie AI.
                        </p>
                    </div>
            
                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} {...review} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}