import { createContext, Dispatch, ReactNode, useReducer } from "react";

import { alertReducer, initState } from "../reducers/alert";
import { IAlert } from "../types/entities/alert";
import { TAlertAction } from "../types/actions/alert";

export const AlertsContext = createContext<
  [IAlert[], Dispatch<TAlertAction>] | null
>(null);

interface Props {
  children: ReactNode;
}

export const AlertsContextProvider = (props: Props): JSX.Element => {
  const { children } = props;
  const [alerts, dispatch] = useReducer(alertReducer, initState);

  return (
    <AlertsContext.Provider value={[alerts, dispatch]}>
      {children}
    </AlertsContext.Provider>
  );
};
