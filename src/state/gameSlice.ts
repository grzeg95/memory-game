import type {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {type CaseReducer, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {fontAwesomeIcons} from '../config/font-awesome-icons';
import {shuffleArray} from '../utils/shuffleArray';

type Theme = 'numbers' | 'icons'
type NumberOfPlayers = 1 | 2 | 3 | 4;
type GridSize = 4 | 6;

type Settings = {
  theme: Theme;
  numberOfPlayers: NumberOfPlayers;
  gridSize: GridSize;
}

export type Tile = {
  id: string;
  state: 'revealed' | 'visible' | 'hidden';
  value: number;
}

type Timer = {
  id: NodeJS.Timeout | number;
  state: TimerState;
  elapsed: number;
}

type TimerState = 'paused' | 'running' | 'restart'

type GameState = {
  settings: Settings;
  game: {
    playersScores: number[],
    currentPlayer: number;
    tiles: Tile[];
    waitForTick: boolean;
    isOver: boolean;
    icons: IconDefinition[];
    numberOfMoves: number;
    timer: Timer;
  }
}

const initialState: GameState = {
  settings: {
    theme: 'numbers',
    numberOfPlayers: 1,
    gridSize: 4
  },
  game: {
    playersScores: [],
    currentPlayer: 0,
    tiles: [],
    waitForTick: false,
    isOver: false,
    icons: [],
    numberOfMoves: 0,
    timer: {
      id: -1,
      state: 'paused',
      elapsed: 0
    }
  }
};

const setTheme: CaseReducer<GameState, PayloadAction<{theme: Theme}>> = (state, action) => {
  state.settings.theme = action.payload.theme;
};

const setNumberOfPlayers: CaseReducer<GameState, PayloadAction<{numberOfPlayers: NumberOfPlayers}>> = (state, action) => {
  state.settings.numberOfPlayers = action.payload.numberOfPlayers;
};

const setGridSize: CaseReducer<GameState, PayloadAction<{gridSize: GridSize}>> = (state, action) => {
  state.settings.gridSize = action.payload.gridSize;
};

const initializeGame: CaseReducer<GameState> = (state) => {

  const usedIds = new Set<string>();

  /* Reset */

  state.game.playersScores = new Array(state.settings.numberOfPlayers).fill(0);
  state.game.currentPlayer = 0;
  state.game.waitForTick = false;
  state.game.isOver = false;
  state.game.numberOfMoves = 0;
  state.game.timer.elapsed = 0;

  /* Set Icons */

  if (state.settings.theme === 'icons') {
    state.game.icons = shuffleArray(fontAwesomeIcons).slice(0, (state.settings.gridSize * state.settings.gridSize) / 2);
  } else {
    state.game.icons = [];
  }

  /* Generate board */

  const halfBoard = [...new Array((state.settings.gridSize * state.settings.gridSize) / 2).keys()];

  const tiles = [...halfBoard, ...halfBoard].map((value) => {

    /* Generate unique id */

    let id = 'tile-' + crypto.randomUUID();
    while (usedIds.has(id)) {
      id = 'tile-' + crypto.randomUUID();
    }
    usedIds.add(id);

    /* Create tile */

    const tile: Tile = {
      id,
      value,
      state: 'hidden'
    };

    return tile;
  });

  state.game.tiles = shuffleArray(tiles);
};

const revealTile: CaseReducer<GameState, PayloadAction<{tileId: string}>> = (state, action) => {

  const nextRevealedTile = state.game.tiles.find((t) => t.id === action.payload.tileId)!;

  if (nextRevealedTile.state !== 'hidden') {
    return;
  }

  const currentRevealedTiles = state.game.tiles.filter((t) => t.state === 'revealed');

  if (currentRevealedTiles.length === 2) {
    return;
  }

  nextRevealedTile.state = 'revealed';

  if (currentRevealedTiles.length === 1) {
    state.game.waitForTick = true;
  }

  if (state.settings.numberOfPlayers === 1) {
    state.game.numberOfMoves++;
  }
};

const tickGame: CaseReducer<GameState> = (state) => {

  if (!state.game.waitForTick) {
    return;
  }

  const currentRevealedTiles = state.game.tiles.filter((t) => t.state === 'revealed');

  if (currentRevealedTiles.length !== 2) {
    return;
  }

  if (currentRevealedTiles[0].value === currentRevealedTiles[1].value) {

    currentRevealedTiles[0].state = 'visible';
    currentRevealedTiles[1].state = 'visible';

    state.game.playersScores[state.game.currentPlayer]++;

    const allVisible = state.game.tiles.filter((t) => t.state === 'visible').length === state.game.tiles.length;

    if (allVisible) {
      state.game.isOver = true;
    }

  } else {

    state.game.currentPlayer = (state.game.currentPlayer + 1) % state.settings.numberOfPlayers;

    currentRevealedTiles[0].state = 'hidden';
    currentRevealedTiles[1].state = 'hidden';
  }

  state.game.waitForTick = false;
};

const pauseTimer: CaseReducer<GameState> = (state) => {

  if (state.game.timer.state !== 'running') {
    return;
  }

  state.game.timer.state = 'paused';
};

const resumeTimer: CaseReducer<GameState> = (state) => {

  if (state.game.timer.state !== 'paused') {
    return;
  }

  state.game.timer.state = 'running';
};

const setTimerElapsed: CaseReducer<GameState, PayloadAction<{elapsed: number}>> = (state, action) => {
  state.game.timer.elapsed = action.payload.elapsed;
};

const setTimerState: CaseReducer<GameState, PayloadAction<{state: TimerState}>> = (state, action) => {
  state.game.timer.state = action.payload.state;
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTheme,
    setNumberOfPlayers,
    setGridSize,
    initializeGame,
    revealTile,
    tickGame,
    pauseTimer,
    resumeTimer,
    setTimerElapsed,
    setTimerState
  }
});

export default gameSlice.reducer;
export const gameActions = gameSlice.actions;
