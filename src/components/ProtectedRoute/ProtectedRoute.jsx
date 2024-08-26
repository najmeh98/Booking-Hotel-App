import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAthenticated) navigate("/login ");
  }, [isAthenticated, navigate]);

  return isAthenticated ? children : null;
}
