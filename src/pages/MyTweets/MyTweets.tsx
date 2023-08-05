import React, { useCallback, useContext, useEffect, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { getUserTweets } from "../../api/tweet";
import { TweetDisplay } from "../../components/Tweet/TweetDisplay";
import { TweetsList } from "../../components/Tweet/TweetsList";
import { GlobalContext } from "../../context/Global";
import { Tweet } from "../../models";
import styles from "./css/MyTweets.module.css";

export const MyTweets: React.FC = () => {
  const { userAccount } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [feed, setFeed] = useState<Tweet[]>([]);

  const fetchTweets = useCallback(async () => {
    const res = await getUserTweets(userAccount);
    setFeed(res);
  }, [userAccount]);

  useEffect(() => {
    (async () => {
      try {
        await fetchTweets();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [fetchTweets]);

  const onBackClick = () => {
    navigate(-1);
  };

  const goToTweet = (id: number) => () => {
    navigate(`/tweet/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBackClick} className={styles.backButton}>
          <IoIosArrowBack />
        </button>
        <div className={styles.title}>My Tweets</div>
      </div>
      <TweetsList>
        {feed.map((tweet) => (
          <TweetDisplay
            key={tweet.id}
            onClick={goToTweet(tweet.id!)}
            tweet={tweet}
          />
        ))}
      </TweetsList>
    </div>
  );
};
