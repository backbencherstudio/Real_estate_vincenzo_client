import React from 'react';
import image from "./../../assets/image.png"
import pdf from "./../../assets/pdf.png"
import { Download } from 'lucide-react';
import { useParams } from 'react-router-dom';
import documentApi from '../../redux/fetures/document/documentApi';

const TenantDocument = () => {
    const {id} = useParams()

    console.log(id);
    

    // ================================== this is tenant Id this api get single user all documents  ( Not : this api call owner and tenent both user documents )
  const {data, isLoading} = documentApi.useFindSingleTenentDocumentByOwnerQuery(id);

  console.log("dsajdasjdajkhd",data?.data);
  

    const documents = [
        { name: "Document.PNG", type: "image", url: "#" },
        { name: "Document.PDF", type: "pdf", url: "#" },
    ];

    const agreement = { name: "Agreement.PDF", type: "pdf", url: "#" };

    return (
        <div className="">
            <div className=" rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Tenant Documents</h2>
                <div className="space-y-6 bg-white p-8 rounded-md">
                    {documents.map((doc, index) => (
                        <div key={index} className="flex items-center cursor-pointer group">
                            <div className="flex items-center  duration-300/">
                                <img
                                    src={doc.type === "pdf" ? `${pdf}` : `${image}`}
                                    alt={`${doc.type} icon`}
                                    className="w-4 h-4 mr-3"
                                />
                                <span className="text-sm font-medium group-hover:text-green-500 ">{doc.name}</span>
                            </div>
                            <a
                                href={doc.url}
                                className="text-blue-600 group-hover:text-green-500 font-semibold"
                                download
                            >
                                <Download size={16} className='ml-2' />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-xl font-semibold mb-4">Agreement Copy</h2>
                <div className="flex items-center bg-white p-8 rounded-md">
                    <div className="flex items-center hover:text-green-500 cursor-pointer group  ">
                        <img
                            src={pdf}
                            alt="PDF icon"
                            className="w-4 h-4 mr-3"
                        />
                        <span className="text-sm font-medium group-hover:text-green-500 duration-300">{agreement.name}</span>

                        <a
                            href={agreement.url}
                            className="text-blue-600 group-hover:text-green-500 duration-300 font-semibold"
                            download
                        >
                            <Download size={16} className='ml-2' />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TenantDocument;
