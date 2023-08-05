import React, { useCallback, useContext, useEffect, useState } from "react";

import moment from "moment";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import {
  editTweet,
  getTweet,
  getTweetComments,
  getUserTweets,
  publishTweet,
} from "../../api/tweet";
import { Button } from "../../components";
import { Textarea } from "../../components/Textarea/Textarea";
import { TweetDisplay } from "../../components/Tweet/TweetDisplay";
import { TweetsList } from "../../components/Tweet/TweetsList";
import { GlobalContext } from "../../context/Global";
import { Tweet } from "../../models";
import styles from "./css/TweetPage.module.css";

export const TweetPage: React.FC = () => {
  const { userAccount } = useContext(GlobalContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const [tweet, setTweet] = useState<Tweet>();
  const [comments, setComments] = useState<Tweet[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const fetchTweet = useCallback(async (id: number) => {
    const res = await getTweet(id);
    setTweet(res);
  }, []);

  const fetchComments = useCallback(async () => {
    const res = await getTweetComments(Number(id));
    console.log(res);
    setComments(res);
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleTweetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTweet: Tweet = {
      content: newComment,
      user: userAccount,
      date: moment().unix(),
      comment: tweet?.id,
      comments: [],
    };
    try {
      const newId = await publishTweet(newTweet);
      await editTweet({ ...tweet!, comments: [...tweet!.comments, newId] });
      await fetchComments();
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchTweet(Number(id));
        await fetchComments();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [fetchComments, fetchTweet, id]);

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBackClick} className={styles.backButton}>
          <IoIosArrowBack />
        </button>
        <div className={styles.title}>My Tweets</div>
      </div>
      {tweet ? (
        <>
          <TweetDisplay className={styles.tweet} tweet={tweet} />
          <form className={styles.newTweet} onSubmit={handleTweetSubmit}>
            <Textarea
              placeholder="Tweet your reply?"
              value={newComment}
              onChange={handleChange}
            />
            <div className={styles.tweetButtonFrame}>
              <Button
                type="submit"
                disabled={!newComment}
                className={styles.tweetButton}
              >
                Reply
              </Button>
            </div>
          </form>
          <TweetsList>
            {comments.map((tweet) => (
              <TweetDisplay key={tweet.id} tweet={tweet} />
            ))}
          </TweetsList>
        </>
      ) : (
        <div className={styles.notFound}>Tweet Not Found</div>
      )}
    </div>
  );
};
