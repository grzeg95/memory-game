import {type CaseReducer, createSlice, type PayloadAction} from '@reduxjs/toolkit';

type Theme = 'numbers' | 'icons'
type NumberOfPlayers = 1 | 2 | 3 | 4;
type GridSize = 4 | 6;

type Settings = {
  theme: Theme;
  numberOfPlayers: NumberOfPlayers;
  gridSize: GridSize
}

type GameState = {
  settings: Settings
}

const initialState: GameState = {
  settings: {
    theme: 'numbers',
    numberOfPlayers: 1,
    gridSize: 4
  }
}

const setTheme: CaseReducer<GameState, PayloadAction<{theme: Theme}>> = (state, action) => {
  state.settings.theme = action.payload.theme;
};

const setNumberOfPlayers: CaseReducer<GameState, PayloadAction<{numberOfPlayers: NumberOfPlayers}>> = (state, action) => {
  state.settings.numberOfPlayers = action.payload.numberOfPlayers;
};

const setGridSize: CaseReducer<GameState, PayloadAction<{gridSize: GridSize}>> = (state, action) => {
  state.settings.gridSize = action.payload.gridSize;
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTheme,
    setNumberOfPlayers,
    setGridSize
  }
});

export default gameSlice.reducer;
export const gameActions = gameSlice.actions;
