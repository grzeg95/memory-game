import {type ReactNode, type RefObject, useEffect, useImperativeHandle, useRef} from 'react';
import {createPortal} from 'react-dom';
import {useFocusTrap} from '../../../hooks/useFocusTrap';
import {mutationObserverScrollVisibility} from '../../../utils/mutationObserverScrollVisibility';
import {updateScrollVisibility} from '../../../utils/updateScrollVisibility';

let dialogIdCounter = 0;
const dialogStack: number[] = [];

export type DialogRef = {
  close: () => void;
};

export type DialogProps = {
  children: ReactNode;
  onClose?: (event: number | string | object | null | undefined) => void;
  isOpen: boolean;
  ref?: RefObject<DialogRef | null> | null;
  closeOnBackdropClick?: boolean;
  hasBackdrop?: boolean;
}

export function Dialog({children, onClose, isOpen, closeOnBackdropClick = true, hasBackdrop = true, ref}: DialogProps) {

  const dialogId = useRef(-1);

  const trapRef = useFocusTrap({
    active: isOpen
  });

  useImperativeHandle(ref, () => {
    return {
      close() {
        onClose?.(undefined);
      }
    };
  }, [onClose]);

  function isFirstDialog() {
    return dialogStack.indexOf(dialogId.current) === 0;
  }

  useEffect(() => {

    if (isOpen) {

      dialogId.current = ++dialogIdCounter;
      dialogStack.push(dialogIdCounter);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.(undefined);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      let observer: MutationObserver;

      if (isFirstDialog()) {
        updateScrollVisibility();
        window.addEventListener('resize', updateScrollVisibility);
        observer = new MutationObserver(mutationObserverScrollVisibility);
        observer.observe(document.body, {childList: true, subtree: true});
      }

      return () => {

        if (isFirstDialog()) {
          window.removeEventListener('resize', updateScrollVisibility);
          document.body.style.paddingRight = '0px';
          document.body.style.overflow = 'auto';
          document.body.style.overflow = 'auto';
          observer?.disconnect();
        }

        window.removeEventListener('keydown', handleKeyDown);

        const index = dialogStack.indexOf(dialogIdCounter);
        dialogStack.splice(index, 1);

        if (dialogStack.length === 0) {
          dialogIdCounter = 0;
        }
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {

    if (!isOpen) {
      onClose?.(undefined);
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
    {hasBackdrop && <div className='absolute inset-0 pointer-events-auto bg-[rgba(0,0,0,0.5)]' onClick={() => closeOnBackdropClick && onClose?.(undefined)}/>}
      <div className='absolute z-[1000] flex justify-center items-center pointer-events-none top-0 left-0 h-full w-full'>
        <div className='absolute z-[1000] flex justify-center max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] pointer-events-auto' ref={trapRef}>
          {children}
        </div>
      </div>
    </>
    , document.getElementById('overlay-root')!);
}
