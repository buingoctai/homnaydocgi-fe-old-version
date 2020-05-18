import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const Paging = (props) => {
  const { currentPageIndex, totalRecord, onChangePageIndex } = props;

  return (
    <Pagination
      page={currentPageIndex}
      count={totalRecord}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      color="primary"
      onChange={(event, pageIndex) => onChangePageIndex(pageIndex)}
    />
  );
};

export default Paging;
