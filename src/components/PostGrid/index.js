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
  post__list__wrap: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  item__wrap: {
    position: "relative",
    animationName: "$listAmination",
    animationDuration: "1s",
    transition: "transform 0.25s",
    "&:hover": {
      transform: "scale(1.01)",
    },
    padding: "5px 5px !important",
  },
  "@keyframes listAmination": {
    "0%": { opacity: 0, width: "6.66666%", height: "20%" },
    "25%": { opacity: 0, width: "13.33332%", height: "30%" },
    "50%": { opacity: 0, width: "19.99998%", height: "40%" },
    "75%": { opacity: 0, width: "26.66664%", height: "50%" },
    "100%": { opacity: 1, width: "33.3333%", height: "auto" },
  },
  title: {
    fontSize: "15px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    padding: "10px 20px",
    "@global": {
      ".MuiTypography-colorPrimary ": {
        color: "#202020",
        fontWeight: "bold",
      },
    },
  },
  loading__wrap: {
    display: "flex",
    justifyContent: "center",
  },
  loading: {
    height: "5px",
    width: "200px",
  },
  space__wrap: {
    height: "200px",
    width: "100%",
  },
  developing__wrap: {
    marginTop: "20px",
    color: "#ffff",
  },
  brief: {
    color: "rgba(0, 0, 0, .54)",
    padding: "0 10px",
  },

  gridListContainer: {
    width: (props) => (props.is_maxWidth_1000px ? "100%" : "calc(100%/4)"),
    display: "flex",
    flexDirection: "column",
    margin: "0px 0px !important",
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
  const { columnDataList } = determinateColumnData({
    screenSize: isMobileScreen ? "mobile" : "medium",
    posts,
  });

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.post__list__wrap}>
          {columnDataList.length > 0 &&
            columnDataList.map((item, index) => (
              <GridList
                cellHeight="auto"
                className={classes.gridListContainer}
                cols={1}
                spacing={20}
              >
                {item.map((item, index) => (
                  <GridListTile
                    cols={1}
                    rows={1}
                    className={classes.item__wrap}
                    key={index}
                  >
                    <a onClick={() => onHandleOpenDetailContainer(item.Id)}>
                      <Paper variant="outlined">
                        <Typography
                          variant="h6"
                          align="justify"
                          className={classes.title}
                        >
                          {item.Title}
                        </Typography>
                        <Typography
                          paragraph={true}
                          align="justify"
                          color="textPrimary"
                          className={classes.brief}
                        >
                          {item && `${item.Brief} [...]`}
                        </Typography>
                      </Paper>
                    </a>
                  </GridListTile>
                ))}
              </GridList>
            ))}
        </div>
        <div>
          {isShowPaging ? (
            <Paging
              currentPageIndex={currentPageIndex}
              totalRecord={totalRecord}
              onChangePageIndex={() => console.log("")}
            />
          ) : (
            <GridListTile cols={3} className={classes.loading__wrap}>
              <LinearProgress color="primary" className={classes.loading} />
            </GridListTile>
          )}
          {!isShowPaging && <div className={classes.space__wrap} />}
        </div>
      </div>

      <div className={classes.developing__wrap} />
    </div>
  );
};

export default PostGrid;
