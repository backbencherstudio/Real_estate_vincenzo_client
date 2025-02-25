import React from 'react';
import { FaTrash } from 'react-icons/fa';
import adminApi from '../../../redux/fetures/admin/adminApi';
import { MdEmail } from 'react-icons/md';
import Swal from 'sweetalert2';

const EmailCollection = () => {
    const { data, isLoading } = adminApi.useGetAllEmailCollectionDataQuery();
    const [deleteEmailCollectionData, { isLoading: emailDeleteIsLoading }] = adminApi.useDeleteEmailCollectionDataMutation();
    console.log(data?.data);

    const handleDelete = async (emailId) => {
        console.log(emailId);

        try {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await deleteEmailCollectionData(emailId).unwrap();
                    if (res.data.success) {
                        toast.success(res.data.message);
                    }
                }
            });

            // Optionally, you can show a success message or update the state
        } catch (error) {
            console.error('Failed to delete the email:', error);
            // Optionally, show an error message
        }
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Email Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-6 gap-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    data?.data?.map((email) => (
                        <div className="bg-white flex justify-between items-center p-2 rounded-md" key={email.id}>
                            <span className="flex items-center gap-2"> <MdEmail /> {email?.email}

                            </span>
                            <button
                                onClick={() => handleDelete(email._id)}
                                className="inline-block text-red-500 bg-red-100 p-2 rounded-md hover:bg-red-200 duration-300"
                                disabled={emailDeleteIsLoading}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EmailCollection;