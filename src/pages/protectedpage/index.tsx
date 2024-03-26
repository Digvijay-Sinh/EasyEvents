import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage: FC<ProtectedPageProps> = ({ children }) => {
  const { auth } = useAuth();
  if (!auth.accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedPage;
