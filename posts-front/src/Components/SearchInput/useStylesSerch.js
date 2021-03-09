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
ContainerResulSearched: props =>({
position: "absolute",
width: "170%",
backgroundColor: "white",
fontSize: "1.2em",
overflowY: "scroll",
height: props.size,
top: '100%',
right: '0px',
border: '1px solid black',
}),


openBoard:{
   display: "block"
},
closeBoard:{
   display: 'none'
},

}))