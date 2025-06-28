import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import Button from "../shared/Button";

import { LOGOUT_ADMIN } from "../../actionTypes/auth";
import { AuthContext } from "../../context/Auth";
import { ThemeContext } from "../../context/Theme";

import "./styles.scss";
import { AlertsContext } from "../../context/Alerts";
import { ADD_ALERT } from "../../actionTypes/alert";

const Header = (): JSX.Element => {
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const alertsContext = useContext(AlertsContext);
  const { pathname } = useLocation();
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [authState, authDispatch] = authContext || [];
  const { isAuthenticated } = authState || {};
  const [theme, setTheme] = themeContext || [];
  const [, alertsDispatch] = alertsContext || [];

  const handleClickMenuButton = () => {
    setIsNavbarActive((prevState) => !prevState);
  };

  const handleClickLogout = () => {
    authDispatch!({ type: LOGOUT_ADMIN });
    alertsDispatch!({
      type: ADD_ALERT,
      payload: {
        type: "success",
        message: "Logged out",
      },
    });
  };

  const handleClickSun = () => {
    setTheme!("light");
  };

  const handleClickMoon = () => {
    setTheme!("dark");
  };

  return (
    <header id="header">
      <nav className="navbar">
        <Link to="/">
          <h1 className="logo">😎 KHIZAR</h1>
        </Link>
        <ul className={`navbar-links ${isNavbarActive && "navbar-active"}`}>
          <li className="navbar-item">
            <NavLink className="navbar-link" to="/">
              /Home
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className="navbar-item">
              <NavLink className="navbar-link" to="/dashboard">
                /Dashboard
              </NavLink>
            </li>
          )}
          <li className="navbar-item">
            <NavLink className="navbar-link" to="/projects">
              /Projects
            </NavLink>
          </li>
          {!isAuthenticated && (
            <li className="navbar-item">
              <NavLink className="navbar-link" to="/login">
                /login
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <li className="navbar-item">
              <Button
                className="logout-button"
                handleClick={handleClickLogout}
                secondary
              >
                Logout
              </Button>
            </li>
          )}
          {pathname !== "/" &&
            (theme === "dark" ? (
              <svg
                className="theme-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={handleClickSun}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                className="theme-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={handleClickMoon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ))}
        </ul>
        <Button
          className="navbar-menu-button"
          handleClick={handleClickMenuButton}
          secondary
        >
          Menu
        </Button>
      </nav>
    </header>
  );
};

export default Header;
