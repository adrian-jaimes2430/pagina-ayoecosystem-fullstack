import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: JSX.Element;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
