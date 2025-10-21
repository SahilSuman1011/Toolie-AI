import React from 'react'

const LogoScroller = () => {
  const logos = [
    { name: 'Slack', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
    { name: 'Netflix', image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Google', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'LinkedIn', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
    { name: 'Instagram', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
    { name: 'Facebook', image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
    { name: 'Microsoft', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  ]

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex gap-12 animate-scroll'>
        {/* First set */}
        {logos.map((logo, index) => (
          <div key={index} className='flex-shrink-0 w-26 h-8 flex items-center justify-center'>
            <img 
              src={logo.image} 
              alt={logo.name}
              className='max-w-full max-h-full object-contain'
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div key={`dup-${index}`} className='flex-shrink-0 w-26 h-8 flex items-center justify-center'>
            <img 
              src={logo.image} 
              alt={logo.name}
              className='max-w-full max-h-full object-contain'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoScroller
