import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function RequireAuth({ children }: Props) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
