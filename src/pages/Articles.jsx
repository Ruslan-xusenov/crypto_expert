import React from 'react';
import SEO from '../components/SEO';

export default function Articles() {
    return (
        <>
            <SEO 
                title="Kriptografiya va Shifrlash turlari | Ruslan Xusenov"
                description="Base64, Caesar, Vigenère, XOR va ROT13 shifrlash algoritmlari haqida to'liq o'zbekcha ma'lumot va formulalar."
                keywords="kriptografiya, shifrlash turlari, base64 nima, sezar shifri qanday ishlaydi, vigenere shifri, rot13, algoritmlar"
                url="https://ruslandev.uz/articles"
            />
            
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col gap-8">
                <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 font-heading border-b pb-4">Algoritmlar haqida ma'lumot</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Base64 */}
                        <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <h3 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
                                <span className="bg-indigo-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                                Base64 kodlash
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Bu shifrlash emas, balki <strong>encoding</strong> (ma'lumotni boshqa formatga o‘tkazish).
                            </p>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                                <p><strong>Jarayon:</strong></p>
                                <ul className="list-disc ml-4 space-y-1 text-slate-500">
                                    <li>Matn ASCII / UTF-8 baytlarga o‘tkaziladi.</li>
                                    <li>Baytlar 6 bitli bloklarga bo‘linadi.</li>
                                    <li>Har bir 6 bit Base64 jadvalidagi belgiga moslanadi.</li>
                                </ul>
                                <p className="mt-2 text-indigo-500 font-mono">Example: hello → aGVsbG8=</p>
                            </div>
                        </div>

                        {/* Caesar */}
                        <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <h3 className="text-lg font-bold text-amber-600 flex items-center gap-2">
                                <span className="bg-amber-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                                Caesar shifri
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Bu eng oddiy klassik shifrlash algoritmi.
                            </p>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                                <p><strong>Formula:</strong> <code className="bg-slate-50 px-1 rounded">E(x) = (x + k) mod 26</code></p>
                                <p><strong>Jarayon:</strong> Har bir harf alfavitdagi indeksga ko'ra kalit (k) miqdoriga siljitiladi.</p>
                                <p className="mt-2 text-amber-600 font-mono">Example (k=3): HELLO → KHOOR</p>
                            </div>
                        </div>

                        {/* Vigenère */}
                        <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <h3 className="text-lg font-bold text-emerald-600 flex items-center gap-2">
                                <span className="bg-emerald-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span>
                                Vigenère shifri
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Bu Caesar shifrining rivojlangan versiyasi.
                            </p>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                                <p><strong>Formula:</strong> <code className="bg-slate-50 px-1 rounded">Ci = (Pi + Ki) mod 26</code></p>
                                <p><strong>Jarayon:</strong> Kalit so‘z takrorlanib, har bir harf kalitdagi mos harfga qarab siljitiladi.</p>
                                <p className="mt-2 text-emerald-600 font-mono">Example: HELLO + KEY → RIJVS</p>
                            </div>
                        </div>

                        {/* XOR */}
                        <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <h3 className="text-lg font-bold text-rose-600 flex items-center gap-2">
                                <span className="bg-rose-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm">4</span>
                                XOR + Base64
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Ko‘pincha oddiy obfuscation (yashirish) uchun ishlatiladi.
                            </p>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                                <p><strong>Formula:</strong> <code className="bg-slate-50 px-1 rounded">C = P ⊕ K</code></p>
                                <p><strong>Jarayon:</strong> Har bir bayt kalit bilan XOR qilinadi va natija Base64 ga o'tkaziladi.</p>
                            </div>
                        </div>

                        {/* ROT13 */}
                        <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100 md:col-span-2">
                            <h3 className="text-lg font-bold text-purple-600 flex items-center gap-2">
                                <span className="bg-purple-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm">5</span>
                                ROT13
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Caesar shifrining maxsus turi (Shift = 13). 2 marta qo'llansa asl matn qaytadi.
                            </p>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs flex justify-between items-center">
                                <p><strong>Formula:</strong> <code className="bg-slate-50 px-2 rounded">E(x) = (x + 13) mod 26</code></p>
                                <p className="text-purple-600 font-mono font-bold">HELLO → URYYB</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading">Qisqa taqqoslash</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="p-4 font-semibold text-slate-700 border-b border-slate-100">Usul</th>
                                    <th className="p-4 font-semibold text-slate-700 border-b border-slate-100">Turi</th>
                                    <th className="p-4 font-semibold text-slate-700 border-b border-slate-100">Xavfsizlik</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { name: 'Base64', type: 'Encoding', security: 'Past', color: 'text-indigo-600' },
                                    { name: 'Caesar', type: 'Shifrlash', security: 'Juda past', color: 'text-amber-600' },
                                    { name: 'Vigenere', type: 'Shifrlash', security: 'O‘rtacha', color: 'text-emerald-600' },
                                    { name: 'XOR + Base64', type: 'Obfuscation', security: 'O‘rtacha', color: 'text-rose-600' },
                                    { name: 'ROT13', type: 'Cipher', security: 'Juda past', color: 'text-purple-600' },
                                ].map((row, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className={`p-4 font-medium ${row.color}`}>{row.name}</td>
                                        <td className="p-4 text-slate-500">{row.type}</td>
                                        <td className={`p-4 font-bold ${row.security.includes('Past') ? 'text-rose-500' : 'text-amber-500'}`}>
                                            {row.security}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}
