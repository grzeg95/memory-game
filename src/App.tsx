import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GameBoard} from './pages/GameBoard';
import {MainMenu} from './pages/MainMenu';
import {gameActions} from './state/gameSlice';
import type {AppDispatch, RootState} from './state/store';

export function App() {

  const page = useSelector((state: RootState)=> state.pages.page);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(gameActions.initializeGame());
  }, [dispatch]);

  return (
    <>
      {page === 'MainMenu' && <MainMenu/>}
      {page === 'GameBoard' && <GameBoard/>}
    </>
  )
}
