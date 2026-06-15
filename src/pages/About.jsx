import React from 'react';
import SEO from '../components/SEO';
import { Github, Send, Mail, Briefcase, Code, User } from 'lucide-react';

export default function About() {
    return (
        <>
            <SEO 
                title="Ruslan Xusenov | Dasturchi"
                description="Ruslan Xusenov - tajribali Web dasturchi. Uning loyihalari va Kripto-Ekspert asbobi haqida ma'lumot. Dasturlash xizmatlari va texnologiyalar bo'yicha ekspert."
                keywords="Ruslan Xusenov, Ruslan, dasturchi Ruslan, Ruslan Xusenov loyihalari, web dasturchi, kripto-ekspert muallifi, o'zbekistonlik dasturchi"
                url="https://ruslandev.uz/about"
            />
            
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Image Placeholder */}
                        <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 bg-indigo-50 rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative group">
                            {/* Agar rasmingiz bo'lsa shunga almashtiring: <img src="/ruslan.jpg" alt="Ruslan Xusenov" className="w-full h-full object-cover" /> */}
                            <User size={80} className="text-indigo-200" />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">Ruslan Xusenov</h1>
                                <p className="text-lg text-indigo-600 font-medium mt-1">Full-Stack Web Dasturchi</p>
                            </div>
                            
                            <p className="text-slate-600 leading-relaxed">
                                Assalomu alaykum! Men Ruslan Xusenov, O'zbekistonlik dasturchiman. 
                                Veb-texnologiyalar, xavfsizlik va zamonaviy interfeyslar yaratishga qiziqaman. 
                                Mening maqsadim — insonlarga foyda keltiradigan sifatli va qulay dasturiy mahsulotlar ishlab chiqish.
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                                <a href="https://github.com/Ruslan-Xusenov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium">
                                    <Github size={18} />
                                    GitHub
                                </a>
                                <a href="https://t.me/ruslandev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium">
                                    <Send size={18} />
                                    Telegram
                                </a>
                                <a href="mailto:info@ruslandev.uz" className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors text-sm font-medium border border-slate-200">
                                    <Mail size={18} />
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                                <Code size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 font-heading">Texnologiyalar</h2>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Men asosan React, Next.js, Node.js va Tailwind CSS orqali loyihalar yarataman. SEO optimizatsiya va UI/UX dizayn bo'yicha ham amaliy bilimga egaman.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['JavaScript', 'React', 'Node.js', 'Tailwind', 'HTML/CSS', 'Git'].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-100">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
                                <Briefcase size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 font-heading">Kripto-Ekspert haqida</h2>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Kripto-Ekspert loyihasi ma'lumotlar xavfsizligi bo'yicha foydalanuvchilarga qulay uskunalar taqdim etish maqsadi ostida yaratildi. Bu yerda siz turli kriptografik algoritmlar bilan tanishishingiz va ularni amalda bepul sinab ko'rishingiz mumkin. Barcha jarayonlar faqat sizning brauzeringizda amalga oshadi.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
