import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const ReadNews = () => {
  return (
    <div>
      <TextField id="standard-basic" label="URL" />
      <Button variant="contained" color="primary">
        ĐỌC
      </Button>
    </div>
  );
};

export default ReadNews;
