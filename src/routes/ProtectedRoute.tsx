import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "../layouts";

interface Props {
  isAllowed: boolean;
  redirectPath: string;
  children?: React.ReactElement;
}

export const ProtectedRoute: React.FC<Props> = ({
  isAllowed,
  redirectPath,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? (
    children
  ) : (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
