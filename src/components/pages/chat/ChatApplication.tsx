'use client';
import { useState, useEffect, useRef } from 'react';
import { addMessage, getMessages, clearMessages } from '@/lib/db';
import { generateChatResponse } from '@/lib/gemini';
import { Send, Paperclip, FileText, X, Mic, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';

export interface Message {
  id?: number;
  role: 'user' | 'model';
  text: string;
  images?: string[];
  timestamp: number;
}

export function ChatApplication() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const loadMessages = async () => {
    try {
      const msgs = await getMessages();
      setMessages(msgs as Message[]);
    } catch(e) {}
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let mounted = true;
    getMessages().then(msgs => {
      if (mounted) {
        if (!msgs || msgs.length === 0) {
          setMessages([{
            role: 'model',
            text: "Hello! I am Vora, your healthcare assistant. How can I help you today?",
            timestamp: Date.now()
          }]);
        } else {
          setMessages(msgs as Message[]);
        }
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("File read error"));
    });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;
      const files = Array.from(e.target.files);
      
      // Convert to base64
      const newImages = await Promise.all(files.map(file => toBase64(file)));
      setSelectedImages(prev => [...prev, ...newImages]);
    } catch (err) {
      // quiet error
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearHistory = async () => {
    try {
      await clearMessages();
      setMessages([]);
    } catch (e) {}
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && selectedImages.length === 0) || isLoading) return;

    const userMsg: Omit<Message, 'timestamp'> = {
      role: 'user',
      text: input,
      images: selectedImages.length > 0 ? selectedImages : undefined,
    };

    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setSelectedImages([]);
    setIsLoading(true);
    setError(null);

    try {
      // Add to UI optimistically
      const timestamp = Date.now();
      const localUserMsg = { ...userMsg, timestamp };
      setMessages(prev => [...prev, localUserMsg]);
      
      // Save to db
      await addMessage(userMsg);

      // Call API
      // Exclude the current message from history to avoid duplication, pass existing msgs
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await generateChatResponse(userMsg.text, userMsg.images, history);

      const modelMsg: Omit<Message, 'timestamp'> = {
        role: 'model',
        text: responseText || "I'm sorry, I couldn't process that.",
      };

      // Add to DB
      await addMessage(modelMsg);
      
      // Add to UI
      setMessages(prev => [...prev, { ...modelMsg, timestamp: Date.now() }]);

    } catch (err: any) {
      console.error("Chat Error:", err);
      let msg = err?.message || (typeof err === 'string' ? err : "An error occurred");
      try {
        // sometimes error message is a JSON stringified object
        if (msg.startsWith('{') || msg.startsWith('[')) {
          const parsed = JSON.parse(msg);
          if (parsed.error && parsed.error.message) {
            msg = parsed.error.message;
          } else if (parsed.message) {
            msg = parsed.message;
          }
        }
      } catch(e) {}
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col h-[calc(100dvh-80px)] max-h-[calc(100dvh-80px)] min-h-0">
      
      {/* Header Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-semibold text-slate-900">Consultation Chat</h1>
          <p className="text-xs sm:text-sm text-slate-500">Secure, local history saved on your device</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => handleClearHistory()}
            className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-full transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <Link 
            href="/consult" 
            className="flex-1 sm:flex-none justify-center px-4 py-2 bg-red-50 text-red-700 font-medium rounded-full text-sm hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-200"
          >
            <Mic size={16} />
            Open Live Audio
          </Link>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-sm' 
                  : 'bg-white border border-slate-200 shadow-sm rounded-tl-sm text-slate-800'
              }`}>
                {msg.images && msg.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {msg.images.map((img, i) => (
                      img.startsWith('data:image') ? (
                        <img key={i} src={img} alt="Uploaded attachment" className="h-32 object-cover border border-slate-200 rounded-lg" />
                      ) : (
                        <div key={i} className="h-32 w-24 flex flex-col items-center justify-center bg-white/10 rounded-lg border border-slate-500/30 text-current gap-2">
                          <FileText size={32} />
                          <span className="text-[10px] font-medium opacity-80 uppercase">Doc</span>
                        </div>
                      )
                    ))}
                  </div>
                )}
                <div className="markdown-body whitespace-pre-wrap leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_pre]:bg-slate-800 [&_pre]:text-slate-100 [&_pre]:p-3 [&_pre]:rounded-md [&_code]:bg-slate-800 [&_code]:text-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded text-sm sm:text-base [&_a]:text-blue-600 [&_a]:underline [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2">
                  <Markdown>{msg.text}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 rounded-tl-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative pb-2">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center justify-between">
            <span>{error}</span>
            <button type="button" onClick={() => setError(null)} className="text-red-500 hover:text-red-700 transition-colors">
              <X size={16} />
            </button>
          </div>
        )}
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {selectedImages.map((img, i) => (
              <div key={i} className="relative group">
                {img.startsWith('data:image') ? (
                  <img src={img} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-slate-200" />
                ) : (
                  <div className="h-16 w-16 flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200 text-slate-500">
                    <FileText size={24} />
                  </div>
                )}
                <button 
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <form 
          className="flex items-center bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-300 transition-all" 
          onSubmit={handleSubmit}
        >
          <input 
            type="file"
            accept="image/*,application/pdf"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 m-1 shrink-0 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors flex items-center justify-center"
          >
            <Paperclip size={22} />
          </button>
          <div className="flex-1 overflow-hidden">
            <textarea 
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 120)}px`;
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                  }
                  handleSubmit();
                }
              }}
              placeholder="Describe symptoms or upload results..."
              className="w-full max-h-[120px] overflow-y-auto bg-transparent resize-none py-3.5 px-2 focus:outline-none text-slate-80 leading-relaxed text-sm sm:text-base"
              rows={1}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading || (!input.trim() && selectedImages.length === 0)}
            className="p-2.5 m-1.5 shrink-0 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-md shadow-red-600/20"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-[11px] text-slate-400">
            By using Vora, you agree to our <Link href="/legal" className="underline hover:text-slate-600 transition-colors">Terms & Privacy Policy</Link>. Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </main>
  );
}
