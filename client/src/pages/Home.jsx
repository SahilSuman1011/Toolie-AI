import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import LogoScroller from '../components/LogoScroller.jsx'
import AiTools from '../components/AiTools.jsx'
import Testimonial from '../components/Testimonial.jsx'
import Plan from '../components/Plan.jsx'
import FAQ from '../components/FAQ.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <LogoScroller/>
    <AiTools/>
    <Testimonial/>
    <Plan/>
    <FAQ/>
    <Footer/>
    </>
  )
}

export default Home