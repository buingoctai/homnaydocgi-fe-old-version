import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { contentIntro } from "../../../utils/constants";

const Application = () => {
  return (
    <div>
      <h3>THÔNG TIN CHỨC NĂNG ỨNG DỤNG</h3>
      <hr />
      <p>{contentIntro.appFunctional_1}</p>
      <p>{contentIntro.appFunctional_2}</p>
    </div>
  );
};

export default Application;
