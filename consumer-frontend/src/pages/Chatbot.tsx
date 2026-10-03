import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, Globe, Volume2 } from 'lucide-react';

export const Chatbot = () => {
  const [lang, setLang] = useState('en');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am the BIS NIDAAN AI Assistant. Ask me about BIS standards, certification processes, or product safety guidelines.', lang: 'en' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
    setMessages(prev => [...prev, { role: 'ai', text: lang === 'en' ? '\u0928\u092e\u0938\u094d\u0924\u0947! \u092e\u0948\u0902 BIS NIDAAN AI \u0938\u0939\u093e\u092f\u0915 \u0939\u0942\u0901\u0964' : 'Switched to English. How can I help you?', lang: lang === 'en' ? 'hi' : 'en' }]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg, lang }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/public/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language: lang })
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'ai', text: data.reply, lang }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'Error contacting AI server.', lang }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Network error.', lang }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl border border-[var(--color-border-mist)] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-[var(--color-surface-white)] border-b border-[var(--color-border-mist)] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-sky-mist)] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[var(--color-trust-blue)]" />
          </div>
          <div>
            <h2 className="font-bold text-[var(--color-text-ink)] text-lg">BIS Assistant</h2>
            <div className="flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-assured-green)]"></span>
                <span className="text-xs text-[var(--color-text-slate)] font-medium">Answers from BIS sources</span>
            </div>
          </div>
        </div>
        <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-trust-blue)] px-3 py-1.5 rounded-lg hover:bg-[var(--color-sky-mist)] transition-all">
          <Globe className="w-4 h-4" /> {lang === 'en' ? 'English' : 'हिंदी'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[var(--color-surface-cloud)]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm relative ${
              msg.role === 'user'
                ? 'bg-[var(--color-trust-blue)] text-white rounded-br-none'
                : 'bg-[var(--color-sky-mist)] text-[var(--color-text-ink)] rounded-bl-none'
            }`}>
              {msg.role === 'ai' && (
                  <button className="absolute top-2 right-2 text-[var(--color-trust-blue)] hover:bg-white/50 p-1 rounded-full">
                      <Volume2 className="w-4 h-4" />
                  </button>
              )}
              <div className="whitespace-pre-line text-sm leading-relaxed pr-6">{msg.text}</div>
              {msg.role === 'ai' && i > 0 && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-trust-blue)]/10">
                      <span className="inline-block bg-white text-[var(--color-info-teal)] text-xs font-semibold px-2 py-1 rounded-[999px] border border-[var(--color-info-teal-tint)]">
                          IS 1234:2020, Cl. 5.2
                      </span>
                  </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--color-sky-mist)] rounded-2xl p-4 rounded-bl-none flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--color-trust-blue)] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[var(--color-trust-blue)] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-[var(--color-trust-blue)] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-[var(--color-border-mist)] shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about standards, e.g. 'What is the standard for cement?'"
            className="w-full pl-4 pr-12 py-3 bg-[var(--color-surface-cloud)] border border-[var(--color-border-mist)] rounded-[12px] focus:outline-none focus:border-[var(--color-trust-blue)] focus:ring-1 focus:ring-[var(--color-trust-blue)] transition-all text-sm text-[var(--color-text-ink)]"
          />
          <button type="submit" className="absolute right-2 p-2 bg-[var(--color-trust-blue)] text-white rounded-[8px] hover:bg-[#174b99] transition-all">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
