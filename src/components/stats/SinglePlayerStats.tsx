import {cva} from 'class-variance-authority';
import {useSelector} from 'react-redux';
import type {RootState} from '../../state/store';
import {SinglePlayerStatTimer} from './SinglePlayerStatTimer';

const statsStyles = cva([
  'flex gap-[25px]', 'w-full', 'max-w-[327px]',
  'tablet:max-w-[540px]'
]);

const cardStyles = cva([
  'flex', 'flex-col', 'justify-center', 'items-center', 'h-[70px]', 'w-full', 'bg-[#DFE7EC]', 'rounded-[10px]',
  'tablet:flex-row', 'tablet:justify-between', 'tablet:px-[24px]'
]);

const cardTitleStyles = cva([
  'text-[15px]', 'leading-[19px]', 'text-slate-blue',
  'tablet:text-[18px]', 'tablet:leading-[22px]'
]);

const cardValueStyles = cva([
  'text-[24px]', 'leading-[30px]', 'mt-[2px]', 'text-midnight-blue',
  'tablet:text-[32px]', 'tablet:leading-[40px]', 'tablet:mt-[0]'
]);

export function SinglePlayerStats() {

  const numberOfMoves = useSelector((state: RootState)=> state.game.game.numberOfMoves);

  return (
    <div className={statsStyles()}>
      <div className={cardStyles()}>
        <div className={cardTitleStyles()}>Time</div>
        <div className={cardValueStyles()}>
          <SinglePlayerStatTimer/>
        </div>
      </div>
      <div className={cardStyles()}>
        <div className={cardTitleStyles()}>Moves</div>
        <div className={cardValueStyles()}>{numberOfMoves}</div>
      </div>
    </div>
  )
}
