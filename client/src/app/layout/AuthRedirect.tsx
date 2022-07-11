import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../store/configureStore";
const AuthRedirect = ({children}: {children: JSX.Element}) => {
  let {user} = useAppSelector((state) => state.account);
  let location = useLocation();
  return !user ? (
    <Navigate to="/" state={{from: location}} replace />
  ) : (
    children
  );
};
export default AuthRedirect;
