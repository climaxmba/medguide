'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Activity, Mic } from 'lucide-react';
import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <section className="overflow-x-hidden w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] md:h-full bg-red-600/8 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex-1 text-center lg:text-left z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-medium text-sm mb-8 border border-red-100"
        >
          <Sparkles size={16} />
          <span>Next-Generation Health AI</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-display font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
        >
          Exceptional care, <br />
          <span className="text-red-600">redefined by AI.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
        >
          Experience a sophisticated healthcare consultant available 24/7. From specialized inquiries to live audio consultations, Vora AI delivers precise and empathetic guidance.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <Link href="/chat" className="h-14 px-8 rounded-full bg-slate-900 text-white flex items-center gap-2 font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-95 w-full sm:w-auto justify-center">
            Start Text Consult
          </Link>
          <Link href="/consult" className="h-14 px-8 rounded-full bg-red-600 text-white flex items-center gap-2 font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 active:scale-95 w-full sm:w-auto justify-center">
            Live Audio Session
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 relative w-full max-w-[500px] mx-auto z-10 lg:pl-10"
      >        
        <div className="relative w-full aspect-[4/5] sm:aspect-square rounded-[2.5rem] overflow-hidden bg-white/40 backdrop-blur-lg border border-slate-200/60 shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
          {/* Light shine effect at the top of the card */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent z-30" />
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/40 to-transparent z-20 pointer-events-none" />
          
          <div className="relative z-20 flex justify-between items-start">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-red-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Activity size={24} className="relative z-10 sm:w-7 sm:h-7" />
            </div>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full text-[10px] sm:text-xs font-semibold tracking-wide text-slate-700 shadow-sm border border-slate-100 flex items-center gap-2">
              <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-500"></span>
              </div>
              System Online
            </div>
          </div>
          
          {/* AI Avatar Central Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* SVG Pattern Background */}
            <div className="absolute inset-0 opacity-60 mix-blend-multiply" style={{ backgroundImage: 'url("/vora.svg")', backgroundSize: '16px 16px', backgroundRepeat: 'repeat' }} />
            <div className="absolute inset-0 bg-red-500/10 blur-[80px] animate-pulse mix-blend-multiply" />
            <Image 
              src="/vora.webp"
              alt="Vora AI Avatar"
              fill
              referrerPolicy="no-referrer"
              className="object-cover object-top opacity-90 drop-shadow-2xl mix-blend-luminosity scale-105"
            />
            {/* Gradient overlay at the bottom so chat bubbles are readable */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply" />
          </div>

          {/* Chat Interface Visualization */}
          <div className="relative z-20 space-y-3 sm:space-y-4 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white/70 backdrop-blur-xl p-3 rounded-2xl rounded-tl-sm shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] border border-white/50 mr-8 sm:mr-12"
            >
              <p className="text-slate-800 text-xs leading-relaxed font-medium">I have analyzed your medical history. The recent variations align with restorative protocols.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="bg-red-600/80 backdrop-blur-xl text-white p-3 rounded-2xl rounded-tr-sm shadow-[0_8px_30px_-4px_rgba(220,38,38,0.2)] border border-red-500/50 relative overflow-hidden ml-8 sm:ml-12"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
              <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 opacity-90 relative z-10">
                <Mic size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase">Voice Mode Active</span>
              </div>
              <p className="font-medium relative z-10 text-xs leading-snug">Please describe your symptoms and how you are feeling today.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
