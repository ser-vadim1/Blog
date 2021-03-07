
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStylesAppBar =  makeStyles((theme) =>({
   appBar: {
      display: "flex",
      justifyContent: "center",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.leavingScreen,
     }),
   },
   appBarShift: {
      display: "flex",
      justifyContent: "center",
     marginLeft: drawerWidth,
     width: `calc(100% - ${drawerWidth}px)`,
     transition: theme.transitions.create(["width", "margin"], {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.enteringScreen,
     }),
   },
   menuButton: {
     marginRight: 36,
   },
   hide: {
     display: "none",
   },
   Typography: {
      // border: '1px solid red',
    cursor: "pointer",
    fontSize: "2em", 
    flexGrow: 1,
     fontFamily: "Akaya Telivigala, serif",
   },
}))