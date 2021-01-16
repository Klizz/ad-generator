import './App.css';
import React from 'react';
import Home from "./pages/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
