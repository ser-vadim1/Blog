import { makeStyles } from '@material-ui/core/styles';

export const useStylesUsersPosts = makeStyles((theme) => ({
   root:{
      flexGrow: 1,
      width: "350px",
      margin: "0 auto",
      justifyContent: "space-around",
      [theme.breakpoints.up("sm")]: {
         width: "700px",
       },
        [theme.breakpoints.up("md")]: {
         width: "1000px",
       },
       [theme.breakpoints.up("lg")]: {
         width: "1400px",
       },
  },
   AvatarSection:{
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
     //  border: '2px solid red',
   },
   large: {
     width: theme.spacing(13),
     height: theme.spacing(13),
   },
   userName:{
      marginTop: theme.spacing(1),
      fontSize: "2em",
   },
   Card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      cursor: "pointer",
    },
   
    avatar: {
      // backgroundColor: red[500],
    },
    paginationCotainer:{
      display: 'flex',
      justifyContent: "center",
   },
}))