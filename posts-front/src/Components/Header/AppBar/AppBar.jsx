import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import SearchInput from "../../SearchInput/SearchInput";
import { useStylesAppBar } from "./useStylesAppBar";
import ModalSignIn from "../../Popups/Auth/ModalAuth/ModalAuth";
import AvatarSection from "../AvatarSection/AvatarSection";
import store from "../../../app/store";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
const AppPostsBar = ({ isOpen, handleDrawerOpen }) => {
  const classes = useStylesAppBar();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  const { isExact } = useRouteMatch("/");
  return (
    <>
      <AppBar
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.Typography}>
            BEST_BLOG
          </Typography>
          {isExact ? <SearchInput /> : ""}

          {isAuth ? (
            <AvatarSection />
          ) : (
            <>
              <ModalSignIn NamePopap={"Sign in"} Title={"Sign in"} />
              <ModalSignIn
                NamePopap={"Sign up"}
                Title={"Sign up"}
                isNickNameFiled={1}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppPostsBar;
