import { useCallback, useEffect } from 'react';

function useClosePopup({ onClose, isOpen }) {
  const handleOnClose = useCallback(
    (evt) => {
      if (evt.target === evt.currentTarget || evt.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleOnClose);
    }

    return () => {
      document.removeEventListener('keydown', handleOnClose);
    };
  }, [isOpen, handleOnClose]);

  return handleOnClose;
}

export { useClosePopup };
