import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Paging from "../../../../components/Pagination";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    padding: "20px 20px",
  },
  PostListWrap: {
    width: "60%",
    paddingRight: "20px",
  },
}));

const PostGrid = (props) => {
  const classes = useStyles();
  const { posts, isShowPaging } = props;

  return (
    <div className={classes.container}>
      <div className={classes.PostListWrap}>
        <GridList
          cellHeight="auto"
          className={classes.gridListContainer}
          cols={3}
          spacing={20}
        >
          {posts.length > 0 &&
            posts.map((item, index) => (
              <GridListTile cols={1} rows={1}>
                <Paper variant="outlined">
                  <Typography
                    variant="h6"
                    color="primary"
                    align="justify"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "13px",
                      padding: "10px 20px",
                    }}
                  >
                    {item.Title}
                  </Typography>
                  <Typography
                    variant="p"
                    paragraph={true}
                    align="justify"
                    color="textPrimary"
                    style={{ padding: "0 10px" }}
                  >
                    {item && `${item.Content.substring(0, 200)} [...]`}
                  </Typography>
                </Paper>
              </GridListTile>
            ))}
          {isShowPaging ? (
            <Paging />
          ) : (
            <GridListTile
              cols={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <LinearProgress
                color="primary"
                style={{ height: "5px", width: "200px" }}
              />
            </GridListTile>
          )}
        </GridList>
      </div>
      <div>Filter và Các công cụ khác </div>
    </div>
  );
};

export default PostGrid;
