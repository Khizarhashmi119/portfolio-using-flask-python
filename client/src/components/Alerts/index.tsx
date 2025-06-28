import { useContext } from "react";

import Alert from "../Alert";

import { AlertsContext } from "../../context/Alerts";

import "./styles.scss";

const Alerts = () => {
  const alertsContext = useContext(AlertsContext);
  const [alerts] = alertsContext || [];

  return (
    <div className="alerts-container">
      {alerts && alerts.length
        ? alerts.map((alert) => <Alert key={alert.id} alert={alert} />)
        : null}
    </div>
  );
};

export default Alerts;
