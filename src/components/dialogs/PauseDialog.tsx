import {cva} from 'class-variance-authority';
import {useDispatch} from 'react-redux';
import {gameActions} from '../../state/gameSlice';
import {pagesActions} from '../../state/pagesSlice';
import type {AppDispatch} from '../../state/store';
import {Button} from '../ui/Button/Button';
import {Dialog} from '../ui/Dialog/Dialog';

const modalContentStyles = cva([
  'flex', 'flex-col', 'gap-[16px]', 'p-[24px]', 'bg-off-white', 'rounded-[10px]', 'w-[327px]', 'w-full', 'overflow-auto',
  'tablet:max-w-[654px]', 'tablet:gap-[25px]'
]);

type PauseDialog = {
  onClose: (event: number | string | object | null | undefined) => void;
  isOpen: boolean;
}

export function PauseModal({onClose, isOpen}: PauseDialog) {

  const dispatch = useDispatch<AppDispatch>();

  function close() {
    onClose(undefined);
  }

  function handleResumeGame() {
    close();
  }

  function handleNewGame() {

    close();

    setTimeout(() => {
      dispatch(pagesActions.setPage({page: 'MainMenu'}));
    });
  }

  function handleRestartGame() {
    close();

    setTimeout(() => {
      dispatch(gameActions.initializeGame());
      dispatch(gameActions.setTimerState({state: 'restart'}));
    });
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className={modalContentStyles()}>
        <Button size='big' className='w-full' onClick={() => handleRestartGame()}>
          Restart
        </Button>
        <Button size='big' appearance='secondary' className='w-full' onClick={() => handleNewGame()}>
          New Game
        </Button>
        <Button size='big' appearance='secondary' className='w-full' onClick={() => handleResumeGame()}>
          Resume Game
        </Button>
      </div>
    </Dialog>
  )
}
