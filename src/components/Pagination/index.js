import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const Paging = (props) => {
  const { currentPageIndex, totalRecord } = props;

  return (
    <Pagination
      page={currentPageIndex}
      count={totalRecord}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    />
  );
};

export default Paging;
