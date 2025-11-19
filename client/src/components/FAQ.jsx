import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0)

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
        <div className="py-10 px-4 sm:px-6 lg:px-8 bg-white w-full">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl mb-6">
                        <HelpCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Frequently asked questions
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Everything you need to know about the product and billing.
                    </p>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className={`border rounded-2xl transition-all duration-300 ${
                                openIndex === index 
                                ? 'border-blue-200 bg-blue-50/30 shadow-sm' 
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`text-lg font-medium transition-colors ${
                                    openIndex === index ? 'text-blue-700' : 'text-slate-700'
                                }`}>
                                    {faq.question}
                                </span>
                                <div className={`p-1 rounded-full transition-all duration-300 ${
                                    openIndex === index ? 'bg-blue-100 rotate-180' : 'bg-slate-100'
                                }`}>
                                    <ChevronDown 
                                        className={`w-5 h-5 transition-colors ${
                                            openIndex === index ? 'text-blue-600' : 'text-slate-500'
                                        }`}
                                    />
                                </div>
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-transparent">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQ