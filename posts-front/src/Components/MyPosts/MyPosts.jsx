import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetPostsById } from "../../Redux/posts";
import Pagination from "../pagination/Pagination";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { DOM_NAME } from "../../Helper/api";
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
import { Link } from "react-router-dom";
import { useStylesMyPosts } from "./useStylesMyPosts";
import EditIcon from "@material-ui/icons/Edit";
const MyPosts = () => {
  const classes = useStylesMyPosts();
  const user = useSelector((state) => state.Auth.user);
  const Dispatch = useDispatch();
  const postsById = useSelector((state) => state.Posts.posts);
  const ItemsPerPage = useSelector((state) => state.Posts.ItemsPerPage);
  const TotalPages = useSelector((state) => state.Posts.totalPages);
  const TotalItems = useSelector((state) => state.Posts.totalItems);

  const handlerFetchItems = useCallback(
    async (SkipDoc) => {
      let resultAction = await Dispatch(
        GetPostsById({ ID: user._id, skip: SkipDoc })
      );
      return resultAction;
    },
    [Dispatch]
  );

  useEffect(() => {
    Dispatch(GetPostsById({ ID: user._id, skip: 0 }));
  }, [Dispatch, user]);
  return (
    <>
      <Grid container className={classes.root} spacing={2}>
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
                  <IconButton aria-label="edit">
                    <Link
                      className={classes.linkEdit}
                      to={`/CreateNewPost/?postId=${post._id}`}
                    >
                      <EditIcon />
                    </Link>
                  </IconButton>
                </CardActions>
                {/* <Collapse timeout="auto" unmountOnExit></Collapse> */}
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <div className={classes.paginationCotainer}>
            <Pagination
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

export default MyPosts;
