import { IAuthState } from "../types/states/auth";
import {
  LOGIN_ADMIN,
  LOGIN_ADMIN_FAIL,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_ADMIN,
  TOKEN_VALIDATION,
  TOKEN_VALIDATION_FAIL,
  TOKEN_VALIDATION_SUCCESS,
} from "../actionTypes/auth";
import { TAuthAction } from "../types/actions/auth";

export const initState: IAuthState = {
  isLoading: null,
  isAuthenticated: null,
  admin: null,
  token: null,
};

export const authReducer = (
  state: IAuthState,
  action: TAuthAction
): IAuthState => {
  switch (action.type) {
    case TOKEN_VALIDATION:
    case LOGIN_ADMIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_ADMIN_SUCCESS:
      const {
        payload: { token, admin },
      } = action;
      sessionStorage.setItem("token", token);

      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token,
        admin,
      };
    case TOKEN_VALIDATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: sessionStorage.getItem("token"),
        admin: action.payload,
      };
    case LOGIN_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case TOKEN_VALIDATION_FAIL:
    case LOGOUT_ADMIN:
      sessionStorage.removeItem("token");

      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        admin: null,
      };
    default:
      return state;
  }
};
