/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logOut, useCurrentToken } from "../redux/fetures/auth/authSlice";
import { verifyToken } from "../utils/varifyToken";

const TenantProtectedRoute = ({ children, role }) => {
    const token = useSelector(useCurrentToken);
    const dispatch = useDispatch();

    let user;
    if (token) {
        user = verifyToken(token);
    }    
    // const { data, isLoading } = tenantApi.useIsOwnerActiveOrNotQuery(user?.userId, {
    //     skip: !user?.userId,  
    // });

    // if(isLoading){
    //     return <div className="w-ful h-screen flex items-center justify-center" >
    //         <p className="text-xl text-center font-semibold" >Loading...</p>
    //     </div>
    // }

    if (!user) {
        return <Navigate to="/signin" replace={true}></Navigate>;
    }
    // if (data?.data?.subscriptionStatus !== "active") {
    //     toast.warning("Your account owner currently does not have an active subscription.")
    //     dispatch(logOut());
    //     return <Navigate to="/signin" replace={true}></Navigate>;
    // }

    if (role !== undefined && role !== user?.role) {
        dispatch(logOut());
        return <Navigate to="/signin" replace={true}></Navigate>;
    }
    if (!token) {
        return <Navigate to="/signin" replace={true}></Navigate>;
    }

    return children;
};

export default TenantProtectedRoute;
