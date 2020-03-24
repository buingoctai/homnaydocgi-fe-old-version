import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const BasicLayout = props => {
  const { children } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography
          component="div"
          style={{
            background:
              "-webkit-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%)",
            // background: " -o-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%)",
            // background: "-moz-linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%)",
            // background: "linear-gradient(70deg, #ff6464 40%, #5ac8fa 40%)",
            height: "100%"
          }}
        >
          {children}
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default BasicLayout;
