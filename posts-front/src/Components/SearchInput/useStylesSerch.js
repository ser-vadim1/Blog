import { makeStyles, fade } from "@material-ui/core/styles";



export const useStylesSearchInput = makeStyles((theme)=>({
search:{
   display: "flex",
   border: "1px solid black",
   position: "relative",
   borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
   marginRight: theme.spacing(2)
}, 

searchIcon:{
   marginTop: theme.spacing(0.5),
   marginLeft: theme.spacing(2)
},
inputInput:{

   textIndent: '5px',
},
ContainerResulSearched: {
// display: "none",
position: "absolute",
width: "170%",
backgroundColor: "white",
fontSize: "1.2em",
overflowY: "scroll",
height: "450px",
// transform: 'translate(50%, 50%)',
top: '100%',
right: '0px',
border: '1px solid black',
},
openBoard:{
   display: "block"
},
closeBoard:{
   display: 'none'
},
overflow:{
   height: "350px",
   overflowY: "scroll",
}, 
NoOverflow:{
   height: "auto"
}
}))