import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allQueries:[],
  createdQueries:[],
}

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setAllQueries: (state, action) => {
      state.allQueries = action.payload;
    },
    setCreatedQueries: (state, action) => {
      state.createdQueries = action.payload;
    },
  }
});

export const { setAllQueries,setCreatedQueries } = querySlice.actions;
export default querySlice.reducer;