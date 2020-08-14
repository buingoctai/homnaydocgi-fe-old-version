import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Paging from "../Pagination";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { determinateColumnData } from "../../utils/utils";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 20px",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  PostListWrap: {
    width: (props) => (props.is_maxWidth_1000px ? "100%" : "60%"),
    paddingRight: "20px",
  },
  itemWrap: {
    position: "relative",
    animationName: "$listAmination",
    animationDuration: "1s",
    transition: "transform 0.25s",
    "&:hover": {
      transform: "scale(1.01)",
    },
    padding: "5px 5px !important"

  },
  "@keyframes listAmination": {
    "0%": { opacity: 0, width: "6.66666%", height: "20%" },
    "25%": { opacity: 0, width: "13.33332%", height: "30%" },
    "50%": { opacity: 0, width: "19.99998%", height: "40%" },
    "75%": { opacity: 0, width: "26.66664%", height: "50%" },
    "100%": { opacity: 1, width: "33.3333%", height: "auto" },
  },
  title: {
    display: "flex",
    justifyContent: "center",
    fontSize: "13px",
    padding: "10px 20px",
    "@global": {
      ".MuiTypography-colorPrimary ": {
        color: "#202020",
        fontWeight: "bold",
      },
    },
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
  },
  loading: {
    height: "5px",
    width: "200px",
  },
  spaceWrap: {
    height: "200px",
    width: "100%",
  },
  developingWrap: {
    marginTop: "20px",
    color: "#ffff",
  },
}));

const PostGrid = (props) => {
  const {
    posts,
    totalRecord,
    isShowPaging,
    currentPageIndex,
    responsiveObj,
    onHandleOpenDetailContainer,
  } = props;
  const isMobileScreen = responsiveObj.is_maxWidth_1000px;
  const classes = useStyles({ ...responsiveObj });
  const { columnDataList } = determinateColumnData({ screenSize: isMobileScreen ? 'mobile' : 'medium', posts });

  return (
    <div className={classes.container}>
      <div className={classes.PostListWrap}>
        <GridList
          cellHeight="auto"
          className={classes.gridListContainer}
          cols={colsNumber}
          spacing={20}
        >
          {posts.length > 0 &&
            posts.map((item, index) => (
              <GridListTile
                cols={1}
                rows={1}
                className={classes.itemWrap}
                key={index}
              >
                <Paper variant="outlined">
                  <Typography
                    variant="h6"
                    align="justify"
                    className={classes.title}
                  >
                    <Link
                      underline="none"
                      onClick={() => onHandleOpenDetailContainer(item.Id)}
                    >
                      {item.Title}
                    </Link>
                  </Typography>
                  <Typography
                    paragraph={true}
                    align="justify"
                    color="textPrimary"
                    style={{ padding: "0 10px" }}
                  >
                    {item && `${item.Brief} [...]`}
                  </Typography>
                </Paper>
              </GridListTile>
            ))}
          {isShowPaging ? (
            <Paging
              currentPageIndex={currentPageIndex}
              totalRecord={totalRecord}
              onChangePageIndex={() => console.log("")}
            />
          ) : (
            <GridListTile cols={3} className={classes.loadingWrap}>
              <LinearProgress color="primary" className={classes.loading} />
            </GridListTile>
          )}
          {!isShowPaging && <div className={classes.spaceWrap} />}
        </GridList>
      </div>
      <div className={classes.developingWrap} />
    </div>
  );
};

export default PostGrid;
