import { makeStyles } from '@material-ui/core/styles';


import DraftsIcon from '@material-ui/icons/Drafts';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PeopleIcon from '@material-ui/icons/People';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';



export const useStylesIcon = makeStyles((theme)=>({
    ListItemIcon:{
        // color: "red"
    },
    DrawerLink:{
        textDecoration: "none",
        color: 'black',
      },
      active:{
          color: "red"
      }
}))

export const ListItemIconStore = [
    {icon :<VisibilityIcon/>, text: "See all posts", Link: "/",  prtotectRouter: false, isOpen: true},
    {icon: <DraftsIcon />, text: "Create post", Link: "/CreateNewPost",  prtotectRouter: true, isOpen: false},
    {icon: <AccountBoxIcon/>, text: 'profile', Link: "/profile",  prtotectRouter: true, isOpen: false},
    {icon: <HistoryIcon/>, text: "Last viewed", Link: "/LastViewed",  prtotectRouter: true, isOpen: false},
    {icon: <PeopleIcon/>, text: "See all users", Link: "/SeeAllUsers",  prtotectRouter: false, isOpen: false},
    {icon: <AssistantPhotoIcon />, text:"My posts", Link: "/MyPosts",  prtotectRouter: true, isOpen: false },
]