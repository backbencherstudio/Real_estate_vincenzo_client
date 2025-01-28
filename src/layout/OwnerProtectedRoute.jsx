/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logOut, useCurrentToken } from "../redux/fetures/auth/authSlice";
import { verifyToken } from "../utils/varifyToken";

const OwnerProtectedRoute = ({ children, role }) => {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  let user;
  if (token) {
    user = verifyToken(token);
  }
  

  if (user?.customerId && !user?.customerId) {
    dispatch(logOut());
    return <Navigate to="/signin" replace />;
  }

  if (!user?.subscriptionStatus || user?.subscriptionStatus !== "active") {
    return <Navigate to="/subscription-plan" replace />;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/signin" replace />;
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default OwnerProtectedRoute;
