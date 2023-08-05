import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Input } from "../../components";
import { GlobalContext } from "../../context/Global";
import styles from "./css/Login.module.css";

interface FormData {
  username: string;
  tag: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const { updateUserAccount } = useContext(GlobalContext);

  const [data, setData] = useState<FormData>({
    username: "",
    tag: "",
  });

  const { username, tag } = data;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserAccount(data);
    navigate("/home");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <div className={styles.title}>Welcome to Twitter</div>
        <Input
          value={username}
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <Input
          value={tag}
          name="tag"
          placeholder="@tag"
          onChange={handleChange}
        />
        <Button
          className={styles.loginButton}
          disabled={!data.username || !data.tag}
          type="submit"
        >
          Login
        </Button>
      </div>
    </form>
  );
};
