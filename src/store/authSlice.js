import { createSlice } from "@reduxjs/toolkit";

const initialState={
  loading:false,
  user:null,
  userRole:'',
  currentUser:false,
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    setLoading:(state,action)=>{
      state.loading = action.payload;
    },
    setUser:(state,action)=>{
      state.user = action.payload;
    },
    setUserRole:(state,action)=>{
      state.userRole = action.payload;
    },
    setCurrentUser:(state,action)=>{
      state.currentUser = action.payload;
    }
  }
})
export const {setLoading,setUser,setUserRole,setCurrentUser}=authSlice.actions;
export default authSlice.reducer;