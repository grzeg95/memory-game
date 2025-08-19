import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {cva} from 'class-variance-authority';
import {useDispatch, useSelector} from 'react-redux';
import {gameActions, type Tile} from '../../state/gameSlice';
import type {RootState} from '../../state/store';

type TileProps = {
  tile: Tile;
}

const tileStyles = cva([
  'w-full', 'rounded-full', 'text-white', 'cursor-pointer', 'flex', 'justify-center', 'items-center'
], {
  variants: {
    state: {
      revealed: [
        'bg-amber'
      ],
      visible: [
        'bg-light-powder-blue', 'pointer-events-none'
      ],
      hidden: [
        'bg-midnight-blue'
      ]
    },
    gridSize: {
      4: [
        'h-[72.53px]',
        'tablet:h-[118px]'
      ],
      6: [
        'h-[46.88px]',
        'tablet:h-[82px]'
      ]
    },
    theme: {
      numbers: [],
      icons: []
    }
  },
  compoundVariants: [
    {
      gridSize: 4,
      theme: 'numbers',
      class: [
        'text-[40px]', 'leading-[50px]',
        'tablet:text-[56px]', 'leading-[69px]'
      ]
    },
    {
      gridSize: 6,
      theme: 'numbers',
      class: [
        'text-[24px]', 'leading-[30px]',
        'tablet:text-[44px]', 'leading-[55px]'
      ]
    },
    {
      gridSize: 4,
      theme: 'icons',
      class: [
        'text-[30px]',
        'tablet:text-[56px]'
      ]
    },
    {
      gridSize: 6,
      theme: 'icons',
      class: [
        'text-[24px]',
        'tablet:text-[44px]'
      ]
    }
  ]
});

export function Tile({ tile }: TileProps) {

  const dispatch = useDispatch();
  const icons = useSelector((state: RootState) => state.game.game.icons);
  const theme = useSelector((state: RootState)=> state.game.settings.theme);
  const gridSize = useSelector((state: RootState)=> state.game.settings.gridSize);
  const state = tile.state;

  function handleRevealTile() {

    if (tile.state !== 'hidden') {
      return;
    } else {
      dispatch(gameActions.revealTile({tileId: tile.id}));
    }
  }

  return (
    <button className={tileStyles({gridSize, theme, state})} onClick={handleRevealTile}>
      {theme === 'icons' ? (
        <>
          {tile.state !== 'hidden' && <FontAwesomeIcon icon={icons[tile.value]}/>}
        </>
      ) : (
        <>
          {tile.state !== 'hidden' && (tile.value + 1)}
        </>
      )}
    </button>
  );
}
