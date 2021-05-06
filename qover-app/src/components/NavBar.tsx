import * as React from "react";
import { useHistory } from "react-router-dom";

interface Props {}

export const NavBar: React.FunctionComponent<Props> = () => {
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const previousPage = () => {
    localStorage.clear();
    history.push("/quote-form");
  };

  return (
    <div className="nav">
      <span className="previous" onClick={previousPage}>
        qover.me
      </span>
      <span onClick={logOut}>logout</span>
    </div>
  );
};
