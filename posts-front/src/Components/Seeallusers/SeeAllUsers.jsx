import React, { useEffect, useCallback } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../Redux/AllUsers";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useStylesSeeAllUsers } from "./useStylesSeeAllUsers";
import { DOM_NAME } from "../../Helper/api";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import { useGetParametr } from "../../Hooks/useGetParametr";
const SeeAllUsers = () => {
  const Dispatch = useDispatch();
  const classes = useStylesSeeAllUsers();
  const Allusers = useSelector((state) => state.AllUsers.allUsers);
  const User = useSelector((state) => state.Auth.user);
  const pageParams = useGetParametr("page") || 1;
  const ItemsPerPage = useSelector((state) => state.AllUsers.ItemsPerPage);
  const TotalPages = useSelector((state) => state.AllUsers.totalPages);
  const TotalItems = useSelector((state) => state.AllUsers.totalItems);

  useEffect(() => {
    let SkipDoc = Number(pageParams) * ItemsPerPage - ItemsPerPage;
    Dispatch(GetAllUsers(SkipDoc));
    window.scrollTo(0, 0);
  }, [Dispatch, pageParams, ItemsPerPage]);

  // const handlerFetchItems = useCallback(
  //   async (SkipDoc) => {
  //     let resultAction = await Dispatch(GetAllUsers(SkipDoc));
  //     window.scrollTo(0, 0);
  //     return resultAction;
  //   },
  //   [Dispatch]
  // );

  return (
    <>
      <div className={classes.TotalMembers}>
        <h2>Total members: {TotalItems}</h2>
      </div>
      <List className={classes.root}>
        {Allusers.map((user, index) => {
          if (User._id !== user._id) {
            return (
              <ListItem
                alignItems="flex-start"
                button={true}
                divider={true}
                key={user._id}
                className={classes.listItem}
                component={Link}
                to={`/users'sPosts?postBy=${user._id}`}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Cindy Baker"
                    src={`${DOM_NAME}${user.avatar}`}
                    className={classes.sizeAvatar}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {`Joined: ${moment(user.dateCreated).format(
                        "YYYY/MM/DD"
                      )}`}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" className={classes.inline}>
                      {user.name}
                    </Typography>
                  }
                />
              </ListItem>
            );
          }
        })}
        <div className={classes.paginationCotainer}>
          <Pagination
            toShowPagesAtOnce={5}
            TotalPages={TotalPages}
            // handlerFetchItems={handlerFetchItems}
            ItemsPerPage={ItemsPerPage}
            totalCards={TotalItems}
            pageNeighbours={2}
          />
        </div>
      </List>
    </>
  );
};

export default SeeAllUsers;
