/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logOut, useCurrentToken } from "../redux/fetures/auth/authSlice";
import { verifyToken } from "../utils/varifyToken";
import ownerApi from "../redux/fetures/owner/ownerApi";

const OwnerProtectedRoute = ({ children, role }) => {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();
  let user;

  
  if (token) {
    user = verifyToken(token);
  }
  
  const { data, isLoading } = ownerApi.useIsOwnerActiveQuery(user?.email, {
    skip: !user?.email, 
  });  

  if(isLoading){
    return <div className="w-ful h-screen flex items-center justify-center" >
        <p className="text-xl text-center font-semibold" >Loading...</p>
    </div>
}

  if (user?.customerId && !user?.customerId) {
    dispatch(logOut());
    return <Navigate to="/signin" replace />;
  }

  if (!user?.subscriptionStatus  || data?.data?.subscriptionStatus !== "active" ) {
    dispatch(logOut());
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
