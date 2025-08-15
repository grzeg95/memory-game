import {cva} from 'class-variance-authority';
import type {MouseEventHandler, ReactNode} from 'react';

const selectionStyles = cva([
  'text-white', 'font-bold', 'cursor-pointer', 'whitespace-nowrap', 'overflow-hidden', 'text-ellipsis', 'hover:bg-steel-blue',
  'text-[1rem]', 'leading-[20px]', 'rounded-[26px]', 'h-[40px]', 'py-[10px]', 'px-[19px]',
  'tablet:text-[1.625rem]', 'tablet:leading-[32px]', 'tablet:rounded-[26px]', 'tablet:h-[52px]', 'tablet:pt-[11px]', 'tablet:pb-[9x]', 'tablet:px-[33px]'
], {
  variants: {
    status: {
      active: ['bg-midnight-blue'],
      inActive: ['bg-light-powder-blue'],
    }
  }
});

type SelectionProps = {
  isActive?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function Selection({ isActive = false, children, onClick, className }: SelectionProps) {

  return (
    <button className={selectionStyles({status: isActive ? 'active' : 'inActive', className})} onClick={onClick}>
      {children}
    </button>
  );
}
