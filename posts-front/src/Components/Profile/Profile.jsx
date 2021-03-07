import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { UseStylesProfile } from "./useStylesProfile";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { InputBase, Button, InputLabel, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { UpdateUserName, UpdateAvatUser, DeleteUser } from "../../Redux/Auth";
import { DOM_NAME } from "../../Helper/api";
import moment from "moment";

// **Component
const Profile = ({ isOpenDdrawMenu }) => {
  const Dispatch = useDispatch();
  const classes = UseStylesProfile();
  const user = useSelector((state) => state.Auth.user);
  const [ErrorUploadAva, setErrorUploadAva] = useState("");
  const [displayName, setdisplayName] = useState({
    name: user.name,
  });
  const [isAllowedEdit, setIsAllowedEdit] = useState(false);
  const [initials, setInitials] = useState("");

  const handlerEdit = () => {
    setIsAllowedEdit(!isAllowedEdit);
  };

  const handlerChangeName = (e) => {
    if (isAllowedEdit) {
      setdisplayName({ name: e.target.value });
    }
  };

  const handlerSave = async () => {
    if (user.name !== displayName.name) {
      let resultAction = await Dispatch(UpdateUserName(displayName));
    }
    setIsAllowedEdit(false);
  };

  const handlerChangeAvatar = async (e) => {
    const File = e.target.files[0];
    let resulAction = await Dispatch(UpdateAvatUser(File));
    if (resulAction.requestStatus === "rejected") {
      setErrorUploadAva("Try again");
    }
    e.target.value = "";
  };

  const handlerDeletAccount = () => {
    Dispatch(DeleteUser());
  };
  useEffect(() => {
    let initials = () => {
      let initials = "";
      let Namestring = user.name.split(" ");
      if (Namestring.length >= 2) {
        initials = Namestring[0][0] + Namestring[1][0];
        setInitials(initials);
      } else {
        initials = Namestring[0][0];
        setInitials(initials);
      }
    };

    initials();
  }, [user]);
  return (
    <>
      <div className={classes.AvatarSection}>
        <Avatar
          alt="AvatarName"
          src={`${DOM_NAME}${user.avatar}`}
          className={classes.large}
        >
          {initials}
        </Avatar>
        <p className={classes.userName}>{user.name}</p>
      </div>
      <form className={classes.rootForm}>
        <InputLabel className={classes.inputLable}>Disable name</InputLabel>

        <div className={classes.BoxOfName}>
          <InputBase
            type="text"
            className={classes.InputBase}
            value={displayName.name}
            onChange={handlerChangeName}
          />
          <div className={classes.rootButtons}>
            <Button
              variant="contained"
              color="default"
              startIcon={<EditIcon />}
              onClick={handlerEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              onClick={handlerSave}
            >
              Save
            </Button>
          </div>
        </div>
        <InputLabel className={classes.inputLable}>Upload Avatar</InputLabel>
        <input
          accept="image/*"
          name="avatar"
          className={classes.inputFile}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handlerChangeAvatar}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="default"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </label>
        {ErrorUploadAva ? (
          <Typography
            color="error"
            variant="subtitle1"
            className={classes.errorUpload}
          >
            {ErrorUploadAva}
          </Typography>
        ) : (
          ""
        )}
      </form>
      <Typography
        color="primary"
        variant="subtitle1"
        className={classes.timeCreate}
      >
        Account was created:{moment(user.dateCreated).format("YYYY-MM-DD")}
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        // className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={handlerDeletAccount}
      >
        Remove account
      </Button>
    </>
  );
};

export default Profile;
