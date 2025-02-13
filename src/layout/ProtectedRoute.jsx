/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logOut, useCurrentToken } from "../redux/fetures/auth/authSlice";
import { verifyToken } from "../utils/varifyToken";

const ProtectedRoute = ({ children, role }) => {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  let user;
  if (token) {
    user = verifyToken(token);
  }

  console.log(user);
  
  if(!user){
    return <Navigate to="/signin" replace={true}></Navigate>;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/signin" replace={true}></Navigate>;
  }
  if (!token) {
    return <Navigate to="/signin" replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
