import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";

import { authReducer, initState } from "../reducers/auth";
import { IAuthState } from "../types/states/auth";
import { STATUS_SUCCESS } from "../constants";
import { TAuthAction } from "../types/actions/auth";
import {
  TOKEN_VALIDATION,
  TOKEN_VALIDATION_SUCCESS,
  TOKEN_VALIDATION_FAIL,
} from "../actionTypes/auth";
import { validateToken } from "../api/validateToken";

export const AuthContext = createContext<
  [IAuthState, Dispatch<TAuthAction>] | null
>(null);

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = (props: Props): JSX.Element => {
  const { children } = props;
  const [authState, dispatch] = useReducer(authReducer, initState);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      dispatch!({ type: TOKEN_VALIDATION });
      validateToken(token)
        .then(({ status, data }) => {
          if (status === STATUS_SUCCESS)
            dispatch!({ type: TOKEN_VALIDATION_SUCCESS, payload: data.admin });
          else dispatch!({ type: TOKEN_VALIDATION_FAIL });
        })
        .catch(() => {
          dispatch!({ type: TOKEN_VALIDATION_FAIL });
        });
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider value={[authState, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
