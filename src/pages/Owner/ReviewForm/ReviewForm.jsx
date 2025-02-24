import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import authApi from "../../../redux/fetures/auth/authApi";
import { url } from "../../../globalConst/const";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { toast } from "sonner";


const ReviewForm = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { data  } = authApi.useGetSingleUserInfoQuery(currentUser?.email);
    const [createReviewFromOwner] = ownerApi.useCreateReviewFromOwnerMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    

    const onSubmit = async (formData) => {
        const review = ({ ...formData, image: data?.data?.profileImage, name : data?.data?.name, email : data?.data?.email });
        const res  = await createReviewFromOwner(review)
        if(res?.data?.success){
            toast.success(res?.data?.message)
            reset()
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-md">
            <div>
                <label className="block">Message:</label>
                <input
                    type="text"
                    {...register("message", { required: "Message is required" })}
                    className="border p-2 w-full"
                />
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}
            </div>

            <div>
                <label className="block">Designation:</label>
                <input
                    type="text"
                    {...register("designation", { required: "Designation is required" })}
                    className="border p-2 w-full"
                />
                {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
            </div>

            <div>
                <label className="block">Name:</label>
                <input
                    type="text"
                    placeholder={data?.data?.name}
                    readOnly
                    {...register("name")}
                    className="border p-2 w-full"
                />
            </div>

            <div>
                <label className="block">Image :</label>
                {
                    data?.data?.profileImage ?
                        <img src={`${url}${data?.data?.profileImage}`} className="size-40 rounded-md cursor-pointer" alt="" />
                        :
                        <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
                }
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
            </div>

            <div>
                <label className="block">Rating:</label>
                <input
                    type="number"
                    {...register("reating", { required: "Rating is required", min: 1, max: 5 })}
                    className="border p-2 w-full"
                />
                {errors.reating && <p className="text-red-500">{errors.reating.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
    );
};

export default ReviewForm;
