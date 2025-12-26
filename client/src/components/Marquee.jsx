import React from 'react'

const Marquee = ({ children, reverse = false, pauseOnHover = false, className = '' }) => {
  return (
    <div className={`flex overflow-hidden select-none ${className}`}>
      <div 
        className={`flex gap-4 sm:gap-6 md:gap-8 animate-marquee ${reverse ? 'animate-marquee-reverse' : ''} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ minWidth: '100%' }}
      >
        {children}
      </div>
      <div 
        className={`flex gap-4 sm:gap-6 md:gap-8 animate-marquee ${reverse ? 'animate-marquee-reverse' : ''} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ minWidth: '100%' }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

export default Marquee
