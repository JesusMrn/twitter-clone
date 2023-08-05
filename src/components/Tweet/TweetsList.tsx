import React from "react";

import styles from "./css/TweetsList.module.css";

interface Props {
  children?: React.ReactNode;
}

export const TweetsList: React.FC<Props> = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};
