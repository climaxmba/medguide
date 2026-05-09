'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Activity, MessageSquare, Mic } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 print:hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/logo.svg" 
            alt="Vora AI Logo" 
            width={160} 
            height={50} 
            className="w-28 sm:w-40 h-auto group-hover:scale-105 transition-transform" 
          />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          <Link 
            href="/" 
            className={cn(
              "hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              pathname === '/' ? "text-slate-900 bg-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            Home
          </Link>
          <Link 
            href="/chat" 
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              pathname === '/chat' ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <MessageSquare size={18} className={cn("transition-colors", pathname === '/chat' ? "text-slate-900" : "text-slate-400")} />
            <span className="hidden sm:inline">Consult Chat</span>
          </Link>
          <Link 
            href="/consult" 
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              pathname === '/consult' ? "bg-red-600 text-white shadow-lg shadow-red-600/25 border-t border-white/20 scale-105" : "bg-white text-slate-600 border border-slate-200 hover:border-red-200 hover:text-red-600 hover:bg-red-50 hover:shadow-sm"
            )}
          >
            <Mic size={18} className={cn("transition-colors", pathname === '/consult' ? "text-white animate-pulse" : "text-slate-400")} />
            <span className="hidden sm:inline">Live Audio Session</span>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
