import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../aiAssistant.css';
import { assets } from '../assets/assets';

const CHAT_STORAGE_KEY = 'ai-assistant-chats-v1';

function loadChats() {
  try {
    const data = localStorage.getItem(CHAT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
function saveChats(chats) {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
}

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chats, setChats] = useState(loadChats()); // [{id, title, history: [{role, content}]}]
  const [activeChatIdx, setActiveChatIdx] = useState(chats.length ? 0 : -1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const chatEndRef = useRef(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // On first load, if no chats exist, create a new chat
  useEffect(() => {
    if (chats.length === 0) {
      setChats([{ id: Date.now(), title: 'New Chat', history: [] }]);
      setActiveChatIdx(0);
    }
    // eslint-disable-next-line
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    saveChats(chats);
  }, [chats]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChatIdx, chats, loading]);

  // Filter chats based on search query
  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Start a new chat
  const handleNewChat = () => {
    setChats(prev => [{ id: Date.now(), title: 'New Chat', history: [] }, ...prev]);
    setActiveChatIdx(0);
    setInput('');
    setError('');
  };

  // Switch to a previous chat
  const handleSelectChat = idx => {
    setActiveChatIdx(idx);
    setInput('');
    setError('');
  };

  // Update chat title (first user message)
  const updateChatTitle = (idx, firstMsg) => {
    setChats(prev => prev.map((c, i) => i === idx ? { ...c, title: firstMsg.slice(0, 32) || 'New Chat' } : c));
  };

  // Send a message in the current chat
  const handleSend = async () => {
    if (!input.trim() || activeChatIdx === -1) return;
    setLoading(true);
    setError('');
    const newHistory = [...chats[activeChatIdx].history, { role: 'user', content: input }];
    // Update chat history
    setChats(prev => prev.map((c, i) => i === activeChatIdx ? { ...c, history: newHistory } : c));
    setInput('');
    try {
      // Send the full chat history as context (user/ai turns)
      const contextText = newHistory
        .map(msg => (msg.role === 'user' ? `User: ${msg.content}` : `AI: ${msg.content}`))
        .join('\n');
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ question: contextText }),
      });
      const data = await response.json();
      if (response.ok && data.answer) {
        setChats(prev => prev.map((c, i) =>
          i === activeChatIdx ? { ...c, history: [...c.history, { role: 'ai', content: data.answer }] } : c
        ));
        // Set chat title if it's still 'New Chat'
        if (newHistory.length === 1) updateChatTitle(activeChatIdx, input);
      } else {
        setError(data.answer || 'No answer received from server');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Current chat history
  const currentHistory = activeChatIdx !== -1 ? chats[activeChatIdx].history : [];

  // Delete a chat
  const handleDeleteChat = (idx, e) => {
    e.stopPropagation();
    setChats(prev => {
      const newChats = prev.filter((_, i) => i !== idx);
      // If the deleted chat was active, switch to next or clear
      if (idx === activeChatIdx) {
        if (newChats.length === 0) {
          setActiveChatIdx(-1);
        } else if (idx === 0) {
          setActiveChatIdx(0);
        } else {
          setActiveChatIdx(idx - 1);
        }
      } else if (idx < activeChatIdx) {
        setActiveChatIdx(activeChatIdx - 1);
      }
      return newChats;
    });
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="ai-app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">InternLink AI</span>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(true)}
            title="Collapse sidebar"
          >
            ←
          </button>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">Chats</div>
          <button className="new-chat-btn" onClick={handleNewChat}>+ New chat</button>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <ul className="sidebar-list">
            {filteredChats.map((chat, idx) => {
              const originalIdx = chats.findIndex(c => c.id === chat.id);
              return (
                <li
                  key={chat.id}
                  className={originalIdx === activeChatIdx ? 'active' : ''}
                  onClick={() => handleSelectChat(originalIdx)}
                  title={chat.title}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.title}</span>
                  <button
                    className="delete-chat-btn"
                    title="Delete chat"
                    onClick={e => handleDeleteChat(originalIdx, e)}
                    style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="7" width="14" height="12" rx="2" fill="#e57373"/><rect x="9" y="3" width="6" height="2" rx="1" fill="#e57373"/><rect x="7" y="7" width="10" height="2" rx="1" fill="#fff"/><rect x="10" y="10" width="1.5" height="5" rx="0.75" fill="#fff"/><rect x="12.5" y="10" width="1.5" height="5" rx="0.75" fill="#fff"/></svg>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`main-content chat-mode ${sidebarCollapsed ? 'expanded' : ''}`}>
        {/* Top Bar */}
        <header className="top-bar">
          {sidebarCollapsed && (
            <button 
              className="sidebar-expand-btn"
              onClick={() => setSidebarCollapsed(false)}
              title="Expand sidebar"
            >
              →
            </button>
          )}
          <span className="brand">Linky</span>
          <span className="ai-label">AI Assistant</span>
          <span className="user-icon"> <svg height="32" width="32" viewBox="0 0 32 32"><circle cx="16" cy="12" r="8" fill="#bcd6ff"/><ellipse cx="16" cy="28" rx="12" ry="6" fill="#eaf2ff"/></svg> </span>
          <button
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>
        {/* Chat Area */}
        <div className="chat-area" style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {currentHistory.length === 0 && (
            <div className="chat-welcome" style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div className="assistant-illustration">
                <img src={assets.LinkyImg} alt="Linky, the AI Intern Buddy" style={{ width: 600, maxWidth: '90vw', height: 'auto', display: 'block' }} />
              </div>
            </div>
          )}
          <div className="chat-history chat-bubbles">
            {currentHistory.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}> 
                <div className="bubble-avatar">
                  {msg.role === 'user' ? (
                    <svg height="32" width="32" viewBox="0 0 32 32"><circle cx="16" cy="12" r="8" fill="#bcd6ff"/><ellipse cx="16" cy="28" rx="12" ry="6" fill="#eaf2ff"/></svg>
                  ) : (
                    <img src={assets.AiAvatar} alt="AI Assistant Avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                  )}
                </div>
                <div className="bubble-content">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-bubble ai">
                <div className="bubble-avatar">
                  <svg height="32" width="32" viewBox="0 0 32 32"><circle cx="16" cy="12" r="8" fill="#3a7be0"/><ellipse cx="16" cy="28" rx="12" ry="6" fill="#eaf2ff"/></svg>
                </div>
                <div className="bubble-content loading">Thinking...</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {error && <div className="error">{error}</div>}
        </div>
        {/* Bottom Input Bar */}
        <footer className="bottom-bar">
          <input
            className="chat-input"
            placeholder="Ask anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={loading || activeChatIdx === -1}
          />
          <button className="send-btn" aria-label="Send" onClick={handleSend} disabled={loading || !input.trim() || activeChatIdx === -1}>
            <svg height="24" width="24" viewBox="0 0 24 24"><path d="M2 21l21-9-21-9v7l15 2-15 2z" fill="#5b9bff"/></svg>
          </button>
        </footer>
        <div className="disclaimer">InternLink AI Assistant may produce inaccurate information about internships or companies.</div>
      </div>
    </div>
  );
}

export default App;
