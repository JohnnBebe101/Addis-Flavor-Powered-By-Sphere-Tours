/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGlobalDark?: boolean;
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  isGlobalDark = false,
  children,
  className = '',
  maxWidth = 'max-w-xl',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div
        className={`relative w-full ${maxWidth} rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 ${isGlobalDark ? 'bg-dark-bg text-linen-white border-linen-white/15' : 'bg-linen-white text-teal border-teal/10'} ${className}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isGlobalDark ? 'bg-white/5 hover:bg-white/10 text-linen-white' : 'bg-black/5 hover:bg-black/10 text-teal'}`}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
