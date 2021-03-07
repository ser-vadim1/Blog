import CreatNewPost from "../Components/CreateNewPost/CreateNewPost"
import GetPostById from "../Components/GetPostById/GetPostById"
import LastViewed from "../Components/LastViewed/LastViewed"
import Profile from "../Components/Profile/Profile"
import SeeAllPosts from "../Components/SeeAllPosts/SeeAllPosts"
import SeeAllUsers from "../Components/Seeallusers/SeeAllUsers"
import UserPosts from "../Components/users'sPosts/userPosts"
import SeeOnePost from "../Components/SeeOnePost/seeOnePost"
import MyPosts from "../Components/MyPosts/MyPosts"

export const ArrRoutes =[
   {path: "/", Component: SeeAllPosts, protect: false },
   {path: "/CreateNewPost", Component: CreatNewPost, protect: true  },
   {path: "/profile", Component: Profile,  protect: true},
   {path: "/LastViewed", Component:LastViewed, protect: true},
   {path: "/getPostById:IdPost", Component: GetPostById,  protect: false},
   {path: "/SeeAllUsers", Component: SeeAllUsers, protect: false},
   {path: "/users'sPosts", Component: UserPosts, protect: false},
   {path: "/seeOnePost", Component: SeeOnePost, protect: false},
   {path: "/myPosts", Component: MyPosts, protect: true}
]