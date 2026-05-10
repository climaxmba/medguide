# Vora - AI Healthcare Consultant

## Overview
Vora is an AI-powered healthcare assistant designed to provide general wellness, health, and medical information through text and voice interactions.

## How to Use Vora

Vora offers two main ways to interact with your AI healthcare consultant:

### 1. AI Text Chat
- **Start a Conversation**: Navigate to the "Chat" section and simply type your health-related questions in the text box.
- **Upload Files**: You can upload images or documents for Vora to analyze (e.g., test results, nutritional labels) using the clip icon next to the chat bar.
- **Save History**: Your past chat sessions are automatically saved securely in your browser, so you can return to them at any time.

### 2. Live Audio Consultation
- **Start a Call**: Navigate to "Live Consult" and click "Start Consultation" to initiate a real-time voice call with Vora. 
- **Speak Naturally**: Speak into your microphone. Vora listens directly to your voice and responds conversationally, just like a regular phone call.
- **Consultation Summary**: After you've had your conversation, you can end the call and click "Generate Summary". This will provide a professional, clinical-style written overview of everything that was discussed, which you can easily print for your records.

>*Note: Vora is designed to provide general information and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.*

---

## Technical Details (For Developers)

Vora is built using modern web development patterns and AI integrations.

### Tech Stack
- **Framework**: Next.js (App Router)
- **Frontend/Styling**: React, Tailwind CSS, Motion (framer-motion)
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API (`@google/genai` SDK)
- **State Management**: React Hooks, IndexedDB (Client-side persistence)

### Architecture Highlights

- **Text Chat (Gemini Pro/Flash)**: 
  - Utilizes the `generateContentStream` method for fluid, real-time text generation.
  - Supports multi-modal capabilities; file uploads (images, PDFs) are converted into compatible generative `Part` objects and passed cleanly to the Gemini backend.
  - Complete history and session state is persisted client-side using `idb` (IndexedDB), ensuring user privacy and fast offline retrieval without the need for a dedicated backend database.
  - Features Markdown rendering using `markdown-to-jsx`.

- **Live Audio Consultation (Gemini Live API)**:
  - Establishes a bidirectional WebSocket connection to the Gemini Realtime API (`BidiGenerateContent` interface).
  - Implements the browser `AudioContext` and `ScriptProcessorNode` to capture the user's microphone output, convert it to PCM 16kHz base64 data, and send it seamlessly over the robust websocket.
  - Decodes and plays the streaming audio responses from the Gemini model using Web Audio API buffer source nodes, providing an incredibly fast, voice-to-voice interaction.
  - Captures `inputTranscription` and `outputTranscription` via the `LiveServerMessage` payload, enabling accurate and context-aware post-call summaries using `gemini-3.1-flash-lite-preview`.

- **Responsive Design & UX**: 
  - Fully mobile-responsive layout built heavily with Tailwind CSS utility classes.
  - Interactions are enhanced with animations from `motion/react`.
  - Design recipes follow clean, clinical layout structures with distinct interactions such as "Print Mode" enhancements (`print:hidden`, `print:text-black`).
