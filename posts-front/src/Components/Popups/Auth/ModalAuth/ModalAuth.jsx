import React, { useEffect, useState } from "react";
import { ModalAuthHoc } from "../AuthModalHOC";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useStylesModalAuth } from "./useStylesModalAuth";
import InputBase from "@material-ui/core/InputBase";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import { CreateUser, clearError, SignIn } from "../../../../Redux/Auth";
import { useDispatch, useSelector } from "react-redux";

const ModalAuth = ({ NamePopap, Title, isNickNameFiled }) => {
  const classes = useStylesModalAuth();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const Dispatch = useDispatch();
  const error = useSelector((state) => state.Auth.error);
  const [BodyForm, setBodyForm] = useState({
    name: "",
    password: "",
    email: "",
  });

  const _onChange = (e) => {
    setBodyForm({
      ...BodyForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    Dispatch(clearError());
  };

  const Submit = async (BodyForm) => {
    if (NamePopap === "Sign in") {
      if (Object.values(BodyForm).some((el) => el !== "")) {
        let resultAction = await Dispatch(SignIn(BodyForm));
        if (resultAction.meta.requestStatus !== "rejected") {
          setOpen(false);
        }
      }
    } else {
      if (Object.values(BodyForm).some((el) => el !== "")) {
        let resultAction = await Dispatch(CreateUser(BodyForm));
        console.log(resultAction);
        if (resultAction.meta.requestStatus !== "rejected") {
          setOpen(false);
        }
      }
    }
  };
  return (
    <>
      <div>
        <Typography
          variant="h6"
          noWrap
          onClick={handleClickOpen}
          className={classes.TypographyRegister}
        >
          {NamePopap}
        </Typography>
        <Dialog
          className={classes.Dialog}
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Typography variant="h2" noWrap className={classes.TypoDilogTitle}>
            {Title}
          </Typography>
          <form className={classes.Form} onChange={_onChange}>
            <div className={classes.BoxInput}>
              <div className={classes.IconInputFiled}>
                <MailOutlineIcon />
              </div>
              <InputBase
                name="email"
                type={`email`}
                placeholder="Email"
                className={classes.inputInput}
              />
            </div>
            {isNickNameFiled ? (
              <div className={classes.BoxInput}>
                <div className={classes.IconInputFiled}>
                  <PersonIcon />
                </div>
                <InputBase
                  name="name"
                  type={`text`}
                  placeholder="NickName"
                  className={classes.inputInput}
                />
              </div>
            ) : (
              ""
            )}

            <div className={classes.BoxInput}>
              <div className={classes.IconInputFiled}>
                <VisibilityOffIcon />
              </div>
              <InputBase
                name="password"
                type={`password`}
                placeholder="Password"
                className={classes.inputInput}
              />
            </div>
            {error ? (
              <Typography variant="inherit" className={classes.TypoError}>
                {error}
              </Typography>
            ) : (
              ""
            )}
          </form>

          <DialogActions>
            <Button
              onClick={() => Submit(BodyForm)}
              className={classes.Buttons}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ModalAuthHoc(ModalAuth);
