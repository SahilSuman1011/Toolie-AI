import { assets } from '../assets/assets'

export default function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 pb-6 w-full text-gray-500 bg-white py-3">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-16 pb-[-8]">
                <div className="md:max-w-sm flex flex-col items-center md:items-start">
                    <img src={assets.logo} alt="Toolie AI Logo" className='w-44 h-24 sm:w-48' />
                    <p className="text-sm text-gray-600 leading-relaxed text-center md:text-left">
                        Toolie AI is a modern SaaS platform offering a suite of AI-powered tools to supercharge your productivity and enhance your workflow.
                    </p>
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-end gap-10 md:gap-16 pb-[-10]">
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900 text-sm text-center md:text-left">Resources</h3>
                        <ul className="text-sm space-y-2.5 text-gray-600 text-center md:text-left">
                            <li><a href="#" className="hover:text-[#2F80ED] transition-colors">Tutorials</a></li>
                            <li><a href="#" className="hover:text-[#2F80ED] transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-[#2F80ED] transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900 text-sm text-center md:text-left">Connect</h3>
                        <ul className="text-sm space-y-2.5 text-gray-600 text-center md:text-left">
                            <li><a href="#" className="hover:text-[#2F80ED] transition-colors">Github</a></li>
                            <li><a href="#" className="hover:text-[#2F80ED] transition-colors">Linkedin</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
                <p className="text-center text-xs md:text-sm text-gray-500">
                    Copyright © 2025 <a href="https://toolieai.com" className="hover:text-[#2F80ED] transition-colors font-medium">Toolie AI</a>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};