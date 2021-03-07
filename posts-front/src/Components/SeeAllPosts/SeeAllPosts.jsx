import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Pagination from "../pagination/Pagination";
import Grid from "@material-ui/core/Grid";
import { useStylesSeeAllPosts } from "./useStylesSeeAllPosts";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { GetAllPosts } from "../../Redux/posts";
import { useDispatch, useSelector } from "react-redux";
import { DOM_NAME } from "../../Helper/api";
import moment from "moment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import { ENDPOINT_USER, generalRouter } from "../../Helper/api";
import { GetUserById } from "../../Redux/AllUsers";
const SeeAllPosts = () => {
  const classes = useStylesSeeAllPosts();
  const [expanded, setExpanded] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const Dispatch = useDispatch();
  const ItemsPerPage = useSelector((state) => state.Posts.ItemsPerPage);
  const TotalPages = useSelector((state) => state.Posts.totalPages);
  const TotalItems = useSelector((state) => state.Posts.totalItems);
  const _Posts = useSelector((state) => state.Posts.posts);
  const [sortBy, setSortBy] = React.useState("");
  const [users, setusers] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const handlerFetchItems = useCallback(
    async (SkipDoc) => {
      let resultAction = await Dispatch(
        GetAllPosts({ skiPost: SkipDoc, valueSort: sortBy })
      );
      // window.scrollTo(0, 0);
      return resultAction;
    },
    [Dispatch, sortBy]
  );
  useEffect(() => {
    let _AllPost = async () => {
      let resultAction = await Dispatch(
        GetAllPosts({ skiPost: 0, valueSort: sortBy })
      );
      if (resultAction.meta.requestStatus === "fulfilled") {
        setIsSorted(false);
      }
    };

    _AllPost();
  }, [Dispatch, sortBy]);

  useEffect(() => {
    let usersArr = [];
    let getusers = async () => {
      for (const post of _Posts) {
        let res = await Dispatch(GetUserById(post.postedBy));
        usersArr.push(res.payload);
      }
      setusers(usersArr);
    };

    getusers();
  }, [allPosts, Dispatch, _Posts]);

  const getAvatar = (userId) => {
    let user = users.find((u) => u._id === userId);

    return user?.avatar || null;
  };

  const handleChange = (e) => {
    setSortBy(e.target.value);
    setIsSorted(true);
  };

  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sortBy}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>sort by date</MenuItem>
        </Select>
        <FormHelperText>Choose method sort</FormHelperText>
      </FormControl>

      <Grid container className={classes.root} spacing={2} justify="center">
        {_Posts.length ? (
          _Posts.map((post, index) => {
            return (
              <Grid
                key={post._id}
                item
                xs={12}
                sm={7}
                md={4}
                lg={3}
                className={classes.GridItem}
              >
                <Card className={classes.Card}>
                  <CardHeader
                    avatar={
                      users.length > 1 ? (
                        <Avatar
                          aria-label="recipe"
                          className={classes.avatar}
                          src={`${DOM_NAME}${getAvatar(post.postedBy)}`}
                        >
                          R
                        </Avatar>
                      ) : (
                        ""
                      )
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={`${post.title}`}
                    subheader={`${moment(post.dateCreated).format(
                      "YYYY/MM/DD HH:mm"
                    )}`}
                  />
                  <CardMedia
                    component={Link}
                    to={`/seeOnePost?postId=${post._id}`}
                    className={classes.media}
                    image={
                      post.image
                        ? `${DOM_NAME}${post.image}`
                        : "https://oborot.ru/wp-content/uploads/2020/10/78-1.jpg"
                    }
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      noWrap={true}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {post.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                  ></Collapse>
                </Card>
              </Grid>
            );
          })
        ) : (
          <p>No have posts</p>
        )}

        <Grid item xs={12}>
          <div className={classes.paginationCotainer}>
            <Pagination
              isSorted={isSorted}
              toShowPagesAtOnce={5}
              TotalPages={TotalPages}
              handlerFetchItems={handlerFetchItems}
              ItemsPerPage={ItemsPerPage}
              totalCards={TotalItems}
              pageNeighbours={2}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SeeAllPosts;
