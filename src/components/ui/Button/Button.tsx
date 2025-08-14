import type {MouseEventHandler, ReactNode} from 'react';
import {mergeClasses} from '../../../utils/merge-classes';

type ButtonProps = {
  appearance?: 'primary' | 'secondary';
  size?: 'normal' | 'big';
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function Button({ appearance = 'primary', size = 'normal', children, onClick, className }: ButtonProps) {

  const appearancePrimaryClasses = 'text-white bg-amber hover:bg-[#FFB84A]';
  const appearanceSecondaryClasses = 'text-midnight-blue bg-[#DFE7EC] hover:text-white hover:bg-steel-blue';

  const sizeClasses = {
    normal: [
      'text-[1rem] leading-[20px] rounded-[26px] h-[40px] px-[18px] py-[10px]',
      'tablet:text-[1.25rem] tablet:leading-[25px] tablet:h-[52px] tablet:pt-[13px] tablet:px-[28px] tablet:pb-[14px]'
    ],
    big: [
      'text-[1.125rem] leading-[22px] rounded-[26px] h-[48px] pt-[12px] pb-[14px] px-[23px]',
      'tablet:text-[2rem] tablet:leading-[40px] tablet:rounded-[35px] tablet:h-[70px] tablet:pt-[16px] tablet:pb-[14px] tablet:px-[33px]'
    ]
  };

  const mergedClasses = mergeClasses([
    className,
    'font-bold cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis',
    mergeClasses(sizeClasses[size]),
    appearance === 'primary' ? appearancePrimaryClasses : '',
    appearance === 'secondary' ? appearanceSecondaryClasses : '',
  ]);

  return (
    <button className={mergedClasses} onClick={onClick}>
      {children}
    </button>
  );
}
