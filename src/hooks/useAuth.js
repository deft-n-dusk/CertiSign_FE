import { useEffect, useState } from "react";
import api from "../api";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/check", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data.authenticated) {
          setIsAuthenticated(true);
          setUser(res.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          // User is simply not logged in.. not an error
          setIsAuthenticated(false);
          setUser(null);
        } else {
          console.error("Unexpected auth error:", err);
        }
      })
      .finally(() => {
        setLoading(false); // Always stop loading
      });
  }, []);

  return { isAuthenticated, user, loading };
}
