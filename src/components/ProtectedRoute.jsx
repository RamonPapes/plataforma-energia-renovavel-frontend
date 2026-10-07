import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ perfis, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (perfis && !perfis.includes(user.perfil)) return <Navigate to="/" replace />;
  return children;
}
