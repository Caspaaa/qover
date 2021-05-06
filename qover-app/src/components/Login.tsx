import * as React from "react";
import { Footer } from "./Footer";
import { useHistory } from "react-router-dom";
import white from "../assets/images/white.png";
import white2x from "../assets/images/white@2x.png";
import white3x from "../assets/images/white@3x.png";
import checked from "../assets/images/checked-no-label.png";
import checked2x from "../assets/images/checked-no-label@2x.png";
import checked3x from "../assets/images/checked-no-label@3x.png";

interface Props {}

export const Login: React.FunctionComponent<Props> = () => {
  let history = useHistory();

  const [user, setUser] = React.useState({
    login: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/getToken", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJSON = await response.json();

      localStorage.setItem("token", responseJSON.token);

      history.push("/quote-form");
    } catch (error) {
      console.error(error);
      alert("Error logging in please try again");
    }
  };

  return (
    <div className="qover--login full-height">
      <div className="login">
        <img
          src={white}
          srcSet={`${white2x} 2x, ${white3x} 3x`}
          className="logo"
        />
        <div className="login__form">
          <h1>Welcome at Qover</h1>
          <form onSubmit={onSubmit}>
            <label>Email</label>
            <input
              type="text"
              name="login"
              value={user.login}
              onChange={handleInputChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
            <div className="form-options">
              <div>
                <img
                  className="checked-no-label"
                  src={checked}
                  srcSet={`${checked2x} 2x, ${checked3x} 3x`}
                />
                <p className="remember-me">Remember me</p>
              </div>
              <p>
                <a className="forgot-your-password">Forgot your password?</a>
              </p>
            </div>
            <input
              className="button button--sign-in"
              type="submit"
              value="Sign in to your account"
            />
          </form>
        </div>
        <div className="button button--no-account">
          <p>
            Don't have an account? <a href="#">Ask access</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
