import { useSelector } from "react-redux";
import authApi from "../../redux/fetures/auth/authApi";
import Profile from "../Profile";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";

const UserProfile = () => {
    const currentUser = useSelector(selectCurrentUser)
    const {data} = authApi.useGetSingleUserInfoQuery(currentUser?.email);
    console.log(data?.data);
    
    return (
        <div>
            <Profile />
        </div>
    );
};

export default UserProfile;