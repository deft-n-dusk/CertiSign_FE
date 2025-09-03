// src/layouts/ProtectedLayout.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";



export default function PrivateRoute() {
  const isAuthenticated = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) {
  return (
    <h1>Loading...</h1>
  );
}
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
