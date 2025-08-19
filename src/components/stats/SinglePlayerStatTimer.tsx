import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gameActions} from '../../state/gameSlice';
import type {AppDispatch, RootState} from '../../state/store';
import {timerFormater} from '../../utils/timerFormater';

export function SinglePlayerStatTimer() {

  const dispatch = useDispatch<AppDispatch>();
  const timer = useSelector((state: RootState)=> state.game.game.timer);
  const isOver = useSelector((state: RootState)=> state.game.game.isOver);

  const componentTimer = useRef<NodeJS.Timeout | number>(-1);
  const start = useRef(0);

  useEffect(() => {

    if (componentTimer.current === -1) {

      start.current = Date.now();

      dispatch(gameActions.setTimerElapsed({elapsed: 0}));
      componentTimer.current = setInterval(() => {
        dispatch(gameActions.setTimerElapsed({elapsed: Date.now() - start.current}));
      }, 1000)
    }

    return () => {
      clearInterval(componentTimer.current);
      componentTimer.current = -1;
    };
  }, [dispatch]);

  useEffect(() => {

    if (timer.state === 'restart') {

      clearInterval(componentTimer.current);
      componentTimer.current = -1;
      start.current = Date.now();

      componentTimer.current = setInterval(() => {
        dispatch(gameActions.setTimerElapsed({elapsed: Date.now() - start.current}));
      }, 1000);

      dispatch(gameActions.setTimerState({state: 'running'}));
    }

    if (timer.state === 'paused') {
      clearInterval(componentTimer.current);
      componentTimer.current = -1;
    }

    if (timer.state === 'running' && componentTimer.current === -1) {

      start.current = Date.now() - timer.elapsed;

      componentTimer.current = setInterval(() => {
        dispatch(gameActions.setTimerElapsed({elapsed: Date.now() - start.current}));
      }, 1000);
    }
  }, [dispatch, timer.elapsed, timer.state]);

  useEffect(() => {
    if (isOver) {
      clearInterval(componentTimer.current);
      componentTimer.current = -1;
    }
  }, [isOver]);

  return timerFormater(timer.elapsed);
}
