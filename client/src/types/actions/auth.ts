import {
  LOGIN_ADMIN,
  LOGIN_ADMIN_FAIL,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_ADMIN,
  TOKEN_VALIDATION,
  TOKEN_VALIDATION_FAIL,
  TOKEN_VALIDATION_SUCCESS,
} from "../../actionTypes/auth";
import { IAdmin } from "../entities/admin";

export interface IAuthLoginAction {
  type: typeof LOGIN_ADMIN;
}

export interface ITokenValidationAction {
  type: typeof TOKEN_VALIDATION;
}

export interface IAuthLoginSuccessAction {
  type: typeof LOGIN_ADMIN_SUCCESS;
  payload: {
    admin: IAdmin;
    token: string;
  };
}

export interface IAuthLoginFailAction {
  type: typeof LOGIN_ADMIN_FAIL;
}

export interface ITokenValidationSuccessAction {
  type: typeof TOKEN_VALIDATION_SUCCESS;
  payload: IAdmin;
}

export interface ITokenValidationFailAction {
  type: typeof TOKEN_VALIDATION_FAIL;
}

export interface IAuthLogoutAction {
  type: typeof LOGOUT_ADMIN;
}

export type TAuthAction =
  | IAuthLoginAction
  | IAuthLoginSuccessAction
  | IAuthLoginFailAction
  | ITokenValidationAction
  | ITokenValidationSuccessAction
  | ITokenValidationFailAction
  | IAuthLogoutAction;
