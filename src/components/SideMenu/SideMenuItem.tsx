import React, { useMemo } from "react";

import classNames from "classnames/bind";

import styles from "./css/SideMenuItem.module.css";
import { useContext } from "react";
import { SideMenuContext } from "./SideMenuContext";

const cx = classNames.bind(styles);

interface Props {
  icon: React.ReactElement;
  name: string | number;
  iconOnSelection?: React.ReactElement;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SideMenuItem: React.FC<Props> = ({
  icon,
  name,
  iconOnSelection,
  children,
  onClick,
}) => {
  const { selected, setSelected } = useContext(SideMenuContext);

  const isSelected = useMemo(() => selected === name, [name, selected]);

  const itemClassName = cx({ item: true, itemSelected: isSelected });

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSelected(name);
    onClick?.(event);
  };

  return (
    <button onClick={handleClick} className={itemClassName}>
      <div className={styles.icon}>
        {isSelected && iconOnSelection ? iconOnSelection : icon}
      </div>
      <div className={styles.content}>{children}</div>
    </button>
  );
};
