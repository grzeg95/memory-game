import type {MouseEventHandler, ReactNode} from 'react';
import {mergeClasses} from '../../../utils/merge-classes';

type SelectionProps = {
  isActive?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function Selection({ isActive = false, children, onClick, className }: SelectionProps) {

  const isNotActiveClasses = 'bg-light-powder-blue';
  const isActiveClasses = 'bg-midnight-blue';

  const classes = [
    'overflow-hidden text-ellipsis hover:bg-steel-blue',
    'text-[1rem] leading-[20px] rounded-[26px] h-[40px] py-[10px] px-[19px]',
    'tablet:text-[1.625rem] tablet:leading-[32px] tablet:rounded-[26px] tablet:h-[52px] tablet:pt-[11px] tablet:pb-[9x] tablet:px-[33px]'
  ];

  const mergedClasses = mergeClasses([
    'text-white font-bold cursor-pointer whitespace-nowrap',
    className,
    mergeClasses(classes),
    !isActive ? isNotActiveClasses : '',
    isActive ? isActiveClasses : ''
  ]);

  return (
    <button className={mergedClasses} onClick={onClick}>
      {children}
    </button>
  );
}
