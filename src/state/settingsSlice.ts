import {type CaseReducer, createSlice, type PayloadAction} from '@reduxjs/toolkit';

type Theme = 'numbers' | 'icons'
type NumberOfPlayers = 1 | 2 | 3 | 4;
type GridSize = 4 | 6;

interface CartState {
  theme: Theme;
  numberOfPlayers: NumberOfPlayers;
  gridSize: GridSize
}

const initialState: CartState = {
  theme: 'numbers',
  numberOfPlayers: 1,
  gridSize: 4
}

const setTheme: CaseReducer<CartState, PayloadAction<{theme: Theme}>> = (state, action) => {
  state.theme = action.payload.theme;
}

const setNumberOfPlayers: CaseReducer<CartState, PayloadAction<{numberOfPlayers: NumberOfPlayers}>> = (state, action) => {
  state.numberOfPlayers = action.payload.numberOfPlayers;
}

const setGridSize: CaseReducer<CartState, PayloadAction<{gridSize: GridSize}>> = (state, action) => {
  state.gridSize = action.payload.gridSize;
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme,
    setNumberOfPlayers,
    setGridSize
  }
});

export default settingsSlice.reducer;
export const settingsActions = settingsSlice.actions;
