import { makeStyles, fade } from "@material-ui/core/styles";


export const useStylesModalAuth = makeStyles((theme) => ({
  Form: {
    display: 'flex',
    flexDirection: "column",
    width: '400px',
    margin: 'auto',
    padding: theme.spacing(0,1,0,1),
    // width: 'fill-content',
  },
  formControl: {
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    minWidth: 120,
  },
  BoxInput:{
    display: "flex",
    border: "1px solid black",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '& + &':{
    marginTop: theme.spacing(5), 

    }
  },
  inputInput:{
   paddingLeft: theme.spacing(1),
 },
 IconInputFiled:{
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(2)
},
  TypographyRegister: {
    cursor: "pointer",
    paddingLeft: theme.spacing(2),
    fontFamily: "Akaya Telivigala, serif",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  TypoDilogTitle:{
    fontFamily: "Akaya Telivigala, serif",
    textAlign: "center",
    fontSize: "1.3em",
    padding: theme.spacing(4,0,4,0),
  },
  Buttons:{
    fontFamily: "Akaya Telivigala, serif",
    textAlign: "center",
    fontSize: "1.3em",
    margin: 'auto',
    // color: "white",
  },
  GoogleRegistrContainer:{
    display: 'flex',
    borderRadius: "5px",
    alignSelf: 'center',
    cursor: 'pointer',
    justifyContent: "space-around",
    alignItems: 'center',
    border: '1px solid black',
    width:' 300px',
    height: '40px',
    marginTop: '20px',
    backgroundColor: '#f5f5f5',
    transition: 'border .2s ease-in', 
  },
  GoogleText:{
    color: 'black',
  fontSize: '1.4em',
  },
  WrapperGoogleIcon:{
    width: '40px',
    height: '40px',
  },
  GoogleIcon:{
    width: '40px',
    height: '40px',
  },
  TypoError:{
    color: "red",
    fontFamily: "Akaya Telivigala, serif",
    textAlign: "center",
    alignSelf: "center",
    fontSize: '1.3em',
    paddingTop: theme.spacing(2),
  }
 }));