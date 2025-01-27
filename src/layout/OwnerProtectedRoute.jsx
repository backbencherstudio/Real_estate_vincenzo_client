/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logOut, useCurrentToken } from "../redux/fetures/auth/authSlice";
import { verifyToken } from "../utils/varifyToken";
import authApi from "../redux/fetures/auth/authApi";
import { Spin } from "antd";
import { useEffect, useState } from "react";

const OwnerProtectedRoute = ({ children, role }) => {
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  const [shouldRefetch, setShouldRefetch] = useState(true);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const { data, isLoading, refetch } = authApi.useGetSingleUserInfoQuery(user?.email, {
    refetchOnMountOrArgChange: true,
    skip: !user?.email, 
  });

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false); 
    }
  }, [shouldRefetch, refetch]);

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user?.customerId) {
    dispatch(logOut());
    return <Navigate to="/signin" replace />;
  }

  if (data?.data?.subscriptionStatus !== "active") {
    console.log("Redirecting to subscription plan");
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
