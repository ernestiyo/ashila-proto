import { useState, useRef, useEffect } from 'react';
import { Mic, Send, ArrowLeft, MessageCircle } from 'lucide-react';
import logoBandung from './assets/img/logobandung.png';
import avatarImg from './assets/img/avatar.png';
import './index.css';

// Translation Dictionary
const translations = {
  ID: {
    headerTitle: "Teh Indira",
    headerSubtitle: "Asisten Pintar Trans Metro Bandung",
    startPrompt: <>Katakan <strong>"Punten Teh"</strong> atau<br />ketuk tombol di bawah</>,
    startBtn: "Mulai Percakapan",
    closeBtn: "Tutup Chat",
    inputPlaceholder: "Ketik pertanyaan..",
    greeting: "Sampurasun! Saya Teh Indira. Ada yang bisa saya bantu mengenai Trans Metro Bandung hari ini?",
    fallback: "Hapunten Akang/Teteh, karena ini masih sistem prototype, saya belum mengerti maksud teks tersebut. 🙏\n\nTapi saya bisa bantu demo fitur:\n🚌 Cek jadwal bus\n📢 Lapor keluhan\n📍 Cari tempat wisata\n\nMangga, mau coba yang mana?",
    suggestions: [
      "Punten Teh 👋",
      "Bus ke Alun-Alun tiba jam berapa? 🕒",
      "Lapor Teh, AC di bus ini mati! 😡",
      "Mall terdekat dari sini mana? 🛍️"
    ]
  },
  EN: {
    headerTitle: "Teh Indira",
    headerSubtitle: "Trans Metro Bandung Smart Assistant",
    startPrompt: <>Say <strong>"Hello"</strong> or<br />tap the button below</>,
    startBtn: "Start Conversation",
    closeBtn: "Close Chat",
    inputPlaceholder: "Type a question..",
    greeting: "Hello! I am Teh Indira. How can I assist you with Trans Metro Bandung today?",
    fallback: "Sorry, since this is a prototype system, I didn't understand that text. 🙏\n\nBut I can demo these features:\n🚌 Check bus schedule\n📢 Report complaint\n📍 Find attractions\n\nPlease, which one would you like to try?",
    suggestions: [
      "Hello Teh 👋",
      "When does the bus to Alun-Alun arrive? 🕒",
      "Report, AC is broken! 😡",
      "Where is the nearest mall? 🛍️"
    ]
  }
};

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('ID'); // 'ID' or 'EN'
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[language]; // Current translation helper

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initial loading simulation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleStart = () => {
    setHasStarted(true);
    // Initial greeting from bot
    setTimeout(() => {
      addMessage({
        id: 1,
        text: t.greeting,
        sender: 'bot'
      });
    }, 500);
  };

  const addMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
  };

  // --- DEMO LOGIC ---
  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();

    // 1. Cultural / Personalization
    if (lowerText.includes('punten') || lowerText.includes('hello') || lowerText.includes('hi')) {
      return language === 'ID'
        ? "Mangga Akang/Teteh, wilujeng sumping! Aya nu tiasa dibantos ku Teh Indira? (Silakan, ada yang bisa dibantu?) 😊"
        : "Welcome! Is there anything I can help you with regarding Trans Metro Bandung? 😊";
    }

    // 2. Integration e-Lapor
    if (lowerText.includes('lapor') || lowerText.includes('rusak') || lowerText.includes('ac') || lowerText.includes('panas') || lowerText.includes('report') || lowerText.includes('broken')) {
      return language === 'ID'
        ? "Hapunten atas ketidaknyamananannya. 😔\n\nLaporan mengenai kondisi armada/fasilitas sudah saya catat dan teruskan ke sistem e-Lapor Terpadu TMB.\n\nNomor Tiket Laporan: #TMB-2026-XQCT\nTim teknis akan segera melakukan pengecekan."
        : "I apologize for the inconvenience. 😔\n\nYour report regarding the fleet/facility condition has been recorded and forwarded to the TMB Integrated e-Report system.\n\nTicket Number: #TMB-2026-XQCT\nOur technical team will check it immediately.";
    }

    // 3. Arrival Estimates
    if (lowerText.includes('kapan') || lowerText.includes('jam') || lowerText.includes('tiba') || lowerText.includes('bus') || lowerText.includes('when') || lowerText.includes('arrive')) {
      return language === 'ID'
        ? "Untuk rute Koridor 3 (Cicaheum - Sarijadi):\n\n🚌 Bus TMB K3-045\n📍 Posisi: H-2 dari halte keberangkatan\n⏱️ Estimasi tiba: 5 menit lagi\n\nSilakan bersiap di area tunggu ya! 🕒"
        : "For Route Corridor 3 (Cicaheum - Sarijadi):\n\n🚌 Bus TMB K3-045\n📍 Position: 2 stops away\n⏱️ ETA: 5 minutes\n\nPlease be ready at the waiting area! 🕒";
    }

    // 4. Point of Interest (POI)
    if (lowerText.includes('mall') || lowerText.includes('makan') || lowerText.includes('deket') || lowerText.includes('tujuan') || lowerText.includes('near') || lowerText.includes('where')) {
      return language === 'ID'
        ? "Dari lokasi Anda di Halte Merdeka, ada beberapa tempat menarik terdekat:\n\n🛍️ Bandung Indah Plaza (400m, jalan kaki 5 menit)\n🏢 Balai Kota Bandung (200m)\n☕ Jalan Braga (Area kuliner & foto)\n\nMau saya pandu rute ke salah satunya? 🗺️"
        : "From your location at Merdeka Stop, here are some nearby points of interest:\n\n🛍️ Bandung Indah Plaza (400m, 5 min walk)\n🏢 Bandung City Hall (200m)\n☕ Braga Street (Culinary & Photo area)\n\nWould you like directions to any of these? 🗺️";
    }

    // Default Fallback
    return t.fallback;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    processMessage(inputMessage);
    setInputMessage('');
  };

  const onChipClick = (text) => {
    processMessage(text);
  };

  const processMessage = (text) => {
    const userMsg = {
      id: Date.now(),
      text: text,
      sender: 'user'
    };

    addMessage(userMsg);
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      setIsTyping(false);
      const responseText = getBotResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot'
      };
      addMessage(botMsg);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <img src={logoBandung} alt="Logo" className="loading-logo" />
          <div className="loading-spinner"></div>
          <p>Memuat Asisten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <img src={logoBandung} alt="Logo Kota Bandung" className="header-logo" />
          <div className="header-divider"></div>
          <div className="header-text">
            <h1>{t.headerTitle}</h1>
            <p>{t.headerSubtitle}</p>
          </div>
        </div>
        <div className="header-right">
          <button
            className="lang-switch"
            onClick={() => setLanguage(prev => prev === 'ID' ? 'EN' : 'ID')}
          >
            <span className={language === 'ID' ? 'active' : ''}>ID</span>
            <span className={language === 'EN' ? 'active' : ''}>EN</span>
          </button>
        </div>
      </header>

      {/* Main Avatar Area */}
      <div className="avatar-container">
        <img src={avatarImg} alt="Teh Indira" className="avatar-image" />
        {/* Navy Overlay when chat is active */}
        <div className={`avatar-overlay ${hasStarted ? 'active' : ''}`}></div>
      </div>

      {/* Bottom Sheet / Interface */}
      <div className={`interface-layer ${hasStarted ? 'active' : 'idle'}`}>
        {!hasStarted ? (
          // IDLE STATE
          <div className="start-prompt glass-panel" onClick={handleStart}>
            <div className="audio-wave-icon">
              {/* Simple wave simulation */}
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <p>{t.startPrompt}</p>
            <button className="tap-to-start-btn">
              <MessageCircle size={18} />
              <span>{t.startBtn}</span>
            </button>
          </div>
        ) : (
          // ACTIVE CHAT STATE
          <div className="chat-interface">
            {/* Back Button (Improved) */}
            <button className="back-button glass-panel" onClick={() => setHasStarted(false)}>
              <ArrowLeft size={18} color="#333" />
              <span>{t.closeBtn}</span>
            </button>

            {/* Messages Area */}
            <div className="messages-area">
              {messages.map(msg => (
                <div key={msg.id} className={`message-bubble ${msg.sender} glass-panel`}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </div>
              ))}
              {isTyping && (
                <div className="message-bubble bot glass-panel typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="suggestions-container">
              {t.suggestions.map((s, idx) => (
                <button key={idx} className="chip glass-panel" onClick={() => onChipClick(s)}>
                  {s}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form className="input-area glass-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder={t.inputPlaceholder}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                type="submit"
                className="action-btn send"
                disabled={!inputMessage.trim()}
                style={{ opacity: inputMessage.trim() ? 1 : 0.4, cursor: inputMessage.trim() ? 'pointer' : 'default' }}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
