import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, User, FileText, Home } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Asosiy', icon: <Home size={18} /> },
        { path: '/about', label: 'Men haqimda', icon: <User size={18} /> },
        { path: '/articles', label: 'Maqolalar', icon: <FileText size={18} /> },
    ];

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700 transition-colors">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-200">
                        <Shield size={24} strokeWidth={2.5} />
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="font-bold text-xl text-slate-900 leading-tight font-heading">Kripto-Ekspert</span>
                    </div>
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm font-medium transition-all ${
                                isActive(item.path)
                                    ? 'bg-indigo-50 text-indigo-700 shadow-inner'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <span className={isActive(item.path) ? 'text-indigo-600' : 'text-slate-500'}>
                                {item.icon}
                            </span>
                            <span className="hidden md:block">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
