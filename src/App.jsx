import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles';

export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
                    <Navbar />
                    
                    <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/articles" element={<Articles />} />
                        </Routes>
                    </main>
                    
                    <footer className="mt-auto py-8 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
                        <p>© {new Date().getFullYear()} Ruslan Xusenov. Barcha huquqlar himoyalangan.</p>
                        <p className="mt-1">Kripto-Ekspert vositasi hech qanday ma'lumotni serverga yubormaydi.</p>
                    </footer>
                </div>
            </BrowserRouter>
        </HelmetProvider>
    );
}
