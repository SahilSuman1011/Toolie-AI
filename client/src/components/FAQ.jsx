import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            question: "What is Toolie AI?",
            answer: "Toolie AI is a modern SaaS platform offering a comprehensive suite of AI-powered tools designed to supercharge your productivity. From content generation to image editing, we provide intelligent solutions for modern builders."
        },
        {
            question: "How does it work?",
            answer: "Simply sign up for an account, choose the AI tool you need from our dashboard, input your requirements, and let our advanced AI algorithms do the work. Each tool is designed with a simple, intuitive interface that requires no technical expertise."
        },
        {
            question: "What types of content can I create?",
            answer: "You can create blog articles, generate catchy titles, create stunning images, remove backgrounds from photos, remove unwanted objects from images, and get AI-powered resume reviews. More tools are being added regularly."
        },
        {
            question: "How many creations can I export in a month?",
            answer: "The number of creations depends on your subscription plan. Our Free plan includes limited creations, while our Pro and Ultimate plans offer unlimited access to all tools with priority processing."
        },
        {
            question: "Do you offer customer support?",
            answer: "Yes! We provide comprehensive customer support through email, live chat, and our community forum. Pro and Ultimate plan subscribers receive priority support with faster response times."
        }
    ]

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 w-full bg-white pb-2.5">
            <h2 className="text-[42px] md:text-5xl font-semibold text-center text-slate-800 mb-16">
                Frequently asked questions
            </h2>
            
            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <div 
                        key={index}
                        className="border-b border-gray-200 last:border-b-0"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between py-6 text-left group"
                        >
                            <span className="text-lg font-normal text-gray-700 pr-8 group-hover:text-gray-900 transition-colors">
                                {faq.question}
                            </span>
                            <ChevronDown 
                                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                            }`}
                        >
                            <div className="text-base text-gray-600 leading-relaxed pr-12">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQ
