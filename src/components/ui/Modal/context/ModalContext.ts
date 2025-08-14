import {createContext} from 'react';

export const ModalContext = createContext<{
  registerModal: () => void,
  unregisterModal: () => void,
  hasOverlayContainer: boolean
}>({
  registerModal: () => {},
  unregisterModal: () => {},
  hasOverlayContainer: false
});


