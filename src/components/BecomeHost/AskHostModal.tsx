/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import cookingClassImg from '../../assets/images/addis_cooking_class_1782233734033.jpg';
import content from '../../content/become-host.json';

interface AskHostModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGlobalDark: boolean;
}

export function AskHostModal({ isOpen, onClose, isGlobalDark }: AskHostModalProps) {
  const [userQuestion, setUserQuestion] = useState('');
  const [isQuestionSent, setIsQuestionSent] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const closeModal = () => {
    onClose();
    setTimeout(() => {
      setUserQuestion('');
      setIsQuestionSent(false);
      setShowReply(false);
    }, 300);
  };

  const handleAskSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      setIsQuestionSent(true);
      setTimeout(() => setShowReply(true), 1200);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 ${isGlobalDark ? 'bg-dark-bg text-linen-white border-linen-white/15' : 'bg-linen-white text-teal border-teal/10'}`}>
        <button onClick={closeModal} className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isGlobalDark ? 'bg-white/5 hover:bg-white/10 text-linen-white' : 'bg-black/5 hover:bg-black/10 text-teal'}`}>
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img src={cookingClassImg} alt="Mimi Super Host" className="w-12 h-12 rounded-full object-cover border-2 border-gold" referrerPolicy="no-referrer" />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-linen-white rounded-full" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-coffee-red leading-tight">{content.askTitle}</h3>
              <p className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold">Super Host (150+ Sessions)</p>
            </div>
          </div>
          <p className="text-xs opacity-75 mb-6">{content.askSub}</p>
          {!isQuestionSent ? (
            <form onSubmit={handleAskSubmit} className="space-y-4">
              <textarea required rows={4} value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} placeholder={content.askPlaceholder} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'}`} />
              <button type="submit" className="w-full py-3 bg-gold text-teal font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gold/90 transition-all duration-300">
                {content.sendMsg}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end animate-fadeIn">
                <div className="bg-coffee-red text-linen-white px-4 py-2.5 rounded-2xl rounded-tr-none text-xs max-w-[85%] shadow">{userQuestion}</div>
              </div>
              {!showReply && (
                <div className="flex items-center space-x-2 animate-pulse mt-2 pl-2 text-gold">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold pl-1">Mimi is typing...</span>
                </div>
              )}
              {showReply && (
                <div className="space-y-4 pt-2 border-t border-current/10 animate-scaleIn">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gold font-bold">{content.replyTitle}</h4>
                  <div className={`p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed shadow border ${isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/20 border-teal/5'}`}>
                    {content.replyText}
                  </div>
                  <div className="pt-2 text-center">
                    <button onClick={closeModal} className="px-6 py-2 bg-teal text-linen-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-teal/90 transition-all">
                      {content.closeBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}