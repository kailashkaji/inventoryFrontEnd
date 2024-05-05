import { Navigate, Outlet, useLocation } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
const PrivateRoutes = () => {
  const isAuthenticated = useIsAuthenticated();

  const location = useLocation();
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/sign-in" state={{ from: location }} replace={true} />
      )}
    </>
  );
};

export default PrivateRoutes;
