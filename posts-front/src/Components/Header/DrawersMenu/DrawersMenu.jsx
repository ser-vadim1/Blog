import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStylesDrawMenu } from "./useStylesDraweMenu";
import MainContent from "../../MainContent/MainContent";
import AppPostsBar from "../AppBar/AppBar";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import ListIconComponent from "./ListIconComponent";
import { useSelector } from "react-redux";
const Drawermenu = ({ Content }) => {
  const history = useHistory();
  const match = useRouteMatch(history.location.pathname);
  const classes = useStylesDrawMenu();
  const theme = useTheme();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  const [isOpen, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log();
  }, [history, match]);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const back = () => {
    history.goBack();
  };
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppPostsBar isOpen={isOpen} handleDrawerOpen={handleDrawerOpen} />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: isOpen,
              [classes.drawerClose]: !isOpen,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton
              onClick={handleDrawerClose}
              className={classes.IconButton}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <ListIconComponent />
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: isOpen,
          })}
        >
          <div className={classes.toolbar} />
          <Content />
        </main>
      </div>
    </>
  );
};

export default Drawermenu;
