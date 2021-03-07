import React, { useEffect, useState } from "react";
import { ListItemIconStore } from "./ListItemStoreIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { useStylesDrawMenu } from "./useStylesDraweMenu";
import { useSelector, useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signOut } from "../../../Redux/Auth";
import { useStylesIcon } from "./ListItemStoreIcon";
import clsx from "clsx";

const ListIconComponent = () => {
  const classes = useStylesIcon();
  const Dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  const location = useLocation();
  const [isopenState, setisopenState] = useState([
    { path: "/", isOpen: false },
    { path: "/CreateNewPost", isOpen: false },
    { path: "/profile", isOpen: false },
    { path: "/LastViewed", isOpen: false },
    { path: "/SeeAllUsers", isOpen: false },
    { path: "/MyPosts", isOpen: false },
  ]);
  const handlerSignOut = () => {
    Dispatch(signOut());
  };

  useEffect(() => {
    let newIsOpenState = isopenState.map((el) => {
      if (window.location.pathname === el.path) {
        el.isOpen = true;
        return el;
      } else {
        el.isOpen = false;
        return el;
      }
    });

    setisopenState(newIsOpenState);
  }, []);

  return (
    <List>
      {ListItemIconStore.map((storeIcon, index) => {
        if (storeIcon.prtotectRouter && isAuth) {
          return (
            <Link
              key={index}
              to={storeIcon.Link}
              className={classes.DrawerLink}
            >
              <ListItem button>
                <ListItemIcon
                  className={clsx(classes.ListItemIcon, {
                    [classes.active]: isopenState[index].isOpen,
                  })}
                >
                  {storeIcon.icon}
                </ListItemIcon>
                <ListItemText primary={storeIcon.text} />
              </ListItem>
            </Link>
          );
        } else if (!storeIcon.prtotectRouter) {
          return (
            <Link
              key={index}
              to={storeIcon.Link}
              className={classes.DrawerLink}
            >
              <ListItem button>
                <ListItemIcon
                  className={clsx(classes.ListItemIcon, {
                    [classes.active]: isopenState[index].isOpen,
                  })}
                >
                  {storeIcon.icon}
                </ListItemIcon>
                <ListItemText primary={storeIcon.text} />
              </ListItem>
            </Link>
          );
        }
      })}

      {isAuth ? (
        <ListItem button onClick={handlerSignOut}>
          <ListItemIcon className={classes.ListItemIcon}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign out"} />
        </ListItem>
      ) : (
        ""
      )}
    </List>
  );
};

export default ListIconComponent;
