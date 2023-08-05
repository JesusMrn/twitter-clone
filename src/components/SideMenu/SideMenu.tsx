import React from "react";

import styles from "./css/SideMenu.module.css";
import { SideMenuProvider } from "./SideMenuContext";

interface Props {
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const SideMenu: React.FC<Props> = ({ children, footer }) => {
  return (
    <SideMenuProvider>
      <div className={styles.menu}>
        <div className={styles.itemList}>{children}</div>
        <div className={styles.footer}>{footer}</div>
      </div>
    </SideMenuProvider>
  );
};
