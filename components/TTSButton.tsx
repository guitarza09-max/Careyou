
import React, { useState } from 'react';
import { speakText } from '../services/geminiService';

interface Props {
  text: string;
  className?: string;
}

const TTSButton: React.FC<Props> = ({ text, className = "" }) => {
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    if (loading) return;
    setLoading(true);
    await speakText(text);
    setLoading(false);
  };

  return (
    <button 
      onClick={handleSpeak}
      disabled={loading}
      className={`inline-flex items-center justify-center p-2 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors disabled:opacity-50 ${className}`}
      title="อ่านข้อความนี้"
    >
      <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-volume-up'}`}></i>
    </button>
  );
};

export default TTSButton;
