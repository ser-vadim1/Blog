import { makeStyles } from "@material-ui/core/styles";


export const UseStylesProfile = makeStyles((theme) => ({

   
    AvatarSection:{
       display: 'flex',
       flexDirection: "column",
       alignItems: "center",
      //  border: '2px solid red',
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    userName:{
       marginTop: theme.spacing(1),
       fontSize: "2em",
    },
    rootForm:{
       marginTop: theme.spacing(5),
       '& > *': {
         width: '50ch',

       },
      //  border: '1px solid black',
      // margin: "0 auto",
    },
    InputBase:{
       border: '1px solid black',
       paddingLeft: theme.spacing(2),
       borderRadius: "5px",
       
       "&:focus":{
         outline: " 1px solid red",
       }
    },
    inputFile:{
       display: "none",
    },
    inputLable:{
       margin: theme.spacing(2,0,2,0)
    },
    BoxOfName:{
      // padding: theme.spacing(2,0,2,0),
       display: 'flex',
       alignItems: "center",
    },

    rootButtons:{
       display: 'flex',

       "& > *":{
          marginLeft: theme.spacing(2)
       },
      },

      errorUpload:{
         marginTop: theme.spacing(2)
      },
      timeCreate:{
         marginTop: theme.spacing(2)
      },

}))