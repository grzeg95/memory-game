import {type ReactNode, useContext, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {ModalContext} from './context/ModalContext';

function useModal() {

  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('useModal must be used within the ModalProvider');
  }

  return modalContext;
}

type ModalProps = {
  children?: ReactNode;
  isOpen: boolean;
  onClose?: (event: number | string | object | null | undefined) => void;
  hasBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
}

export function Modal({
  children,
  onClose,
  isOpen,
  hasBackdrop = true,
  closeOnBackdropClick = true
}: ModalProps) {

  const {registerModal, unregisterModal, hasOverlayContainer} = useModal();
  const registered = useRef(false);

  useEffect(() => {
    if (isOpen && !registered.current) {
      registerModal();
      registered.current = true;
    }
    if (!isOpen && registered.current) {
      unregisterModal();
      registered.current = false;
    }
  }, [isOpen, registerModal, unregisterModal, registered]);

  if (!isOpen || !hasOverlayContainer) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={`absolute top-[0] left-[0] bottom-[0] right-[0] pointer-events-auto z-[1000] ${hasBackdrop ? 'bg-black/50' : ''}`}
        onClick={() => closeOnBackdropClick && onClose?.(undefined)}>
      </div>
      <div className={'absolute top-[0] left-[0] h-full w-full flex justify-center items-center pointer-events-none'}>
        <div className={'absolute pointer-events-auto flex flex-col items-center z-[1000] max-w-[calc(100%-24px)] tablet:max-w-[calc(100%-57px)] max-h-full w-full'}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('overlay-container')!
  );
}
