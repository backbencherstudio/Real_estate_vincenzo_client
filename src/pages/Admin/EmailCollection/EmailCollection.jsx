import React from 'react';
import { FaTrash } from 'react-icons/fa';
import adminApi from '../../../redux/fetures/admin/adminApi';

const EmailCollection = () => {
    const { data, isLoading } = adminApi.useGetAllEmailCollectionDataQuery();
    const [deleteEmailCollectionData, { isLoading: emailDeleteIsLoading }] = adminApi.useDeleteEmailCollectionDataMutation();
    console.log(data?.data);

    const handleDelete = async (emailId) => {
        try {
            await deleteEmailCollectionData(emailId).unwrap();
            // Optionally, you can show a success message or update the state
        } catch (error) {
            console.error('Failed to delete the email:', error);
            // Optionally, show an error message
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Email Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    data?.data?.map((email) => (
                        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex items-center justify-between" key={email.id}>
                            <div className="flex items-center">
                                <p className="text-lg">{email?.email}</p>
                            </div>
                            <button 
                                onClick={() => handleDelete(email.id)} 
                                className="text-red-500 hover:text-red-700"
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