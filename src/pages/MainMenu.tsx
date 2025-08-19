import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../components/ui/Button/Button';
import {Modal} from '../components/ui/Modal/Modal';
import {Selection} from '../components/ui/Selection/Selection';
import {gameActions} from '../state/gameSlice';
import type {AppDispatch, RootState} from '../state/store';

export function MainMenu() {

  const dispatch = useDispatch<AppDispatch>();

  const theme = useSelector((state: RootState)=> state.game.settings.theme);
  const numberOfPlayers = useSelector((state: RootState)=> state.game.settings.numberOfPlayers);
  const gridSize = useSelector((state: RootState)=> state.game.settings.gridSize);

  return (
    <>
      <div className='absolute w-full h-full bg-deep-navy'></div>
      <Modal isOpen={true} hasBackdrop={false}>
        <div className='flex flex-col items-center gap-[45px] tablet:gap-[78px] max-w-[327px] tablet:max-w-[654px] w-full'>
          <div className='text-white text-[2rem] tablet:text-[2.5rem] leading-[40px] tablet:leading-[50px] font-bold'>memory</div>
          <div className='flex flex-col gap-[32px] tablet:gap-[33px] p-[24px] tablet:p-[56px] bg-off-white w-full rounded-[10px]'>
            <div className='flex flex-col gap-[24px]'>
              <div className='flex flex-col gap-[11px] tablet:gap-[16px]'>
                <div className='text-[0.9375rem] leading-[19px] tablet:text-[1.25rem] tablet:leading-[25px] text-slate-blue font-bold'>Select Theme</div>
                <div className='flex gap-[11px] tablet:gap-[30px]'>
                  <Selection isActive={theme === 'numbers'} className='w-full' onClick={() => dispatch(gameActions.setTheme({theme: 'numbers'}))}>Numbers</Selection>
                  <Selection isActive={theme === 'icons'} className='w-full' onClick={() => dispatch(gameActions.setTheme({theme: 'icons'}))}>Icons</Selection>
                </div>
              </div>
              <div className='flex flex-col gap-[11px] tablet:gap-[16px]'>
                <div className='text-[0.9375rem] leading-[19px] tablet:text-[1.25rem] tablet:leading-[25px] text-slate-blue font-bold'>Numbers of Players</div>
                <div className='flex gap-[11px] tablet:gap-[20px]'>
                  <Selection isActive={numberOfPlayers === 1} className='w-full' onClick={() => dispatch(gameActions.setNumberOfPlayers({numberOfPlayers: 1}))}>1</Selection>
                  <Selection isActive={numberOfPlayers === 2} className='w-full' onClick={() => dispatch(gameActions.setNumberOfPlayers({numberOfPlayers: 2}))}>2</Selection>
                  <Selection isActive={numberOfPlayers === 3} className='w-full' onClick={() => dispatch(gameActions.setNumberOfPlayers({numberOfPlayers: 3}))}>3</Selection>
                  <Selection isActive={numberOfPlayers === 4} className='w-full' onClick={() => dispatch(gameActions.setNumberOfPlayers({numberOfPlayers: 4}))}>4</Selection>
                </div>
              </div>
              <div className='flex flex-col gap-[11px] tablet:gap-[16px]'>
                <div className='text-[0.9375rem] leading-[19px] tablet:text-[1.25rem] tablet:leading-[25px] text-slate-blue font-bold'>Grid Size</div>
                <div className='flex gap-[11px] tablet:gap-[30px]'>
                  <Selection isActive={gridSize === 4} className='w-full' onClick={() => dispatch(gameActions.setGridSize({gridSize: 4}))}>4x4</Selection>
                  <Selection isActive={gridSize === 6} className='w-full' onClick={() => dispatch(gameActions.setGridSize({gridSize: 6}))}>6x6</Selection>
                </div>
              </div>
            </div>
            <Button size='big' className='w-full'>Start Game</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
