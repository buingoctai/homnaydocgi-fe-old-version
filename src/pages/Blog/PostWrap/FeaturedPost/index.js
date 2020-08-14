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
  cardDetails: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  cardMedia: {
    width: 160,
  },
  topicNameWrap: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#757575",
    marginLeft: "15px",
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post, widthCol, onHandleOpenDetailContainer } = props;

  return post.data
    ? post.data.map((post, index) => (
        <Grid item xs={12} md={12} key={index} className={classes.container}>
          <Link
            to={{ pathname: "/home/topic", topic: post.Topic }}
            style={{ textDecoration: "none" }}
          >
            <span className={classes.topicNameWrap}>
              {translatePostGroupTitle(post.Topic)}
            </span>
          </Link>

          <CardActionArea>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h6"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    <a onClick={() => onHandleOpenDetailContainer(post.Id)}>
                      {post && post.Title}
                    </a>
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {post && moment(post.SubmitDate).format("DD-MM-YYYY")}
                  </Typography>
                  <Typography variant="subtitle2" paragraph>
                    {post && `${post.Brief}...`}
                  </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  image={post.ImageUrl}
                  title={post.imageTitle}
                />
              </Hidden>
            </Card>
          </CardActionArea>
        </Grid>
      ))
    : null;
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
