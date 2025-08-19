import {cva} from 'class-variance-authority';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gameActions} from '../../state/gameSlice';
import type {RootState} from '../../state/store';
import {Tile} from './Tile';

const tilesStyles = cva([
  'grid', 'w-full'
], {
  variants: {
    size: {
      4: [
        'grid-cols-[repeat(4,1fr)]', 'grid-rows-[repeat(4,1fr)]', 'max-w-[327px] gap-[12.293px]',
        'tablet:max-w-[532px]', 'tablet:gap-[20px]'
      ],
      6: [
        'grid-cols-[repeat(6,1fr)]', 'grid-rows-[repeat(6,1fr)]', 'max-w-[326.88px]', 'gap-[9.12px]',
        'tablet:max-w-[572px]', 'tablet:gap-[16px]'
      ]
    }
  }
});

export function Tiles() {

  const dispatch = useDispatch();
  const tiles = useSelector((state: RootState)=> state.game.game.tiles);
  const gridSize = useSelector((state: RootState)=> state.game.settings.gridSize);
  const waitForTick = useSelector((state: RootState)=> state.game.game.waitForTick);

  useEffect(() => {
    if (waitForTick) {
      setTimeout(() => {
        dispatch(gameActions.tickGame());
      }, 500);
    }
  }, [dispatch, waitForTick]);

  return (
    <div className={tilesStyles({size: gridSize})}>
      {tiles.map((tile) => <Tile tile={tile} key={tile.id}/>)}
    </div>
  );
}
