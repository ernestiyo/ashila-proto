import { useState, useRef, useEffect } from 'react';
import { Mic, Send, ArrowLeft, MessageCircle } from 'lucide-react';
import logoBandung from './assets/img/logobandung.png';
import avatarImg from './assets/img/avatar.png';
import './index.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('ID'); // 'ID' or 'EN'

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleStart = () => {
    setHasStarted(true);
    // Initial greeting from bot
    setTimeout(() => {
      addMessage({
        id: 1,
        text: "Sampurasun! Saya Teh Indira. Ada yang bisa saya bantu mengenai Trans Metro Bandung?",
        sender: 'bot'
      });
    }, 500);
  };

  const addMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    };

    addMessage(userMsg);
    setInputMessage('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        text: "Maaf, karena ini masih prototype, saya belum bisa terhubung ke database TMB secara real-time. Tapi tampilan saya sudah mirip kan? 😊",
        sender: 'bot'
      };
      addMessage(botMsg);
    }, 1500);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <img src={logoBandung} alt="Logo Kota Bandung" className="header-logo" />
          <div className="header-divider"></div>
          <div className="header-text">
            <h1>Teh Indira</h1>
            <p>Asisten Pintar Trans Metro Bandung</p>
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
            <p>Katakan <strong>"Punten Teh"</strong> atau<br />ketuk tombol di bawah</p>
            <button className="tap-to-start-btn">
              <MessageCircle size={18} />
              <span>Mulai Percakapan</span>
            </button>
          </div>
        ) : (
          // ACTIVE CHAT STATE
          <div className="chat-interface">
            {/* Back Button (Improved) */}
            <button className="back-button glass-panel" onClick={() => setHasStarted(false)}>
              <ArrowLeft size={18} color="#333" />
              <span>Tutup Chat</span>
            </button>

            {/* Messages Area */}
            <div className="messages-area">
              {messages.map(msg => (
                <div key={msg.id} className={`message-bubble ${msg.sender} glass-panel`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="message-bubble bot glass-panel typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form className="input-area glass-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Ketik pertanyaan.."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              {inputMessage.trim() ? (
                <button type="submit" className="action-btn send">
                  <Send size={20} />
                </button>
              ) : (
                <button type="button" className="action-btn mic">
                  <Mic size={20} />
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
