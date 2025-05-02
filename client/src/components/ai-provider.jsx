import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets'


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

const popupStyle = {
  position: 'fixed',
  bottom: '6rem',
  right: '2rem',
  background: 'white',
  padding: '1rem',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  zIndex: 1000,
  maxWidth: '250px',
  animation: 'fadeIn 0.3s ease-in-out',
};

const popupArrowStyle = {
  position: 'absolute',
  bottom: '-8px',
  right: '20px',
  width: '0',
  height: '0',
  borderLeft: '8px solid transparent',
  borderRight: '8px solid transparent',
  borderTop: '8px solid white',
};

const popupTextStyle = {
  margin: 0,
  color: '#1f2937',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
};

export default function ChatbotIcon() {
  const [hover, setHover] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reset popup when location changes
    setShowPopup(true);
    
    // Show popup for 10 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Reset when path changes

  const handleClick = () => {
    navigate('/ai-assistant');
  };

  return (
    <>
      {showPopup && (
        <div style={popupStyle}>
          <p style={popupTextStyle}>Hi, I'm Linky! I can support you with your internship journey.</p>
          <div style={popupArrowStyle} />
        </div>
      )}
      <button
        aria-label="Open chat assistant"
        style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
      >
        <img src={assets.AiAvatar} alt="Linky" style={{ width: '40px', height: '40px' }} />
        </button>
    </>
  );
} 