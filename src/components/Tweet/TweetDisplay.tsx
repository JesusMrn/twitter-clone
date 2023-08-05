import moment from "moment";
import React from "react";

import { FaRegComment } from "react-icons/fa";

import { Tweet } from "../../models";
import styles from "./css/Tweet.module.css";

interface Props {
  tweet: Tweet;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export const TweetDisplay: React.FC<Props> = ({
  tweet,
  onClick,
  className,
}) => {
  const formatDate = (timestamp: number): string => {
    const date = moment.unix(timestamp).utc();
    const actualDate = moment().utc();
    const difference = actualDate.diff(date, "seconds");

    if (difference < 60) {
      return `${difference} s`;
    } else if (difference < 3600) {
      return `${Math.round(difference / 60)} min`;
    }
    if (difference < 216000) {
      return `${Math.round(difference / 3600)} h`;
    }
    if (difference < 31536000) {
      return date.format("MMM DD");
    }

    return date.format("MMM DD yyyy");
  };

  return (
    <div className={`${styles.container} ${className}`} onClick={onClick}>
      <div className={styles.info}>
        <div className={styles.user}>
          <div className={styles.name}>{tweet.user.username}</div>
          <div className={styles.tag}>{`@${tweet.user.tag}`}</div>
        </div>
        <div className={styles.date}>{formatDate(tweet.date)}</div>
      </div>
      <div className={styles.tweet}>{tweet.content}</div>
      <div className={styles.commentsCounter}>
        <FaRegComment />
        {tweet.comments.length}
      </div>
    </div>
  );
};
