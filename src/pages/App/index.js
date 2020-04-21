import React from "react";
import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Introduction from "../Introduction";
import Blog from "../Blog";
import AdminPage from "../Admin";

const App = (props) => {
  return (
    <div>
      <Helmet defaultTitle="HÔM NAY ĐỌC GÌ? | Tổng hợp nội dung">
        <meta name="description" content="HÔM NAY ĐỌC GÌ?" />
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route path="/home/:userName" component={Blog} />
          <Route path="/home" component={Blog} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/front-end" component={Blog} />
          <Route path="/back-end" component={Blog} />
          <Route path="/ai-ml-dl" component={Blog} />
          <Route path="/ngoai-chuyen-mon" component={Blog} />
          <Route path="/ke-hoach-sx" component={Blog} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
