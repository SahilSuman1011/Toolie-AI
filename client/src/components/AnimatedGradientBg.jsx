import React, { useEffect, useState } from 'react'

const AnimatedGradientBg = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Animated mesh gradient orbs */}
      <div 
        className="absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-float"
        style={{
          background: 'radial-gradient(circle, #14B8A6 0%, transparent 70%)',
          top: `${20 + mousePosition.y * 0.1}%`,
          left: `${10 + mousePosition.x * 0.05}%`,
        }}
      />
      <div 
        className="absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-float-delayed"
        style={{
          background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
          top: `${60 + mousePosition.y * 0.08}%`,
          right: `${15 + mousePosition.x * 0.06}%`,
          animationDelay: '1s',
        }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
          bottom: `${10 + mousePosition.y * 0.05}%`,
          left: `${50 + mousePosition.x * 0.04}%`,
          animationDelay: '2s',
        }}
      />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>
  )
}

export default AnimatedGradientBg
