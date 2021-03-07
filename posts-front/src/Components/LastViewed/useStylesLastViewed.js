import { makeStyles } from "@material-ui/core/styles";


export const useStylesLastViewed = makeStyles((theme)=>({
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
  GridItem:{
  },
   Card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
   
    avatar: {
      // backgroundColor: red[500],
    },
    paginationCotainer:{
      display: 'flex',
      justifyContent: "center",
   },
}))