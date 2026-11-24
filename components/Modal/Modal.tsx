'use client';

import css from './Modal.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const router = useRouter();

  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        router.back();
      }
    };

    window.addEventListener('keydown', escHandler);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', escHandler);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>Close</button>
      {children}
      </div>
    </div>
  );
}