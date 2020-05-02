import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import moment from "moment";

import { translatePostGroupTitle } from "../../../../utils/utils";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  topicNameWrap: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post, onHandleOpenDetailContainer } = props;

  return post.data
    ? post.data.map((post, index) => (
        <Grid item xs={12} md={6} key={index}>
          <span className={classes.topicNameWrap}>
            {post && translatePostGroupTitle(post.Topic)}
          </span>

          <CardActionArea component="a">
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h6"
                    style={{ fontSize: "15px" }}
                  >
                    {post && `${post.Title.substring(0, 30)}...`}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {post && moment(post.SubmitDate).format("DD-MM-YYYY")}
                  </Typography>
                  <Typography variant="subtitle2" paragraph>
                    {post && `${post.Content.substring(0, 50)}...`}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => onHandleOpenDetailContainer(post.Id)}
                    style={{ backgroundColor: "#ffff" }}
                  >
                    Đọc tiếp…
                  </Button>
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
