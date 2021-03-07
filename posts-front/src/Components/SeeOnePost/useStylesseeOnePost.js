import { makeStyles } from '@material-ui/core/styles';


export const useStylesSeeOnePost = makeStyles((theme) => ({
   root:{
      flexGrow: 1,
      width: "350px",
      margin: "0 auto",
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
  item:{
   //   margin: "0 auto"
   alignSelf: "center"
  },
  BoxImage:{
     width: '300px',
  },
  itemImage:{
   display: "flex",
   justifyContent: "center",
  },
  img:{
     width: "100%",
  },

  BoxFullText:{
    wordWrap: "break-word",
},
}))