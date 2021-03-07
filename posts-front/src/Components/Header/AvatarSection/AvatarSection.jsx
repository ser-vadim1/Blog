import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useStylesAvatarSection } from "./useSyylesAvatarSection";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { DOM_NAME } from "../../../Helper/api";
const AvatarSection = () => {
  const classes = useStylesAvatarSection();
  const user = useSelector((state) => state.Auth.user);
  const [initials, setInitials] = useState("");

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
      <Avatar alt="AvatarName" src={`${DOM_NAME}${user.avatar}`}>
        {initials}
      </Avatar>
      <Typography variant="caption" className={classes.TypographyUserName}>
        {user.name}
      </Typography>
    </>
  );
};

export default AvatarSection;
