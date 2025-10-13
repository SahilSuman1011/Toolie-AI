import React from 'react'

const Hero = () => {
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative flex flex-col w-full
    bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat
    min-h-screen pt-32 pb-20'>
        <div className='text-center mb-6 mt-12'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            font-semi-bold mx-auto leading-tight'>
        The<span className='text-[#2F80ED]'> AI Toolbox</span> for <br/> Modern Builders</h1>
        <p className='mt-6 max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto
        text-lg sm:text-xl text-gray-600 leading-relaxed'>Supercharge your creations with our collection of intelligent, <br/> easy-to-use AI tools and enhance your workflow.</p>
        </div>
    </div>
  )
}

export default Hero