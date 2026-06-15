import React, { useState } from 'react';
import { Lock, Unlock, Copy, Key, RefreshCcw, AlertCircle, CheckCircle2, Trash2, Settings2 } from 'lucide-react';
import SEO from '../components/SEO';
import CryptoJS from 'crypto-js';

export default function Home() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [method, setMethod] = useState('base64');
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const methods = [
        { id: 'base64', name: 'Base64 kodlash', needsKey: false, desc: 'Matnni standart Base64 formatiga o\'tkazish.' },
        { id: 'caesar', name: 'Sezar shifri (Caesar)', needsKey: true, keyType: 'number', placeholder: 'Siljish miqdori (raqam, masalan: 3)', desc: 'Belgilarni ma\'lum raqamga siljitish.' },
        { id: 'vigenere', name: 'Vigenère shifri', needsKey: true, keyType: 'text', placeholder: 'Maxfiy so\'z', desc: 'Maxfiy kalit so\'z yordamida polialfavit shifrlash.' },
        { id: 'xor', name: 'XOR + Base64', needsKey: true, keyType: 'text', placeholder: 'Maxfiy kalit so\'z', desc: 'XOR amali va maxfiy kalit yordamida kuchli shifrlash.' },
        { id: 'rot13', name: 'ROT13', needsKey: false, desc: 'Lotin harflarini 13 o\'ringa siljitish (faqat ingliz harflari uchun).' },
        { id: 'aes', name: 'AES (Advanced Encryption Standard)', needsKey: true, keyType: 'text', placeholder: 'Maxfiy kalit so\'z', desc: 'Sanoat standartidagi yuqori darajali shifrlash.' },
        { id: 'des', name: 'DES', needsKey: true, keyType: 'text', placeholder: 'Maxfiy kalit so\'z', desc: 'Klassik va kuchli Data Encryption Standard.' },
        { id: 'morse', name: 'Morze alifbosi', needsKey: false, desc: 'Matnni nuqta va tirelarga (Morze kodi) o\'tkazish.' },
        { id: 'binary', name: 'Ikkilik (Binary)', needsKey: false, desc: 'Matnni 0 va 1 lardan iborat qatorga o\'tkazish.' },
        { id: 'hex', name: 'O\'n oltilik (Hexadecimal)', needsKey: false, desc: 'Matnni hex formatga o\'tkazish.' }
    ];

    const currentMethod = methods.find(m => m.id === method);

    const utoa = (str) => {
        try { return window.btoa(unescape(encodeURIComponent(str))); }
        catch (e) { throw new Error("Base64 kodlashda xatolik."); }
    };
    const atou = (str) => {
        try { return decodeURIComponent(escape(window.atob(str))); }
        catch (e) { throw new Error("Noto'g'ri Base64 formati."); }
    };

    const base64Encrypt = (text) => utoa(text);
    const base64Decrypt = (text) => atou(text);

    const caesarEncrypt = (text, shiftStr) => {
        const shift = parseInt(shiftStr) || 0;
        let shifted = '';
        for (let i = 0; i < text.length; i++) {
            shifted += String.fromCharCode((text.charCodeAt(i) + shift) % 65536);
        }
        return utoa(shifted);
    };
    const caesarDecrypt = (text, shiftStr) => {
        const shift = parseInt(shiftStr) || 0;
        let unshifted = '';
        const decoded = atou(text);
        for (let i = 0; i < decoded.length; i++) {
            unshifted += String.fromCharCode((decoded.charCodeAt(i) - shift + 65536) % 65536);
        }
        return unshifted;
    };

    const vigenereEncrypt = (text, key) => {
        if (!key) throw new Error("Maxfiy kalit kiritilmagan!");
        let shifted = '';
        for (let i = 0; i < text.length; i++) {
            const shift = key.charCodeAt(i % key.length);
            shifted += String.fromCharCode((text.charCodeAt(i) + shift) % 65536);
        }
        return utoa(shifted);
    };
    const vigenereDecrypt = (text, key) => {
        if (!key) throw new Error("Maxfiy kalit kiritilmagan!");
        const decoded = atou(text);
        let unshifted = '';
        for (let i = 0; i < decoded.length; i++) {
            const shift = key.charCodeAt(i % key.length);
            unshifted += String.fromCharCode((decoded.charCodeAt(i) - shift + 65536) % 65536);
        }
        return unshifted;
    };

    const xorEncrypt = (text, key) => {
        if (!key) throw new Error("Maxfiy kalit kiritilmagan!");
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return utoa(result);
    };
    const xorDecrypt = (text, key) => {
        if (!key) throw new Error("Maxfiy kalit kiritilmagan!");
        const decoded = atou(text);
        let result = '';
        for (let i = 0; i < decoded.length; i++) {
            result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    };

    const rot13 = (text) => {
        return text.replace(/[a-zA-Z]/g, (c) => {
            const base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
        });
    };

    const morseCode = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
        'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
        'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
        'y': '-.--', 'z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/'
    };
    const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));

    const morseEncrypt = (text) => {
        return text.toLowerCase().split('').map(c => morseCode[c] || c).join(' ');
    };
    const morseDecrypt = (text) => {
        return text.split(' ').map(c => reverseMorse[c] || c).join('');
    };

    const binaryEncrypt = (text) => {
        return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    };
    const binaryDecrypt = (text) => {
        return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
    };

    const hexEncrypt = (text) => {
        return text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    };
    const hexDecrypt = (text) => {
        return text.split(' ').map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
    };

    const aesEncrypt = (text, key) => {
        if (!key) throw new Error("Maxfiy kalit kiritilmagan!");
        return CryptoJS.AES.encrypt(text, key).toString();
    };
    const aesDecrypt = (text, key) => {
        if (!key) throw new Error("Maxfiy kalit kiritilmagan!");
        const bytes = CryptoJS.AES.decrypt(text, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (!originalText) throw new Error("Noto'g'ri kalit yoki shikastlangan ma'lumot!");
        return originalText;
    };

    const desEncrypt = (text, key) => {
        if (!key) throw new Error("Maxfiy kalit kiritilmagan!");
        return CryptoJS.DES.encrypt(text, key).toString();
    };
    const desDecrypt = (text, key) => {
        if (!key) throw new Error("Maxfiy kalit kiritilmagan!");
        const bytes = CryptoJS.DES.decrypt(text, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (!originalText) throw new Error("Noto'g'ri kalit yoki shikastlangan ma'lumot!");
        return originalText;
    };

    const processText = (action) => {
        setError('');
        setOutputText('');

        if (!inputText.trim()) {
            setError("Iltimos, ishlov berish uchun matn kiriting!");
            return;
        }

        try {
            let result = '';
            switch (method) {
                case 'base64': result = action === 'encrypt' ? base64Encrypt(inputText) : base64Decrypt(inputText); break;
                case 'caesar': result = action === 'encrypt' ? caesarEncrypt(inputText, secretKey) : caesarDecrypt(inputText, secretKey); break;
                case 'vigenere': result = action === 'encrypt' ? vigenereEncrypt(inputText, secretKey) : vigenereDecrypt(inputText, secretKey); break;
                case 'xor': result = action === 'encrypt' ? xorEncrypt(inputText, secretKey) : xorDecrypt(inputText, secretKey); break;
                case 'rot13': result = rot13(inputText); break;
                case 'aes': result = action === 'encrypt' ? aesEncrypt(inputText, secretKey) : aesDecrypt(inputText, secretKey); break;
                case 'des': result = action === 'encrypt' ? desEncrypt(inputText, secretKey) : desDecrypt(inputText, secretKey); break;
                case 'morse': result = action === 'encrypt' ? morseEncrypt(inputText) : morseDecrypt(inputText); break;
                case 'binary': result = action === 'encrypt' ? binaryEncrypt(inputText) : binaryDecrypt(inputText); break;
                case 'hex': result = action === 'encrypt' ? hexEncrypt(inputText) : hexDecrypt(inputText); break;
                default: throw new Error("Noma'lum usul tanlandi.");
            }
            setOutputText(result);
        } catch (err) {
            setError(err.message || "Xatolik yuz berdi. Matn yoki kalit to'g'riligini tekshiring.");
        }
    };

    const copyToClipboard = () => {
        if (!outputText) return;
        navigator.clipboard.writeText(outputText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            const textArea = document.createElement("textarea");
            textArea.value = outputText;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                setError("Nusxa olishda xatolik yuz berdi.");
            }
            document.body.removeChild(textArea);
        });
    };

    const clearAll = () => {
        setInputText('');
        setOutputText('');
        setError('');
    };

    return (
        <>
            <SEO 
                title="Kripto-Ekspert | Matnlarni xavfsiz shifrlash va deshifrlash"
                description="Kripto-Ekspert - matnlarni Base64, Sezar (Caesar), Vigenère, XOR va ROT13 usullari yordamida tez va xavfsiz shifrlash uchun onlayn vosita. Ruslan Xusenov loyihasi."
                keywords="kripto-ekspert, shifrlash, deshifrlash, base64, sezar shifri, vigenere, xor, rot13, Ruslan Xusenov dasturchi"
                url="https://ruslandev.uz/"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400">
                        <div className="flex justify-between items-center mb-3">
                            <label className="font-semibold text-slate-700 flex items-center gap-2">
                                Asl matn
                                <span className="text-xs font-normal bg-slate-100 px-2 py-1 rounded-md text-slate-500">
                                    {inputText.length} belgi
                                </span>
                            </label>
                            {inputText && (
                                <button
                                    onClick={clearAll}
                                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                    title="Tozalash"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Shifrlash yoki deshifrlash uchun matnni bu yerga kiriting..."
                            className="w-full flex-1 min-h-[250px] resize-none outline-none text-slate-700 placeholder-slate-400 bg-transparent"
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col justify-center gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                <Settings2 size={16} className="text-indigo-500" />
                                Kodlash usuli
                            </label>
                            <select
                                value={method}
                                onChange={(e) => {
                                    setMethod(e.target.value);
                                    setSecretKey('');
                                    setError('');
                                }}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
                            >
                                {methods.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                            <p className="text-[11px] text-slate-500 leading-tight mt-1">
                                {currentMethod?.desc}
                            </p>
                        </div>

                        {currentMethod?.needsKey && (
                            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                    <Key size={16} className="text-amber-500" />
                                    Kalit
                                </label>
                                <input
                                    type={currentMethod.keyType === 'number' ? 'number' : 'text'}
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    placeholder={currentMethod.placeholder}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                                />
                            </div>
                        )}

                        <div className="h-px bg-slate-100 my-2"></div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => processText('encrypt')}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-medium transition-all active:scale-[0.98] shadow-sm hover:shadow-indigo-200 shadow-md"
                            >
                                <Lock size={18} />
                                Shifrlash
                            </button>

                            <button
                                onClick={() => processText('decrypt')}
                                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-xl font-medium transition-all active:scale-[0.98] shadow-sm"
                            >
                                <Unlock size={18} />
                                Deshifrlash
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col relative overflow-hidden">
                        {error && (
                            <div className="absolute top-0 left-0 right-0 bg-red-50 text-red-600 text-sm p-3 flex items-center gap-2 border-b border-red-100 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={16} className="shrink-0" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <div className={`flex justify-between items-center mb-3 ${error ? 'mt-10' : ''} transition-all`}>
                            <label className="font-semibold text-slate-700">Natija</label>
                            <button
                                onClick={copyToClipboard}
                                disabled={!outputText}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${outputText
                                    ? copied
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                    : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                {copied ? "Nusxa olindi" : "Nusxa olish"}
                            </button>
                        </div>

                        <textarea
                            readOnly
                            value={outputText}
                            placeholder="Natija bu yerda ko'rinadi..."
                            className="w-full flex-1 min-h-[250px] resize-none outline-none text-slate-800 placeholder-slate-300 bg-transparent font-mono text-sm leading-relaxed"
                        />

                        {!outputText && !error && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col gap-3 text-slate-300 mt-8">
                                <RefreshCcw size={48} strokeWidth={1} className="opacity-50" />
                                <p className="text-sm font-medium">Jarayon kutilmoqda</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
