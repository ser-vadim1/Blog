import React from "react"
import { makeStyles } from "@material-ui/core/styles";


const drawerWidth = 240;


export const  useStylesDrawMenu = makeStyles((theme) => ({
   root: {
     display: "flex",
    //  height: "100%",
   },
   content: {
    fontFamily: "Akaya Telivigala, serif",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.leavingScreen,
     }),
    //  marginLeft: -drawerWidth,
    // backgroundColor: "white",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
   drawer: {
     paddingTop: theme.spacing(1),
     width: drawerWidth,
     flexShrink: 0,
     whiteSpace: "nowrap",
   },
   drawerOpen: {
    paddingTop: theme.spacing(2),
     width: drawerWidth,
     transition: theme.transitions.create("width", {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.enteringScreen,
     }),
   },
   drawerClose: {
    paddingTop: theme.spacing(2),
     transition: theme.transitions.create("width", {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.leavingScreen,
     }),
     overflowX: "hidden",
     width: theme.spacing(7) + 1,
     [theme.breakpoints.up("sm")]: {
       width: theme.spacing(9) + 1,
     },
   },
   Typography: {
      // border: '1px solid red',
    cursor: "pointer",
    fontSize: "2em", 
    flexGrow: 1,
  
   },
   DrawerLink:{
     textDecoration: "none",
     color: 'black',
   }
 
 }));