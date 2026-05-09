import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-slate-500 mb-8 font-medium">Last updated: May 9, 2026</p>
          
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">1. Local Data Storage</h2>
              <p>
                Your privacy is our primary concern. Vora AI is designed to minimize data collection. Your chat history, consultation summaries, and uploaded images/documents are strictly stored locally on your device via your browser's IndexedDB. We do not store your personal health history on external databases. If you clear your browser data or use a different device, your history will not be available.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">2. Third-Party Processing (Google Gemini API)</h2>
              <p>
                To provide advanced AI capabilities, Vora utilizes the Google Gemini API. When you interact with the service—either via text chat, voice consultation, or document uploads—the immediate content of your prompt is securely transmitted to Google's servers solely for processing and generating a response in real-time. We do not use your data for training purposes, and we encourage you to review Google's API data privacy policies for more information on how they handle transient processing data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">3. Audio and Live Consultation</h2>
              <p>
                During live audio consultations, your microphone input is actively streamed to the Google Gemini Live API. This audio data is processed transiently to facilitate a real-time conversation and is not recorded or persisted by Vora. Once the session ends, the audio stream is disconnected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">4. Medical Disclaimer</h2>
              <p>
                Vora is an AI tool and not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Do not disregard professional medical advice or delay in seeking it because of something you have read or heard from this service.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
