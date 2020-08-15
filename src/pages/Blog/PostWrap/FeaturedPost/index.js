import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import moment from "moment";

import { translatePostGroupTitle } from "../../../../utils/utils";

const useStyles = makeStyles({
  transition: "transform 0.25s",
  container: {
    "&:hover": {
      transform: "scale(1.025)",
    },
    "@global": {
      ".MuiPaper-elevation1": {
        boxShadow: "none",
      },
    },
  },
  card: {
    display: "flex",
  },
  card__detail: {
    flex: 1,
    backgroundColor: "#fafafa",
    "@global": {
      ".MuiCardContent-root": {
        paddingBottom: "0px",
        paddingTop: "5px"
      }
    }
  },
  card__media: {
    width: 160,
  },
  topic__name_wrap: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#757575",
    marginLeft: "15px",
  },
  title: {
    marginBottom: "5px",
    marginTop: "5px",
  },
  brief: {
    color: 'rgba(0, 0, 0, .54)',
  }
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post, widthCol, onHandleOpenDetailContainer } = props;

  return post.data
    ? post.data.map((post, index) => (
      <Grid item xs={widthCol} md={widthCol} key={index} className={classes.container}>
        <Link
          to={{ pathname: "/home/topic", topic: post.Topic }}
          style={{ textDecoration: "none" }}
        >
          <span className={classes.topic__name_wrap}>
            {translatePostGroupTitle(post.Topic)}
          </span>
        </Link>
        <a onClick={() => onHandleOpenDetailContainer(post.Id)}>
          <CardActionArea>
            <Card className={classes.card}>
              <div className={classes.card__detail}>
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h6"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    <h4 className={classes.title}>{post && post.Title}</h4>
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {post && moment(post.SubmitDate).format("DD-MM-YYYY")}
                  </Typography>
                  <Typography variant="subtitle2" paragraph className={classes.brief}>
                    {post && `${post.Brief}...`}
                  </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia
                  className={classes.card__media}
                  image={post.ImageUrl}
                  title={post.imageTitle}
                />
              </Hidden>
            </Card>
          </CardActionArea>
        </a>

      </Grid>
    ))
    : null;
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
