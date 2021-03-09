import {
   createSlice, 
   createAsyncThunk, 
   createSelector, 
} from "@reduxjs/toolkit"
import { generalRouter, protectRouter, ENDPOINT_POSTS, UPDATE_POSTS_BY_ID} from "../Helper/api"

const PushPages = ( totalCards, CardsPerPage) =>{
   let pages = []

   for (let i = 1; i <= Math.ceil(totalCards/CardsPerPage); i++) {
      pages.push(i)
      
   }

   return pages
}

export const CreatePost = createAsyncThunk("Posts/CreatePost", async (body,{rejectWithValue, getState})=>{
   try {
      let resCreatePost = await protectRouter.post(ENDPOINT_POSTS, body)

      console.log('resCreatePost', resCreatePost.data);
      
      return resCreatePost.data
   } catch (error) {
      return error
   }
})


export const GetPostsById = createAsyncThunk("Posts/GetPostsById", async ({ID, skip, valueSort}, {rejectWithValue})=>{
   try {
      
      let resGetPostsById =  await generalRouter.get(`${ENDPOINT_POSTS}/?postedBy=${ID}&&skipPosts=${skip}&&valueSort=${valueSort}`)


      return resGetPostsById.data
   } catch (error) {
      return error
   }
})

export const GetOnePostById = createAsyncThunk("Posts/GetOnePostById", async (postId, {rejectWithValue})=>{
   try {
      let getOnePost = await generalRouter.get(`${ENDPOINT_POSTS}/${postId}`)


      return getOnePost.data
   } catch (error) {
      return error
   }
})

export const DeletePost = createAsyncThunk("Posts/DeletePost", async(postId, {rejectWithValue})=>{
   try {
      let resDeletPost = protectRouter.delete(`${ENDPOINT_POSTS}/${postId}`)


      return resDeletPost.data
   } catch (error) {
      return error
   }
})

export const UpdatePost = createAsyncThunk("Posts/UpdatePost", async ({body ,postId})=>{
   try {
      let resUpdate = await protectRouter.patch(`${ENDPOINT_POSTS}/${postId}`, body)
      return resUpdate.data
   } catch (error) {
      return error
   }
})


export const  uploadImage = createAsyncThunk("Posts/uploadImage",  async({File, postId}, {rejectWithValue, getState}) =>{
   let formData = new FormData();
   formData.append("image", File)
   try {
      let resUpdateAvatar = await protectRouter.put(`${UPDATE_POSTS_BY_ID}/${postId}`, formData)

      console.log('resUpdateAvatar', resUpdateAvatar);
      return resUpdateAvatar.data
   } catch (error) {
      return error
      
   }
})

export const GetAllPosts = createAsyncThunk("Posts/GetAllPosts", async({skiPost,valueSort})=>{
   try {
      
      let resGetAllposts = await generalRouter.get(`${ENDPOINT_POSTS}/?skipPosts=${skiPost}&&valueSort=${valueSort}`)

      return resGetAllposts.data
   } catch (error) {
      return error
   }
})

export const SearchPosts = createAsyncThunk("Posts/SearchPosts", async ({valueSearch, skiPost})=>{
   try {
      let ressearchedPosts = await generalRouter.post(`${ENDPOINT_POSTS}/search/?search=${valueSearch}&&skipPost=${skiPost}`)

      console.log('ressearchedPosts', ressearchedPosts.data);
      
      return ressearchedPosts.data
   } catch (error) {
      return error
   }
})
export const PostsSlice = createSlice({
   name: "Posts",
   initialState:{
      totalItems: 0,
      totalPages: [],
      ItemsPerPage: 4,
      onePost: "",
      posts: [],
      serchedPosts: []
   },
   reducers:{},
   extraReducers:{
      [CreatePost.fulfilled] : (state, action) =>{
         console.log('fulfilled', action);
         
      },
      [CreatePost.rejected] : (state, action) =>{
         console.log('rejected', action);
      },
      [GetPostsById.fulfilled]: (state, action)=>{
         state.posts = action.payload.Posts
         state.totalItems = action.payload.AmountPosts
         state.totalPages = PushPages(state.totalItems, state.ItemsPerPage)
         
      },
      [GetPostsById.rejected]: (state, action)=>{
         console.log('rejected', action);
      },
      [GetOnePostById.fulfilled]: (state, action)=>{
         state.onePost =action.payload
         console.log('fulfilled GetOnePostById', action);
         
      },
      [GetOnePostById.rejected]: (state, action)=>{
         console.log('rejected GetOnePostById', action);
      },
      [GetOnePostById.fulfilled]: (state, action)=>{
         console.log('fulfilled', action);
         
      },
      [GetOnePostById.rejected]: (state, action)=>{
         console.log('rejected', action);
      },
      [UpdatePost.fulfilled]: (state, action) =>{
         console.log('fulfilled', action);
      },
      [UpdatePost.rejected]: (state, action) =>{
         console.log('rejected', action);
      },
      [GetAllPosts.fulfilled]: (state, action)=>{
         state.posts = action.payload.Posts
         state.totalItems = action.payload.AmountPosts
         state.totalPages = PushPages(state.totalItems, state.ItemsPerPage)
      },
      [SearchPosts.fulfilled]: (state, action) =>{
         state.serchedPosts = action.payload.data
      },
      [SearchPosts.rejected]: (state, action) =>{},
   },
})


export const {
  
} = PostsSlice.actions

export default PostsSlice.reducer