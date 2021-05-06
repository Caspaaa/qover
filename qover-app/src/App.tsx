import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QuoteForm } from "./components/QuoteForm";
import { Login } from "./components/Login";
import { Offer } from "./components/Offer";
import { WithAuth } from "./components/WithAuth";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="qover">
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/quote-form" exact>
              <WithAuth>
                <QuoteForm />
              </WithAuth>
            </Route>
            <Route path="/offer" exact>
              <WithAuth>
                <Offer />
              </WithAuth>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
