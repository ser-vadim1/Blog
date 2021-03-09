import {
   createSlice, 
   createAsyncThunk, 
   createSelector, 
} from "@reduxjs/toolkit"
import {SIGN_IN, CREATE_USER, generalRouter, protectRouter, GET_USER, ENDPOINT_USER, UPDATE_USER_AVATAR} from "../Helper/api"

export const CreateUser = createAsyncThunk("Registration/CreateUser", async (BodyForm, {rejectWithValue}) =>{
  try {
     console.log(BodyForm);
     
     const ResAuthorization = await generalRouter.post(CREATE_USER, BodyForm )
     const ResAuthToken = await generalRouter.post(SIGN_IN, {email: BodyForm.email, password: BodyForm.password})
     localStorage.setItem("AccessToken", ResAuthToken.data.token)
     const GetUser = await protectRouter.get(GET_USER)
     console.log('ResAuthorization', ResAuthorization);

   return { dataUser: ResAuthorization.data, dataToken:  ResAuthToken.data.token}
  } catch (error) {
   const { response } = error;
   if(response.data.error.code === 11000){
    return  rejectWithValue("dublicate name")
   }else{
      return rejectWithValue(response.data.error[0].message)

   }
  }

})
export const GetUser = createAsyncThunk("Registration/GetUser", async (_, {rejectWithValue})=>{
   try {
      const ResGetUser = await protectRouter.get(GET_USER)
      return ResGetUser.data
   } catch (error) {
      const { response } = error;
      return rejectWithValue(response.error)
   }
})
export const SignIn = createAsyncThunk("Registration/SignIn", async (BodyForm, {rejectWithValue})=>{
   try {
      
      let ResAuthToken = await generalRouter.post(SIGN_IN, {email: BodyForm.email, password: BodyForm.password})
      localStorage.setItem("AccessToken", ResAuthToken.data.token)
      let resGetUser =await protectRouter.get(GET_USER)
      
      return {token: ResAuthToken.data, user:  resGetUser.data}
   } catch (error) {
      const { response } = error;
      return rejectWithValue(response.data.error[0].message)
   }
})

export const UpdateUserName = createAsyncThunk("Registration/UpdateUserName", async (BodyForm, {rejectWithValue, getState})=>{
   const _id = getState().Auth.user._id
   
   try {
      let resUpDateUser = await protectRouter.patch(`${ENDPOINT_USER}/adjust/${_id}`, {name: BodyForm.name})
      return resUpDateUser.data
   } catch (error) {
       const { response } = error;
       console.log('response error', error);
      //  return rejectWithValue(response)
       
   }
})
export const UpdateAvatUser = createAsyncThunk("Registration/UpdateAvatUser", async(File, {rejectWithValue, getState}) =>{
   const _id = getState().Auth.user._id
   let formData = new FormData();
   formData.append("avatar", File)
   try {
      let resUpdateAvatar = await protectRouter.put(`${UPDATE_USER_AVATAR}/${_id}`, formData)

      console.log('resUpdateAvatar', resUpdateAvatar);
      return resUpdateAvatar.data
   } catch (error) {
      return error
      
   }
})

export const DeleteUser = createAsyncThunk("Registration/DeleteUser", async (_,{rejectWithValue, getState})=>{
   const _id = getState().Auth.user._id
   try {
      let resDeleteUser = protectRouter.delete(`${ENDPOINT_USER}/adjust/${_id}`)

      console.log('res', resDeleteUser);
      
   } catch (error) {
      console.log('error', error);
      
   }
})
export const RegistrationSlice = createSlice({
   name: "Registration",
   initialState:{
      error: "",
      user: "",
      isAuth: false,
   },
   reducers:{
      clearError: (state, action)=>{
         state.error = ""
      },
      signOut:(state, action) =>{
         state.isAuth = false
         localStorage.removeItem("AccessToken")
         window.location.replace("/")
      },
   
   },
   extraReducers:{
      [CreateUser.fulfilled]: (state, action) => {
         state.user = action.payload.dataUser
         localStorage.setItem("AccessToken", action.payload.dataToken)
         state.isAuth = true
         state.error = ""
         
      },
      [CreateUser.rejected]: (state, action) => {
         state.error = action.payload
         
      },
      [SignIn.fulfilled]: (state, action) =>{
         state.isAuth = true
         state.user = action.payload.user
         console.log('sign in fulfiled', action);
         
      },
      [SignIn.rejected]: (state, action) =>{
         console.log('sign in rejected', action);
      },
      [GetUser.fulfilled]: (state, action) =>{
         state.isAuth = true
         state.user = action.payload
         
      },
      [GetUser.rejected]: (state, action) =>{
         state.user = ""
         state.isAuth = false
         localStorage.removeItem("AccessToken")
         // console.log('get user rejected', action);
      },
       [UpdateUserName.fulfilled]: (state, action)=>{
          state.user = action.payload
          console.log('ful', action);
          
       },
        [UpdateUserName.rejected]: (state, action)=>{
           console.log('rejected', action);
           
        },
        [UpdateAvatUser.fulfilled]:(state, action) =>{
           state.user = action.payload
           console.log('fulfilled', action);
           
        },
        [UpdateAvatUser.rejected]:(state, action) =>{
         console.log('rejected', action)
        },
        [DeleteUser.fulfilled]:(state, action)=>{
           state.isAuth = false
           localStorage.removeItem("AccessToken")
           window.location.replace("/")
        },
        [DeleteUser.rejected]:(state, action)=>{},
   }
})

export const {
   clearError,
   signOut,
} = RegistrationSlice.actions

export default RegistrationSlice.reducer