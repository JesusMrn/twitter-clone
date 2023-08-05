import React from "react";

import styles from "./css/Button.module.css";

export interface Props {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  type,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};
