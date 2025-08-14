import {useSelector} from 'react-redux';
import {MainMenu} from './pages/MainMenu';
import type {RootState} from './state/store';

export function App() {

  const page = useSelector((state: RootState)=> state.pages.page);

  return (
    <>
      {page === 'MainMenu' && <MainMenu/>}
    </>
  )
}
