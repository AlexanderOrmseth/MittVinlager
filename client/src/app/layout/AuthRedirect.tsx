import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
const AuthRedirect = ({ children }: { children: JSX.Element }) => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();
  return !user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    children
  );
};
export default AuthRedirect;
