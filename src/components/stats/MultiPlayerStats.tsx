import {cva} from 'class-variance-authority';
import {useSelector} from 'react-redux';
import {BreakpointsDevices} from '../../context/breakpoints/breakpoints';
import {useBreakpoints} from '../../context/breakpoints/useBreakpoints';
import type {RootState} from '../../state/store';

const statsStyles = cva([
  'flex gap-[24px]', 'w-full', 'max-w-[327px]',
  'tablet:max-w-[689px]'
]);

const cardStyles = cva([
  'flex', 'flex-col', 'justify-center', 'items-center', 'h-[70px]', 'w-full', 'bg-[#DFE7EC]', 'rounded-[5px]', 'relative',
  'tablet:items-start', 'tablet:justify-between', 'tablet:pt-[14px]', 'tablet:pb-[12px]', 'tablet:px-[16px]', 'tablet:h-[80px]'
], {
  variants: {
    active: {
      true: [
        'bg-amber',
        'before:content-[\'\']',
        'before:absolute',
        'before:top-[-8px]',
        'before:left-[50%]',
        'before:transform-[translateX(-50%)]',
        'before:border-l-[8px]',
        'before:border-r-[8px]',
        'before:border-b-[8px]',
        'before:border-l-transparent',
        'before:border-r-transparent',
        'before:border-b-amber',
        'tablet:before:top-[-12px]',
        'tablet:before:border-l-[12px]',
        'tablet:before:border-r-[12px]',
        'tablet:before:border-b-[12px]'
      ]
    }
  }
});

const cardTitleStyles = cva([
  'text-[15px]', 'leading-[19px]', 'text-slate-blue'
], {
  variants: {
    active: {
      true: ['text-white']
    }
  }
});

const cardValueStyles = cva([
  'text-[24px]', 'leading-[30px]', 'mt-[2px]', 'text-midnight-blue',
  'tablet:mt-[0]'
], {
  variants: {
    active: {
      true: ['text-white']
    }
  }
});

export function MultiPlayerStats() {

  const playersScores = useSelector((state: RootState)=> state.game.game.playersScores);
  const currentPlayer = useSelector((state: RootState)=> state.game.game.currentPlayer);
  const { activeBreakpoints } = useBreakpoints();
  const mobile = !!activeBreakpoints.find((b) => b === BreakpointsDevices.mobile);

  return (
    <div className={statsStyles()}>
      {playersScores.map((playerScore, index) => (
        <div key={index} className={cardStyles({active: currentPlayer === index})}>
          <div className={cardTitleStyles({active: currentPlayer === index})}>
            {mobile ? `P${index + 1}` : `Player ${index + 1}`}
          </div>
          <div className={cardValueStyles({active: currentPlayer === index})}>{playerScore}</div>
        </div>
      ))}
    </div>
  );
}
