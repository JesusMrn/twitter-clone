import axios from "axios";

import { Account, Tweet } from "../models";

const ENDPOINT = "tweets";

export const publishTweet = async (tweet: Tweet): Promise<number> => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/${ENDPOINT}`,
    tweet
  );
  if (res.status < 200 || res.status >= 300) throw Error(res.statusText);
  return res.data.id;
};

export const editTweet = async (tweet: Tweet): Promise<number> => {
  const res = await axios.put(
    `${process.env.REACT_APP_SERVER}/${ENDPOINT}/${tweet.id}`,
    tweet
  );
  if (res.status < 200 || res.status >= 300) throw Error(res.statusText);
  console.log(res.data);
  return res.data.id;
};

export const getTweets = async (): Promise<Tweet[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER}/${ENDPOINT}?_sort=date&_order=desc`
  );
  if (res.status < 200 || res.status >= 300) throw Error(res.statusText);
  return res.data;
};

export const getTweet = async (id: number): Promise<Tweet> => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER}/${ENDPOINT}?id=${id}`
  );
  if (res.status < 200 || res.status >= 300) throw Error(res.statusText);
  return res.data[0];
};

export const getUserTweets = async (user: Account): Promise<Tweet[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER}/${ENDPOINT}?user.username=${user.username}&user.tag=${user.tag}&_sort=date&_order=desc`
  );
  if (res.status < 200 || res.status >= 300) throw Error(res.statusText);
  return res.data;
};

export const getTweetComments = async (id: number): Promise<Tweet[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER}/${ENDPOINT}?comment=${id}&_sort=date&_order=desc`
  );
  if (res.status < 200 || res.status >= 300) throw Error(res.statusText);
  console.log(res.data);
  return res.data;
};
