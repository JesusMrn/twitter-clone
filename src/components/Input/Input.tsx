import React from "react";

import styles from "./css/Input.module.css";

export interface Props {
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const Input: React.FC<Props> = ({
  type,
  value,
  name,
  disabled,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      type={type}
      value={value}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
