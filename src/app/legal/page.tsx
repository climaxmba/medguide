import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col">
        {/* Banner Hero Section */}
        <section className="w-full bg-slate-900 border-b border-slate-800 text-white py-16 sm:py-24 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-12 w-64 h-64 bg-slate-700/30 blur-[80px] rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Terms & Privacy Policy
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              How we handle your data, our terms of service, and your rights
              when using Vora.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
          </div>

          <p className="text-slate-500 mb-12 font-medium">
            Last updated: May 9, 2026
          </p>

          <div className="space-y-12 text-slate-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Terms of Service
              </h2>

              <section className="mb-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing and using Vora AI, you accept and agree to be
                  bound by the terms and provisions of this agreement. Vora is
                  an experimental AI service intended for informational purposes
                  only.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                  2. Medical Disclaimer
                </h3>
                <p>
                  <strong className="text-slate-900">
                    Vora is an AI tool and not a substitute for professional
                    medical advice, diagnosis, or treatment.
                  </strong>{" "}
                  Always seek the advice of your physician or other qualified
                  health provider with any questions you may have regarding a
                  medical condition. Do not disregard professional medical
                  advice or delay in seeking it because of something you have
                  read or heard from this service. In a medical emergency, call
                  your local emergency services immediately.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                  3. Use of Service
                </h3>
                <p>
                  You agree to use Vora only for lawful purposes. You must not
                  use the service to generate harmful, illegal, or malicious
                  content. We reserve the right to modify or terminate the
                  service for any reason, without notice, at any time.
                </p>
              </section>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Privacy Policy
              </h2>

              <section className="mb-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                  1. Local Data Storage
                </h3>
                <p>
                  Your privacy is our primary concern. Vora AI is designed to
                  minimize data collection. Your chat history, consultation
                  summaries, and uploaded images/documents are strictly stored
                  locally on your device via your browser's IndexedDB. We do not
                  store your personal health history on external databases. If
                  you clear your browser data or use a different device, your
                  history will not be available.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                  2. Third-Party Processing (Google Gemini API)
                </h3>
                <p>
                  To provide advanced AI capabilities, Vora utilizes the Google
                  Gemini API. When you interact with the service—either via text
                  chat, voice consultation, or document uploads—the immediate
                  content of your prompt is securely transmitted to Google's
                  servers solely for processing and generating a response in
                  real-time. We do not use your data for training purposes, and
                  we encourage you to review Google's API data privacy policies
                  for more information on how they handle transient processing
                  data.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                  3. Audio and Live Consultation
                </h3>
                <p>
                  During live audio consultations, your microphone input is
                  actively streamed to the Google Gemini Live API. This audio
                  data is processed transiently to facilitate a real-time
                  conversation and is not recorded or persisted by Vora. Once
                  the session ends, the audio stream is disconnected.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
