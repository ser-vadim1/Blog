import { makeStyles } from "@material-ui/core/styles";

export const useStylesSeeAllUsers = makeStyles((theme) => ({
   root: {
     width: '350px',
     margin: '0 auto',
     border: '1px solid black',
     backgroundColor: theme.palette.background.paper,
     [theme.breakpoints.up("sm")]: {
      width: "600px",
    },
     [theme.breakpoints.up("md")]: {
      width: "800px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "1000px",
    },
   },
   inline: {
     display: 'block',
     fontSize: "1.2em",
     fontFamily: "Akaya Telivigala, serif",
   },
   sizeAvatar:{
      width: theme.spacing(8),
      height: theme.spacing(8),
   },
   listItem:{
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",

      "& > *":{
         marginLeft: theme.spacing(2)
      }
   },
   paginationCotainer:{
      display: 'flex',
      justifyContent: "center",
   },
   TotalMembers:{
      display: "flex",
      justifyContent: 'center',
   },
   link:{
      textDecoration: "none",
      color: "black",
      display: "block"
   },
   
 }));