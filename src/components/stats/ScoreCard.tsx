import {cva} from 'class-variance-authority';

const scoreCardStyles = cva([
  'flex', 'justify-between', 'items-center', 'w-full', 'h-[48px]', 'px-[16px]', 'py-[11px]', 'rounded-[5px]',
  'tablet:h-[72px]', 'tablet:px-[32px]', 'tablet:py-[17px]', 'tablet:rounded-[10px]'
], {
  variants: {
    highlighted: {
      true: [
        'bg-deep-navy'
      ],
      false: [
        'bg-[#DFE7EC]'
      ]
    }
  }
});

const scoreCardTitleStyles = cva([
  'text-[13px]', 'leading-[16px]',
  'tablet:text-[18px]', 'tablet:leading-[22px]'
], {
  variants: {
    highlighted: {
      true: [
        'text-white'
      ],
      false: [
        'text-slate-blue'
      ]
    }
  }
});

const scoreCardValueStyles = cva([
  'text-[20px]', 'leading-[25px]',
  'tablet:text-[32px]', 'tablet:leading-[40px]'
], {
  variants: {
    highlighted: {
      true: [
        'text-white'
      ],
      false: [
        'text-midnight-blue'
      ]
    }
  }
});

type ScoreCardProps = {
  highlighted?: boolean;
  title: string;
  value: string | number;
}

export function ScoreCard({highlighted = false, title, value}: ScoreCardProps) {

  return (
    <div className={scoreCardStyles({highlighted})}>
      <div className={scoreCardTitleStyles({highlighted})}>{title}</div>
      <div className={scoreCardValueStyles({highlighted})}>{value}</div>
    </div>
  );
}
