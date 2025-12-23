import React, { useRef } from 'react'
import { Image, FileText, Wand2, Sparkles } from 'lucide-react'
import { AnimatedBeam } from './AnimatedBeam'

const Circle = React.forwardRef(({ className = "", children }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-10 flex size-14 items-center justify-center rounded-full border-2 border-slate-200 bg-white p-3 shadow-lg ${className}`}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

const BentoGrid = () => {
  const containerRef = useRef(null)
  const div1Ref = useRef(null)
  const div2Ref = useRef(null)
  const div3Ref = useRef(null)
  const div4Ref = useRef(null)
  const div5Ref = useRef(null)
  const div6Ref = useRef(null)

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            All Your Tools, One Platform
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Experience seamless integration of powerful AI tools working together
          </p>
        </div>

        {/* Animated Beam Diagram */}
        <div
          className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-10 shadow-sm"
          ref={containerRef}
        >
          <div className="flex size-full max-h-[280px] max-w-3xl flex-col items-stretch justify-between gap-10">
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div1Ref}>
                <Image className="h-6 w-6 text-purple-500" />
              </Circle>
              <Circle ref={div5Ref}>
                <FileText className="h-6 w-6 text-blue-500" />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div2Ref}>
                <Wand2 className="h-6 w-6 text-green-500" />
              </Circle>
              <Circle ref={div4Ref} className="size-20 border-4">
                <div className="flex flex-col items-center">
                  <Sparkles className="h-8 w-8 text-indigo-600" />
                </div>
              </Circle>
              <Circle ref={div6Ref}>
                <svg className="h-6 w-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div3Ref}>
                <svg className="h-6 w-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Circle>
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div4Ref}
            curvature={-75}
            endYOffset={-10}
            gradientStartColor="#A855F7"
            gradientStopColor="#EC4899"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div4Ref}
            gradientStartColor="#10B981"
            gradientStopColor="#3B82F6"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div4Ref}
            curvature={75}
            endYOffset={10}
            gradientStartColor="#EC4899"
            gradientStopColor="#F59E0B"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div4Ref}
            curvature={-75}
            endYOffset={-10}
            reverse
            gradientStartColor="#3B82F6"
            gradientStopColor="#8B5CF6"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div6Ref}
            toRef={div4Ref}
            reverse
            gradientStartColor="#F97316"
            gradientStopColor="#EF4444"
          />
        </div>

        {/* Tool Labels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
              <Image className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">Image Generator</h4>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">Article Writer</h4>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">Background Remover</h4>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">LinkedIn Optimizer</h4>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
