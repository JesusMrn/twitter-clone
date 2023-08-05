import React, { useContext } from "react";

import { GoHome, GoHomeFill } from "react-icons/go";
import { MdMailOutline, MdMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { SideMenuItem } from "../../components/SideMenu/SideMenuItem";
import { GlobalContext } from "../../context/Global";
import styles from "./css/AppLayout.module.css";

interface Props {
  children?: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  const { userAccount, clearUserAccount } = useContext(GlobalContext);

  const navigate = useNavigate();

  const navigateTo =
    (path: string) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      navigate(path);
    };

  return (
    <div className={styles.layout}>
      <SideMenu
        footer={
          <div className={styles.footer}>
            <p>{userAccount.username}</p>
            <p className={styles.tag}>{`@${userAccount.tag}`}</p>
          </div>
        }
      >
        <SideMenuItem
          name="home"
          icon={<GoHome />}
          iconOnSelection={<GoHomeFill />}
          onClick={navigateTo("/home")}
        >
          Home
        </SideMenuItem>
        <SideMenuItem
          name="my-tweets"
          icon={<MdMailOutline />}
          iconOnSelection={<MdMail />}
          onClick={navigateTo("/my-tweets")}
        >
          My tweets
        </SideMenuItem>
        <Button
          onClick={() => {
            clearUserAccount();
          }}
        >
          Logout
        </Button>
      </SideMenu>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
