import React from 'react';
import { useNavigate } from 'react-router-dom';

const buttonStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    cursor: 'pointer',
    zIndex: 1000,
    transition: 'background 0.2s',
};

const buttonHoverStyle = {
    background: 'linear-gradient(135deg, #2563eb, #1e40af)',
};

export default function ChatbotIcon() {
    const [hover, setHover] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/ai-assistant');
    };

    return (
        <button
            aria-label="Open chat assistant"
            style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
        >
            <span role="img" aria-label="Chatbot">💬</span>
        </button>
    );
} 