import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

import Introduction from "../Introduction";
import Blog from "../Blog";

const App = () => {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="THE BEST CONTENT WRITING COLLECTION"
      >
        <meta
          name="description"
          content="THE BEST CONTENT WRITING COLLECTION"
        />
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route path="/home" component={Blog} />
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
