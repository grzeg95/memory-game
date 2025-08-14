import {type ReactNode, useEffect, useRef, useState} from 'react';
import { ModalContext } from './ModalContext';

type DialogProviderProps = {
  children: ReactNode;
}

export function ModalProvider({ children }: DialogProviderProps) {

  const [hasOverlayContainer, setHasOverlayContainer] = useState(false);
  const openedModals = useRef(0);
  const htmlRef = useRef(document.documentElement);
  const bodyRef = useRef(document.body);
  const windowRef = useRef(window);

  useEffect(() => {

    let overlayContainer = document.getElementById('overlay-container');

    if (!overlayContainer) {
      overlayContainer = document.createElement('div');
      overlayContainer.id = 'overlay-container';
      overlayContainer.classList.add('pointer-events-none', 'top-[0]', 'left-[0]', 'h-full', 'w-full', 'fixed');
      bodyRef.current.appendChild(overlayContainer);
    }

    setHasOverlayContainer(true);
  }, []);

  function registerModal() {

    if (openedModals.current === 0) {
      const scrollWidth = windowRef.current.innerWidth - bodyRef.current.offsetWidth;
      bodyRef.current.style.paddingRight = scrollWidth + 'px';
      htmlRef.current.style.overflow = 'hidden';
    }

    openedModals.current++;
  }

  function unregisterModal() {

    openedModals.current--;

    if (openedModals.current === 0) {
      bodyRef.current.style.paddingRight = '';
      htmlRef.current.style.overflow = '';
    }
  }

  return (
    <ModalContext.Provider value={{registerModal, unregisterModal, hasOverlayContainer}}>
      {children}
    </ModalContext.Provider>
  );
}
