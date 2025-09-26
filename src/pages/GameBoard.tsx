import {cva} from 'class-variance-authority';
import {useSelector} from 'react-redux';
import {BoardNav} from '../components/board/BoardNav';
import {MultiPlayerStats} from '../components/stats/MultiPlayerStats';
import {GameOverDialog} from '../components/dialogs/GameOverDialog';
import {SinglePlayerStats} from '../components/stats/SinglePlayerStats';
import {Tiles} from '../components/board/Tiles';
import type {RootState} from '../state/store';

const gameBoardStyles = cva([
  'flex', 'flex-col', 'justify-between', 'items-center', 'm-auto', 'min-h-[100vh]', 'max-w-[327px]', 'py-[24px]',
  'tablet:max-w-[689px]', 'tablet:py-[37px]',
  'desktop:max-w-[1110px]', 'desktop:py-[67px]'
]);

export function GameBoard() {

  const numberOfPlayers = useSelector((state: RootState) => state.game.settings.numberOfPlayers);
  const isOver = useSelector((state: RootState) => state.game.game.isOver);

  return (
    <>
      <div
        className={gameBoardStyles()}>
        <BoardNav/>
        <Tiles/>
        {numberOfPlayers === 1 ? <SinglePlayerStats/> : <MultiPlayerStats/>}
      </div>
      {isOver && <GameOverDialog/>}
    </>
  );
}
