import { Table, Tag } from 'antd';
import 'antd/dist/reset.css';
import DocumentForm from '../../../components/Forms/DocumentForm';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import CustomButton from '../../../shared/CustomButton';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';
import documentApi from '../../../redux/fetures/document/documentApi';
import { url } from '../../../globalConst/const';
import pdfLogo from "../../../assets/pdf.png"


const TenantDocuments = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const { data, isLoading, refetch } = documentApi.useGetSingleUserAllDocumentsQuery(currentUser.userId)

    useEffect(()=>{
        refetch()
      },[])

    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }


    const tableDatas = data?.data?.map(({ _id, tenantName, propertyName, unitNumber, status, image, documentType }) => ({
        key: _id,
        tenantName,
        propertyName,
        unitNumber,
        status,
        image,
        documentType
    }));


    const columns = [
        {
            title: "SL",
            dataIndex: "sl",
            render: (text, record, index) => index + 1
        },
        {
            title: "Tenant Name",
            dataIndex: "tenantName",
        },
        {
            title: "Property Name",
            dataIndex: "propertyName",
        },
        {
            title: "Unite",
            dataIndex: "unitNumber",
        },
        {
            title: "Attachment",
            dataIndex: "image",
            render: (text, record) => (
                <div>
                    {record.image.endsWith('.pdf') ? (
                        <img className="w-[40px]" src={pdfLogo} alt="PDF Document" />
                    ) : (
                        <img className="w-[40px]" src={`${url}${record.image}`} alt="Document" />
                    )}
                </div>
            ),
        },
        {
            title: "Document Type",
            dataIndex: "documentType"
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <Tag
                    color={
                        status === "Pending"
                            ? "orange"
                            : status === "Approved"
                                ? "green"
                                : "red"
                    }
                    style={{ textTransform: "capitalize" }}
                >
                    {status}
                </Tag>
            ),
        },

    ];

    return (
        <div className="bg-gray-50 min-h-screen p-4">
            <div className="w-full p-4 md:px-6 lg:px-8">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate">
                            Documents
                        </h1>

                        <nav className="flex mt-1 sm:mt-2" aria-label="Breadcrumb">
                            <ol className="flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-gray-500">
                                <li className="flex items-center">
                                    <a href="#" className="hover:text-blue-600 transition-colors">
                                        My Apartment
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="w-3 h-3 sm:w-4 sm:h-4 mx-1"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                    >
                                        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                                    </svg>
                                    <span className="hidden sm:inline">Maintenance Requests</span>
                                    <span className="inline sm:hidden">Requests</span>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="flex justify-between">
                        <CustomButton
                            handleClick={open}
                            content={
                                <div className="flex items-center  gap-1">
                                    {"Add Documents"} <BiPlus size={16} />{" "}
                                </div>
                            }
                        />
                    </div>

                </div>
            </div>


            <Table
                className=""
                columns={columns}
                dataSource={tableDatas}
                loading={isLoading}
                scroll={{ x: 800 }}
                pagination={{
                    responsive: true,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                }}
                bordered
            />
            {
                isOpen && (
                    <DocumentForm close={close} />
                )
            }
            <footer className="mt-8 text-center text-sm text-gray-500">
                &copy; 2024 Copyright - All rights reserved
            </footer>
        </div>
    );
};

export default TenantDocuments;