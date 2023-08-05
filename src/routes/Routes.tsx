import React, { useContext, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { GlobalContext } from "../context/Global";

import { Home, Login, MyTweets } from "../pages";
import { TweetPage } from "../pages/TweetPage/TweetPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const Router: React.FC = () => {
  const { userAccount } = useContext(GlobalContext);

  const valid = useMemo(
    () => !!userAccount?.username && !!userAccount?.tag,
    [userAccount?.tag, userAccount?.username]
  );

  return (
    <Routes>
      <Route
        element={<ProtectedRoute isAllowed={valid} redirectPath="/login" />}
      >
        <Route path="/home" element={<Home />} />
        <Route path="/my-tweets" element={<MyTweets />} />
        <Route path="/tweet/:id" element={<TweetPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
      <Route
        path="/login"
        element={valid ? <Navigate to="/home" replace /> : <Login />}
      />
    </Routes>
  );
};
