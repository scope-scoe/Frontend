import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allEvents: [],
  registeredEvents: [],
  createdEvents: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setAllEvents: (state, action) => {
      state.allEvents = action.payload;
    },
    setRegisteredEvents: (state, action) => {
      state.registeredEvents = action.payload;
    },
    setCreatedEvents: (state, action) => {
      state.createdEvents = action.payload;
    },
  },
});

export const { setAllEvents,setCreatedEvents,setRegisteredEvents } = eventSlice.actions;
export default eventSlice.reducer;
