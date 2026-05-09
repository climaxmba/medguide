import { Brain, Clock, Shield } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="w-full bg-white border-t border-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Sophisticated Care Intelligence</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Equipped with state-of-the-art AI architecture, Vora understands complex medical contexts up to thousands of pages.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Brain, title: 'Deep Context Analysis', desc: 'Upload lab results, images, and documents for a comprehensive health overview.' },
            { icon: Clock, title: 'Real-time Live Audio', desc: 'Converse naturally with Vora through cutting-edge, ultra-low latency voice models.' },
            { icon: Shield, title: 'Secure & Private', desc: 'Your consultation history is securely stored on your device via IndexedDB.' },
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 transition-transform group-hover:text-red-600 group-hover:border-red-100">
                <f.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
