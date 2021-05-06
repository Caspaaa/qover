import React from "react";
import { Redirect } from "react-router-dom";

export const WithAuth: React.FunctionComponent = (props: any) => {
  const [state, setState] = React.useState({
    loading: true,
    redirect: false,
  });
  console.log("state", state);
  React.useEffect(() => {
    fetch("http://localhost:5000/api/checkToken", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      const status = response.status;
      if (status !== 200) {
        setState({ loading: false, redirect: true });

        return;
      }

      setState({ ...state, loading: false });
    });
  }, []);

  const { loading, redirect } = state;
  if (loading) {
    return null;
  }
  if (redirect) {
    return <Redirect to="/" />;
  }
  return props.children;
};
