import { ChangeEvent, FormEvent, Fragment, useContext, useState } from "react";

import Button from "../../components/shared/Button";

import { AuthContext } from "../../context/Auth";
import { login } from "../../api/login";
import {
  LOGIN_ADMIN,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAIL,
} from "../../actionTypes/auth";
import { STATUS_SUCCESS } from "../../constants";

import "./styles.scss";
import { AlertsContext } from "../../context/Alerts";
import { ADD_ALERT } from "../../actionTypes/alert";

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const authContext = useContext(AuthContext);
  const alertsContext = useContext(AlertsContext);
  const { email, password } = loginFormData;
  const [, authDispatch] = authContext || [];
  const [, alertsDispatch] = alertsContext || [];

  const handleChangeLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authDispatch!({ type: LOGIN_ADMIN });
    const { status, data } = await login(email, password);

    if (status === STATUS_SUCCESS) {
      authDispatch!({
        type: LOGIN_ADMIN_SUCCESS,
        payload: {
          token: data.access_token,
          admin: data.admin,
        },
      });

      alertsDispatch!({
        type: ADD_ALERT,
        payload: {
          type: "success",
          message: "Logged in",
        },
      });
    } else {
      authDispatch!({
        type: LOGIN_ADMIN_FAIL,
      });

      data.messages.forEach((message) =>
        alertsDispatch!({
          type: ADD_ALERT,
          payload: {
            type: "error",
            message: message,
          },
        })
      );
    }
  };

  return (
    <Fragment>
      <main>
        <section id="login">
          <div className="container">
            <h1 className="login-title">Login In</h1>
            <form className="login-form" onSubmit={handleSubmitLoginForm}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="login-input-email"
                type="email"
                name="email"
                value={email}
                onChange={handleChangeLoginInput}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                className="login-input-password"
                type="password"
                name="password"
                value={password}
                onChange={handleChangeLoginInput}
                required
              />
              <Button className="login-btn" type="submit">
                Login
              </Button>
            </form>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default LoginPage;
