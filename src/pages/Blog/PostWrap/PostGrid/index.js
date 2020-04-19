import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Paging from "../../../../components/Pagination";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 20px",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  PostListWrap: {
    width: "60%",
    paddingRight: "20px",
  },
  itemWrap: {
    position: "relative",
    animationName: "$listAmination",
    animationDuration: "4s",
  },
  "@keyframes listAmination": {
    "0%": { opacity: 0, width: "20%", height: "20%" },
    "25%": { opacity: 0.2, width: "25%", height: "20%" },
    "50%": { opacity: 0.5, width: "25%", height: "auto" },
    "75%": { opacity: 0.7, width: "25%", height: "auto" },
    "100%": { opacity: 1, width: "33.3333%", height: "auto" },
  },
  titleWrap: {
    display: "flex",
    justifyContent: "center",
    fontSize: "13px",
    padding: "10px 20px",
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
  },
  loadingItem: {
    height: "5px",
    width: "200px",
  },
  spaceWrap: {
    height: "200px",
    width: "100%",
  },
}));

const PostGrid = (props) => {
  const classes = useStyles();
  const {
    onHandleOpenDetailContainer,
    posts,
    totalRecord,
    isShowPaging,
    currentPageIndex,
  } = props;

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
            posts.map((item) => (
              <GridListTile cols={1} rows={1} className={classes.itemWrap}>
                <Paper variant="outlined">
                  <Typography
                    variant="h6"
                    color="primary"
                    align="justify"
                    className={classes.titleWrap}
                  >
                    <Link
                      underline="none"
                      onClick={() => onHandleOpenDetailContainer(item.Id)}
                    >
                      {item.Title}
                    </Link>
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
            <Paging
              currentPageIndex={currentPageIndex}
              totalRecord={totalRecord}
            />
          ) : (
            <GridListTile cols={3} className={classes.loadingWrap}>
              <LinearProgress color="primary" className={classes.loadingItem} />
            </GridListTile>
          )}
          {!isShowPaging && <div className={classes.spaceWrap} />}
        </GridList>
      </div>
      <div>ĐANG PHÁT TRIỂN</div>
    </div>
  );
};

export default PostGrid;
