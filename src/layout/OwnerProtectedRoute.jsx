// /* eslint-disable react/prop-types */
//  import { useSelector, useDispatch } from "react-redux";
//  import { Navigate } from "react-router-dom";
//  import { logOut, useCurrentToken } from "../redux/fetures/auth/authSlice";
//  import { verifyToken } from "../utils/varifyToken";
//  import ownerApi from "../redux/fetures/owner/ownerApi";
//  const OwnerProtectedRoute = ({ children, role }) => {
//    const token = useSelector(useCurrentToken);
//    const dispatch = useDispatch();
//    const user = token ? verifyToken(token) : null;
//    const { data, isLoading } = ownerApi.useIsOwnerActiveQuery(user?.email, {
//      skip: !user?.email,
//    });

//    console.log(data?.data?.subscriptionStatus);
   

//    if (isLoading) {
//      return (
//        <div className="w-full h-screen flex items-center justify-center">
//          <p className="text-xl text-center font-semibold">Loading...</p>
//        </div>
//      );
//    }
   
//    if (data?.data?.subscriptionStatus !== "active") {
//      dispatch(logOut());
//      return <Navigate to="/subscription-plan" replace />;
//    }
   
//    if (role && role !== data?.data?.role) {
//      dispatch(logOut());
//      return <Navigate to="/signin" replace />;
//    }

//    return children;
//  };
//  export default OwnerProtectedRoute;



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












/* eslint-disable react/prop-types */
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { logOut, useCurrentToken } from "../redux/fetures/auth/authSlice";
// import { verifyToken } from "../utils/varifyToken";

// const OwnerProtectedRoute = ({ children, role }) => {
//   const token = useSelector(useCurrentToken);
//   const dispatch = useDispatch();

//   let user;
//   if (token) {
//     user = verifyToken(token);
//   }
  

//   if (user?.customerId && !user?.customerId) {
//     dispatch(logOut());
//     return <Navigate to="/signin" replace />;
//   }

//   if (!user?.subscriptionStatus || user?.subscriptionStatus !== "active") {
//     return <Navigate to="/subscription-plan" replace />;
//   }

//   if (role !== undefined && role !== user?.role) {
//     dispatch(logOut());
//     return <Navigate to="/signin" replace />;
//   }

//   if (!token) {
//     return <Navigate to="/signin" replace />;
//   }

//   return children;
// };

// export default OwnerProtectedRoute;
