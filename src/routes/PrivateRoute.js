import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute(props) {
  const { children } = props;
  const { user } = useAuth();

  if (user) {
    return children;
  } else {
    return <Navigate replace to="/login" />;
  }
}
