import {Button} from '../components/ui/Button/Button';
import {Modal} from '../components/ui/Modal/Modal';
import {Selection} from '../components/ui/Selection/Selection';

export function MainMenu() {

  return (
    <>
      <div className='absolute w-full h-full bg-deep-navy'></div>
      <Modal isOpen={true} hasBackdrop={false}>
        <div className='flex flex-col items-center gap-[45px] tablet:gap-[78px] max-w-[327px] tablet:max-w-[654px] w-full'>
          <div className='text-white text-[2rem] tablet:text-[2.5rem] leading-[40px] tablet:leading-[50px] font-bold'>memory</div>
          <div className='flex flex-col gap-[32px] tablet:gap-[33px] p-[24px] tablet:p-[56px] bg-off-white w-full rounded-[10px]'>
            <div className='flex flex-col gap-[24px]'>
              <div className='flex flex-col gap-[11px] tablet:gap-[16px]'>
                <div className='text-[0.9375rem] leading-[19px] tablet:text-[1.25rem] tablet:leading-[25px] text-[#7191A5] font-bold'>Select Theme</div>
                <div className='flex gap-[11px] tablet:gap-[30px]'>
                  <Selection className='w-full'>Numbers</Selection>
                  <Selection className='w-full'>Icons</Selection>
                </div>
              </div>
              <div className='flex flex-col gap-[11px] tablet:gap-[16px]'>
                <div className='text-[0.9375rem] leading-[19px] tablet:text-[1.25rem] tablet:leading-[25px] text-[#7191A5] font-bold'>Numbers of Players</div>
                <div className='flex gap-[11px] tablet:gap-[20px]'>
                  <Selection className='w-full'>1</Selection>
                  <Selection className='w-full'>2</Selection>
                  <Selection className='w-full'>3</Selection>
                  <Selection className='w-full'>4</Selection>
                </div>
              </div>
              <div className='flex flex-col gap-[11px] tablet:gap-[16px]'>
                <div className='text-[0.9375rem] leading-[19px] tablet:text-[1.25rem] tablet:leading-[25px] text-[#7191A5] font-bold'>Grid Size</div>
                <div className='flex gap-[11px] tablet:gap-[30px]'>
                  <Selection className='w-full'>4x4</Selection>
                  <Selection className='w-full'>6x6</Selection>
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
