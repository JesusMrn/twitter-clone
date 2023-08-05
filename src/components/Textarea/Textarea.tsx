import React from "react";

import styles from "./css/Textarea.module.css";

interface Props {
  value?: string | number | readonly string[];
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

export const Textarea: React.FC<Props> = ({
  value,
  name,
  disabled,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      value={value}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
