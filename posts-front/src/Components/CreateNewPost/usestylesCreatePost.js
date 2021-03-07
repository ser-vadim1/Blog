import { makeStyles } from "@material-ui/core/styles";

export const UseStlesCreatePost = makeStyles((theme) => ({
   container:{
      display: "flex",
      width: '350px',
      height: "500px",
      margin: "0 auto",
      // border: '1px solid black',
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
   form:{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   inputLableTitle:{
      marginTop: theme.spacing(2),
      fontFamily: "Akaya Telivigala, serif",
      fontSize: "1.5em"
   },
   textareaTitle:{
      borderRadius: "5px",
      resize: "none",
      outline: "none",
      textAlign: "center",
      verticalAlign: "middle",
      paddingTop: theme.spacing(2),
      fontSize: "1.5em",
      width: "100%",
      height: "60px",
      marginTop: theme.spacing(2),
      border: '1px solid black',
      [theme.breakpoints.up("md")]: {
         width: "50%",
       },
   },
   textareaFullText:{
      resize: "none",
      width: '100%',
      height: '300px',
      fontSize: "1.5em",
      outline: "none",
      paddingLeft: theme.spacing(2),
     borderRadius: "5px",
      marginTop: theme.spacing(2),
   },
   textareaDescription:{
      borderRadius: "5px",
      resize: "none",
      textAlign: "center",
      outline: "none",
      verticalAlign: "middle",
      paddingTop: theme.spacing(2),
      fontSize: "1.5em",
      width: "100%",
      height: "60px",
      marginTop: theme.spacing(2),
      border: '1px solid black',
      [theme.breakpoints.up("md")]: {
         width: "80%",
       },
   },
   buttonSubmit:{
      marginTop: theme.spacing(2),
   },
   containerButton:{
      display: "flex",
      alignItems: "center",
   },
   buttonRemove:{
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2)
   },
   inputFile:{
      display: "none"
   },
   buttonUpload:{
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2)  
   },
}))