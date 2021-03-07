import { configureStore } from '@reduxjs/toolkit';
import AutReducer from "../Redux/Auth"
import SeeAllUsersReducer from "../Redux/AllUsers"
import PostsReducer from "../Redux/posts"
export default configureStore({
  reducer: {
    Auth: AutReducer,
    AllUsers: SeeAllUsersReducer,
    Posts: PostsReducer
  },
});
