import {cva} from 'class-variance-authority';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gameActions} from '../../state/gameSlice';
import {pagesActions} from '../../state/pagesSlice';
import type {AppDispatch, RootState} from '../../state/store';
import {timerFormater} from '../../utils/timerFormater';
import {Button} from '../ui/Button/Button';
import {Modal} from '../ui/Modal/Modal';
import {ScoreCard} from '../stats/ScoreCard';

const modalContentStyles = cva([
  'flex', 'flex-col', 'gap-[16px]', 'p-[24px]', 'bg-off-white', 'rounded-[10px]', 'max-w-[327px]', 'w-full', 'overflow-auto',
  'tablet:max-w-[654px]', 'tablet:gap-[40px]',
]);

const scoreCardsStyles = cva([
  'flex', 'flex-col', 'gap-[8px]'
]);

export function GameOverModal() {

  const dispatch = useDispatch<AppDispatch>();
  const numberOfPlayers = useSelector((state: RootState) => state.game.settings.numberOfPlayers);
  const playersScores = useSelector((state: RootState) => state.game.game.playersScores);
  const numberOfMoves = useSelector((state: RootState) => state.game.game.numberOfMoves);
  const elapsed = useSelector((state: RootState) => state.game.game.timer.elapsed);
  const [isOpened, setIsOpened] = useState(true);

  const maxScore = Math.max(...playersScores);

  const scores = playersScores.map((score, index) => ({
    score,
    playerIndex: index,
    winner: maxScore === score
  })).sort((a, b) => {
    return b.score - a.score || a.playerIndex - b.playerIndex;
  });

  const winners = scores.filter((score) => score.winner);
  const oneWinnerIndex = winners.length === 1 ? winners[0].playerIndex : -1;

  function handleRestartGame() {
    setIsOpened(false);
    setTimeout(() => {
      dispatch(gameActions.initializeGame());
    });
  }

  function handleSetupNewGame() {
    setIsOpened(false);
    setTimeout(() => {
      dispatch(pagesActions.setPage({page: 'MainMenu'}));
    });
  }

  return (
    <Modal isOpen={isOpened} onClose={() => setIsOpened(false)}>
      <div className={modalContentStyles()}>

        <div className='flex flex-col gap-[9px] items-center tablet:gap-[16px]'>
          <div className="text-[24px] leading-[30px] text-deep-navy tablet:text-[40px] tablet:leading-[60px]">
            { numberOfPlayers === 1 ? 'You did it!' : oneWinnerIndex === -1 ? 'It’s a tie!' : `Player ${oneWinnerIndex} Wins!` }
          </div>
          <div className="text-[14px] leading-[17px] text-slate-blue tablet:text-[18px] tablet:leading-[22px]">
            Game over! Here are the results...
          </div>
        </div>

        {
          numberOfPlayers === 1 ? (
            <div className={scoreCardsStyles()}>
              <ScoreCard title='Time Elapsed' value={timerFormater(elapsed)} />
              <ScoreCard title='Moves Taken' value={numberOfMoves} />
            </div>
          ) : (
            <div className={scoreCardsStyles()}>
              {scores.map((score, index) => (
                <ScoreCard
                  key={index}
                  title={`Player ${score.playerIndex + 1}${score.winner ? ' (Winner!)' : ''}`}
                  value={`${score.score} Pairs`}
                  highlighted={score.winner}
                />
              ))}
            </div>
          )
        }

        <div className='flex flex-col gap-[16px] tablet:flex-row tablet:gap-[14px]'>
          <Button className='w-full' onClick={() => handleRestartGame()}>Restart</Button>
          <Button appearance='secondary' className='w-full' onClick={() => handleSetupNewGame()}>Setup New Game</Button>
        </div>
      </div>
    </Modal>
  )
}
