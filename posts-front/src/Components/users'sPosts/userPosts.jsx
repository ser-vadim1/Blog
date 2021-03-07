import React, { useEffect, useState, useCallback } from "react";
import { useStylesUsersPosts } from "./useStylesUsersPosts";
import Avatar from "@material-ui/core/Avatar";
import { DOM_NAME } from "../../Helper/api";
import { useParams, useLocation } from "react-router-dom";
import { useGetParametr } from "../../Hooks/useGetParametr";
import { GetUserById } from "../../Redux/AllUsers";
import { GetPostsById } from "../../Redux/posts";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const UserPosts = () => {
  const classes = useStylesUsersPosts();
  const location = useLocation();
  const userId = useGetParametr("postBy");
  const [user, setUser] = useState();
  const postsById = useSelector((state) => state.Posts.posts);
  const ItemsPerPage = useSelector((state) => state.Posts.ItemsPerPage);
  const TotalPages = useSelector((state) => state.Posts.totalPages);
  const TotalItems = useSelector((state) => state.Posts.totalItems);
  const [sortBy, setSortBy] = React.useState("");
  const [isSorted, setIsSorted] = useState(false);
  // const [postsById, setPostsById] = useState();
  const Dispatch = useDispatch();

  const handlerFetchItems = useCallback(
    async (SkipDoc) => {
      let resultAction = await Dispatch(
        GetPostsById({ ID: userId, skip: SkipDoc, valueSort: sortBy })
      );
      // window.scrollTo(0, 0);
      return resultAction;
    },
    [Dispatch, sortBy, userId]
  );

  const handleChange = (e) => {
    setSortBy(e.target.value);
    setIsSorted(true);
  };
  useEffect(() => {
    let getInfo = async () => {
      let resultAction = await Dispatch(GetUserById(userId));
      let resultActionPost = await Dispatch(
        GetPostsById({ ID: userId, skip: 0, valueSort: sortBy })
      );
      if (
        resultAction.meta.requestStatus === "fulfilled" &&
        resultActionPost.meta.requestStatus === "fulfilled"
      ) {
        setIsSorted(false);
        setUser(resultAction.payload);
      }
    };

    getInfo();
  }, [Dispatch, userId, sortBy]);

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
      {user ? (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <div className={classes.AvatarSection}>
              <Avatar
                alt="AvatarName"
                src={`${DOM_NAME}${user.avatar}`}
                className={classes.large}
              >
                {/* {initials} */}
              </Avatar>
              <p className={classes.userName}>{user.name}</p>
            </div>
          </Grid>
          {postsById.map((post) => {
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
                      <Avatar
                        aria-label="recipe"
                        className={classes.avatar}
                        alt="AvatarName"
                        src={`${DOM_NAME}${user.avatar}`}
                      >
                        R
                      </Avatar>
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
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      noWrap={true}
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
                  {/* <Collapse timeout="auto" unmountOnExit></Collapse> */}
                </Card>
              </Grid>
            );
          })}
          {postsById.length === 0 ? (
            <Typography component="p">No have posts</Typography>
          ) : (
            ""
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
      ) : (
        ""
      )}
    </>
  );
};

export default UserPosts;
