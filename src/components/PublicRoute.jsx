import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function PublicRoute() {
  const {isAuthenticated, loading} = useAuth();
 

  if (loading) return <h1>Loading...</h1>;

  return isAuthenticated ? <Navigate to="/upload" /> : <Outlet />;
}
