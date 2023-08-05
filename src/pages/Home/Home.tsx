import React, { useCallback, useContext, useEffect, useState } from "react";

import moment from "moment";

import { getTweets, publishTweet } from "../../api/tweet";
import { Button } from "../../components";
import { Textarea } from "../../components/Textarea/Textarea";
import { TweetDisplay } from "../../components/Tweet/TweetDisplay";
import { TweetsList } from "../../components/Tweet/TweetsList";
import { GlobalContext } from "../../context/Global";
import { Tweet } from "../../models";
import styles from "./css/Home.module.css";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const { userAccount } = useContext(GlobalContext);

  const [feed, setFeed] = useState<Tweet[]>([]);
  const [newTweet, setNewTweet] = useState<string>("");

  const navigate = useNavigate();

  const fetchTweets = useCallback(async () => {
    const res = await getTweets();
    setFeed(res);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await fetchTweets();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [fetchTweets]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet(event.target.value);
  };

  const handleTweetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tweet: Tweet = {
      content: newTweet,
      user: userAccount,
      date: moment().unix(),
      comments: [],
    };
    try {
      await publishTweet(tweet);
      await fetchTweets();
      setNewTweet("");
    } catch (error) {
      console.error(error);
    }
  };

  const goToTweet = (id: number) => () => {
    navigate(`/tweet/${id}`);
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>Home</div>
      <form className={styles.newTweet} onSubmit={handleTweetSubmit}>
        <Textarea
          placeholder="What's happening?"
          value={newTweet}
          onChange={handleChange}
        />
        <div className={styles.tweetButtonFrame}>
          <Button
            type="submit"
            disabled={!newTweet}
            className={styles.tweetButton}
          >
            Tweet
          </Button>
        </div>
      </form>
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
