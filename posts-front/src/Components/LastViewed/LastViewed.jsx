import React, { useEffect, useState } from "react";
import { GetOnePostById } from "../../Redux/posts";
import { useDispatch, useSelector } from "react-redux";
import { useStylesLastViewed } from "./useStylesLastViewed";
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
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { DOM_NAME, generalRouter, ENDPOINT_POSTS } from "../../Helper/api";
import { Link } from "react-router-dom";

const LastViewed = () => {
  let classes = useStylesLastViewed();
  const Dispatch = useDispatch();
  const [lastViewed, setLastViewed] = useState([]);
  const LocalLastViewd = JSON.parse(localStorage.getItem("lastSeen"));
  useEffect(() => {
    async function processArray() {
      let newLast = [];
      if (LocalLastViewd) {
        for (const idPost of LocalLastViewd) {
          let res = await generalRouter.get(`${ENDPOINT_POSTS}/${idPost}`);
          newLast.push(res.data);
        }
        setLastViewed(newLast);
      }
    }
    processArray();
  }, [Dispatch]);

  return (
    <>
      <Grid container className={classes.root} spacing={2} justify="center">
        {lastViewed.map((post, index) => {
          return (
            <Grid
              key={index}
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
                    <Avatar aria-label="recipe" className={classes.avatar}>
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
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default LastViewed;
