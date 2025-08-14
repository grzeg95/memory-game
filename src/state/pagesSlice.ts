import {type CaseReducer, createSlice, type PayloadAction} from '@reduxjs/toolkit';

type Page = 'MainMenu' | 'Board';

interface PagesState {
  page: Page;
}

const initialState: PagesState = {
  page: 'MainMenu'
}

const setPage: CaseReducer<PagesState, PayloadAction<{page: Page}>> = (state, action) => {
  state.page = action.payload.page;
}

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPage
  }
});

export default pagesSlice.reducer;
export const pagesActions = pagesSlice.actions;
