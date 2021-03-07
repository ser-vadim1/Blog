import {
   createSlice, 
   createAsyncThunk, 
   createSelector, 
} from "@reduxjs/toolkit"
import { generalRouter, protectRouter, ENDPOINT_USER,} from "../Helper/api"

const PushPages = ( totalCards, CardsPerPage) =>{
   let pages = []

   for (let i = 1; i <= Math.ceil(totalCards/CardsPerPage); i++) {
      pages.push(i)
      
   }

   return pages
}


export const GetAllUsers = createAsyncThunk("seeAllUsers/GetAllUsers", async (skipUsers, {rejectWithValue, getState})=>{
   try {
      let resGetAllUser = await generalRouter.get(`${ENDPOINT_USER}/?skipUsers=${skipUsers}`)
      return resGetAllUser.data
   } catch (error) {
      return error
   }
})

export const GetUserById = createAsyncThunk("seeAllUsers/GetUserById", async (idUser, {rejectWithValue})=>{
   
   try {
      
      let ResgetUserById = await generalRouter.get(`${ENDPOINT_USER}/adjust/${idUser}`)


      return ResgetUserById.data
   } catch (error) {
      return error
   }
})

export const SeeAllUsersSlice = createSlice({
name: "seeAllUsers",
initialState:{
   allUsers: [],
   error: "",
   totalItems: 0,
   totalPages: [],
   ItemsPerPage: 10,
},
reducers: {},
extraReducers:{
   [GetAllUsers.fulfilled]: (state, action)=>{
      state.allUsers = action.payload.users
      state.totalItems = action.payload.AmountUsers
      state.totalPages = PushPages(state.totalItems, state.ItemsPerPage)
      
   },
   [GetAllUsers.rejected]: (state, action)=>{
      state.error = action.payload
      console.log('rejected', action);
   },
   [GetUserById.fulfilled]: (state, action)=>{
      // console.log('fulfilled', action);
      
   },
   [GetUserById.rejected]: (state, action)=>{
      console.log('rejected', action);
   },
} 
})

export const {
   clearError,
   signOut,
} = SeeAllUsersSlice.actions

export default SeeAllUsersSlice.reducer