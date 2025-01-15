import React from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { CircleX, FileText } from 'lucide-react';

const DocumentForm = ({close}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedFile, setSelectedFile] = React.useState(null);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,  // Allow only one file
        accept: {
            'application/file': ['.jpg, .jpeg, .png .doc, .pdf'],
        }
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        console.log("Uploaded File:", selectedFile);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-3xl">
                <button onClick={close} className='float-end hover:text-red-500 duration-300'>
                    <CircleX />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Add New Document</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative col-span-2 md:col-span-1 mb-4">
                        <select
                            className="peer w-full px-4 py-5 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("document", { required: "Document is required" })}
                        >
                            <option value="" hidden>
                                Select One
                            </option>
                            <option value="Passport">Passport</option>
                            <option value="NID">NID</option>
                            <option value="NIN">NIN</option>
                        </select>
                        <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Select Document type
                        </label>
                        {errors.document && <span className="text-red-500 text-sm">{errors.document.message}</span>}
                    </div>

                    <div
                        {...getRootProps()}
                        className={`flex justify-center items-center border border-dashed rounded-lg h-56 text-center cursor-pointer transition-all ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                    >
                        <input {...getInputProps()} />
                        {selectedFile ? (
                            <div>
                                <p className="font-semibold">{selectedFile.name}</p>
                                <p className="text-sm text-gray-500">Click or drag to replace file</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600">
                                {isDragActive ? "Drop your file here..." :
                                    <div>
                                        <p className='flex justify-center'><FileText /></p>
                                        <p>Drag to <span className='text-blue-500 font-bold'>New File</span> to Upload</p>
                                    </div>}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="py-5 px-6 bg-gradient-to-l to-[#4A90E2] from-[#1565C0] active:translate-y-0.5 duration-150 text-white rounded-md font-bold"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentForm;
