import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import "./styles.scss";

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  secondary?: boolean;
  children: ReactNode;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: Props): JSX.Element => {
  const { className, style, type, secondary, children, handleClick } = props;

  return (
    <button
      className={`btn ${className} ${secondary ? "secondary" : ""}`}
      style={style}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
