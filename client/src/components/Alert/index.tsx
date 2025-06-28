import { useContext, useEffect } from "react";

import { AlertsContext } from "../../context/Alerts";
import { IAlert } from "../../types/entities/alert";
import { REMOVE_ALERT } from "../../actionTypes/alert";

import "./styles.scss";

interface Props {
  alert: IAlert;
}

const Alert = (props: Props): JSX.Element => {
  const { alert } = props;
  const alertsContext = useContext(AlertsContext);
  const [, dispatch] = alertsContext || [];

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch!({ type: REMOVE_ALERT, payload: alert.id });
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert.id, dispatch]);

  return (
    <div key={alert.id} className={`alert-container ${alert.type}`}>
      {alert.message}
    </div>
  );
};

export default Alert;
