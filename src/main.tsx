import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux';
import {App} from './App.tsx'
import {ModalProvider} from './components/ui/Modal/context/ModalProvider';
import {BreakpointsProvider} from './context/breakpoints/BreakpointsProvider';
import {store} from './state/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BreakpointsProvider>
        <ModalProvider>
          <App/>
        </ModalProvider>
      </BreakpointsProvider>
    </Provider>
  </StrictMode>,
)
