import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {gameActions} from '../../state/gameSlice';
import {pagesActions} from '../../state/pagesSlice';
import type {AppDispatch} from '../../state/store';
import {PauseModal} from '../modals/PauseModal';
import {Button} from '../ui/Button/Button';

export function BoardNav() {

  const dispatch = useDispatch<AppDispatch>();
  const [pauseModalIsOpen, setPauseModalIsOpen] = useState(false);

  useEffect(() => {
    if (pauseModalIsOpen) {
      dispatch(gameActions.pauseTimer());
    } else {
      dispatch(gameActions.resumeTimer());
    }
  }, [dispatch, pauseModalIsOpen]);

  function handleRestartGame() {
    dispatch(gameActions.initializeGame());
    dispatch(gameActions.setTimerState({state: 'restart'}));
  }

  function handleNewGame() {
    dispatch(pagesActions.setPage({page: 'MainMenu'}));
  }

  return (
    <>
      <nav className="flex justify-between align-items-center w-full">
        <div className='text-deep-navy text-[1.5rem] leading-[30px] tablet:text-[2.5rem] tablet:leading-[50px] font-bold'>memory</div>
        <div className='gap-[16px] hidden tablet:flex'>
          <Button appearance='secondary' onClick={() => setPauseModalIsOpen(true)}>Pause</Button>
          <Button onClick={handleRestartGame}>Restart</Button>
          <Button appearance='secondary' onClick={handleNewGame}>New Game</Button>
        </div>
        <Button appearance='secondary' className='tablet:hidden' onClick={() => setPauseModalIsOpen(true)}>Pause</Button>
      </nav>
      {pauseModalIsOpen && <PauseModal onClose={() => setPauseModalIsOpen(false)} />}
    </>
  );
}
