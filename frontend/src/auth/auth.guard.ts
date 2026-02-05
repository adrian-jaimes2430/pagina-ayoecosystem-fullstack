import { useAuth } from "@/hooks/useAuth";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  return children;
}
