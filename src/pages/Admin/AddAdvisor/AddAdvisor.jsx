import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { url } from "../../../globalConst/const";
import adminApi from "../../../redux/fetures/admin/adminApi";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { toast } from "sonner";
import { IoMdTrash } from "react-icons/io";

const AddAdvisor = () => {
    const [realEstateAdvisor, { isLoading: addIsLoading }] = adminApi.useRealEstateAdvisorMutation();
    const { data, isLoading, refetch } = adminApi.useGetAdvisersDataQuery();
    const [realEstateAdvisordelete, { isLoading: deleteIsLoading }] = adminApi.useRealEstateAdvisordeleteMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('designation', formData.designation);
            formDataToSend.append('image', formData.image[0]);
            formDataToSend.append('facebook', formData.facebook || '');
            formDataToSend.append('twitter', formData.twitter || '');
            formDataToSend.append('instagram', formData.instagram || '');
            formDataToSend.append('linkedin', formData.linkedin || '');

            const response = await realEstateAdvisor(formDataToSend);
            if (response.data?.success) {
                toast.success('Advisor added successfully!');
                await refetch();
                reset();
            }
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    const handleDelete = async (advisorId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await realEstateAdvisordelete(advisorId);
                await refetch();
                await Swal.fire(
                    'Deleted!',
                    'Advisor has been deleted.',
                    'success'
                );
            }
        } catch (error) {
            Swal.fire(
                'Error!',
                'Failed to delete advisor.',
                'error'
            );
        }
    };

    return (
        <div className="px-4">
            <h2 className="text-3xl font-bold ">Add Real Estate Advisor</h2>
            <div className=" mb-6">
                <div className="text-sm text-gray-500">
                    User Management / Add Real Estate Advisor
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="  bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter advisor name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Image Upload Field */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image Upload</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", { required: "Image is required" })}
                            className="w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                    </div>
                    {/* Designation Field */}
                    <div className="col-span-2 md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                        <input
                            type="text"
                            {...register("designation", { required: "Designation is required" })}
                            className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter designation"
                        />
                        {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
                    </div>

                    {/* Social Media Links */}
                    <div className="col-span-2 md:col-span-2 grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Facebook</label>
                            <input
                                type="url"
                                {...register("facebook", { pattern: { value: /^https?:\/\/.+/, message: "Enter valid URL" } })}
                                className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://facebook.com/profile"
                            />
                            {errors.facebook && <p className="text-red-500 text-xs mt-1">{errors.facebook.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Twitter</label>
                            <input
                                type="url"
                                {...register("twitter", { pattern: { value: /^https?:\/\/.+/, message: "Enter valid URL" } })}
                                className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://twitter.com/profile"
                            />
                            {errors.twitter && <p className="text-red-500 text-xs mt-1">{errors.twitter.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Instagram</label>
                            <input
                                type="url"
                                {...register("instagram", { pattern: { value: /^https?:\/\/.+/, message: "Enter valid URL" } })}
                                className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://instagram.com/profile"
                            />
                            {errors.instagram && <p className="text-red-500 text-xs mt-1">{errors.instagram.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">LinkedIn</label>
                            <input
                                type="url"
                                {...register("linkedin", { pattern: { value: /^https?:\/\/.+/, message: "Enter valid URL" } })}
                                className="w-full px-3 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://linkedin.com/in/profile"
                            />
                            {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin.message}</p>}
                        </div>
                    </div>

                </div>
                <button
                    type="submit"
                    disabled={addIsLoading}
                    className="w-fit bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-bold disabled:bg-blue-300 mt-6"
                >
                    {addIsLoading ? "Adding..." : "Add Advisor"}
                </button>
            </form>

            {
                data?.data?.length > 0 ? (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Current Advisors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
                            {isLoading ? (
                                <p>Loading advisors...</p>
                            ) : (
                                data?.data?.map((advisor) => (
                                    <div key={advisor._id} className="flex flex-col justify-between bg-white rounded-lg shadow-md p-4">
                                        <div>
                                            <img
                                                src={`${url}${advisor?.image}`}
                                                alt={advisor.name}
                                                className="w-full h-64 object-cover rounded-lg mb-4"
                                            />
                                            <h3 className="text-xl font-semibold">{advisor.name}</h3>
                                            <p className="text-gray-600 mb-4">{advisor.designation}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                <a href={advisor.facebook} target="_blank" rel="noopener noreferrer" className="border p-2 rounded-full">
                                                    <FaFacebook />
                                                </a>
                                                <a href={advisor.instagram} target="_blank" rel="noopener noreferrer" className="border p-2 rounded-full">
                                                    <FaInstagram />
                                                </a>
                                                <a href={advisor.linkedin} target="_blank" rel="noopener noreferrer" className="border p-2 rounded-full">
                                                    <FaLinkedin />
                                                </a>
                                                <a href={advisor.twitter} target="_blank" rel="noopener noreferrer" className="border p-2 rounded-full">
                                                    <FaTwitter />
                                                </a>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(advisor._id)}
                                                disabled={deleteIsLoading}
                                                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-300 disabled:bg-red-300"
                                            >
                                                <IoMdTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">No advisors found</p>
                )
            }
        </div>
    );
};

export default AddAdvisor;