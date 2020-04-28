import React from "react";
import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Introduction from "../Introduction";
import Blog from "../Blog";
import Admin from "../Admin";
import Exception from "../Exception";

const App = (props) => {
  return (
    <div>
      <Helmet defaultTitle="HÔM NAY ĐỌC GÌ? | Cá nhân hóa thông tin người dùng cần đọc">
        <meta name="description" content="HÔM NAY ĐỌC GÌ?" />
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route path="/home" component={Blog} />
          <Route path="/admin" component={Admin} />
          <Route path="/exception" component={Exception} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
