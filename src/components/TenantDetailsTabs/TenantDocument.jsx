import React from 'react';
import image from "./../../assets/image.png";
import pdf from "./../../assets/pdf.png";
import { Download } from 'lucide-react';
import { useParams } from 'react-router-dom';
import documentApi from '../../redux/fetures/document/documentApi';
import { url } from '../../globalConst/const';

const TenantDocument = () => {
    const { id } = useParams();

    console.log(id);

    const { data, isLoading } = documentApi.useFindSingleTenentDocumentByOwnerQuery(id);

    console.log("Download Document...", data?.data);

    const documents = data?.data || [];

    const agreement = { name: "Agreement.PDF", type: "pdf", url: "path/to/agreement.pdf" };

    const getDocumentType = (fileUrl) => {
        const extension = fileUrl.split('.').pop().toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const pdfExtensions = ['pdf'];

        if (imageExtensions.includes(extension)) return 'image';
        if (pdfExtensions.includes(extension)) return 'pdf';
        return 'unknown';
    };

    return (
        <div>
            <div className="rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Tenant Documents</h2>
                <div className="space-y-6 bg-white p-8 rounded-md">
                    {documents.map((doc, index) => {
                        const docType = getDocumentType(doc.image);
                        return (
                            <div key={index} className="flex items-center cursor-pointer group">
                                <a
                                    href={`${url}${doc.image}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 group-hover:text-green-500 font-semibold flex items-center"
                                    download
                                >
                                    <div className="flex items-center duration-300">
                                        <img
                                            src={docType === "pdf" ? pdf : image}
                                            alt={`${docType} icon`}
                                            className="w-4 h-4 mr-3"
                                        />
                                        <span className="text-sm font-medium group-hover:text-green-500">
                                            Download {docType.toUpperCase()}
                                        </span>
                                        <Download size={16} className="ml-2" />
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* <div className="mt-5">
                <h2 className="text-xl font-semibold mb-4">Agreement Copy</h2>
                <div className="flex items-center bg-white p-8 rounded-md">
                    <div className="flex items-center hover:text-green-500 cursor-pointer group">
                        <img src={pdf} alt="PDF icon" className="w-4 h-4 mr-3" />
                        <span className="text-sm font-medium group-hover:text-green-500 duration-300">
                            {agreement.name}
                        </span>

                        <a
                            href={agreement.url}
                            className="text-blue-600 group-hover:text-green-500 duration-300 font-semibold"
                            download
                        >
                            <Download size={16} className="ml-2" />
                        </a>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default TenantDocument;
