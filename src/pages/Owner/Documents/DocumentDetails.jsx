import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import documentApi from "../../../redux/fetures/document/documentApi";
import { url } from "../../../globalConst/const";
import { Spin } from "antd";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import { useState } from "react";

const DocumentDetails = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const { id } = useParams()
  const { data, isLoading } = documentApi.useGetSingleDocumentQuery(id)
  const { propertyName, unitNumber, tenantName, documentType, description } = data?.data || {}
  const [updateDocumentStatusByOwner, { isLoading: updateDocumentIsLoading }] = documentApi.useUpdateDocumentStatusByOwnerMutation(id)
  if (isLoading || updateDocumentIsLoading) return <div className="w-full h-[60vh] flex items-center justify-center " > <Spin size="large" /> </div>

  const documentStatusCheangeFun = async (status) => {
    const updateStatus = {
      documentId: id,
      status
    }
    const response = await updateDocumentStatusByOwner(updateStatus);

    if (response?.data?.success) {
      toast.success(response?.data?.message)
    }

  }

  return (
    <div>
      <div>
        <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
          Documents
        </h2>
        <span>
          <p className="text-[#64748B] text-[14px] ">
            {" "}
            <span className="opacity-60">Home / </span>Documents Details
          </p>
        </span>
      </div>
      <div className="lg:flex gap-8 space-y-4 lg:space-y-0">
        {/* Left side - Image */}
        <div className="lg:w-1/2">
        {data?.data?.image.endsWith('.pdf') ? (
            <object
              data={`${url}${data?.data?.image}`}
              type="application/pdf"
              className="w-full lg:h-[650px] xl:h-[550px] rounded-lg"
            >
              <p>Unable to display PDF file. <a href={`${url}${data?.data?.image}`} target="_blank" rel="noopener noreferrer">Download</a> instead.</p>
            </object>
          ) : (
            <>
              <img
                src={`${url}${data?.data?.image}`}
                alt="Document"
                className="w-full lg:h-[650px] xl:h-[550px] object-cover rounded-lg cursor-pointer"
                onClick={() => setShowImageModal(true)}
              />
              {showImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowImageModal(false)}>
                  <img
                    src={`${url}${data?.data?.image}`}
                    alt="Document"
                    className="max-w-[90vw] max-h-[90vh] object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Right side - Details Card */}
        <div className="flex flex-col justify-between lg:w-1/2 bg-white rounded-lg p-6 shadow-sm">
          <div className="gap-4">
            <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-4">
              {propertyName}
            </h1>

            <div className="flex items-center text-lg mb-6">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm">{description}</span>
            </div>

            <div className="space-y-4">
              <DetailRow label="Tenant Name" value={tenantName} />
              <DetailRow label="Property Name" value={propertyName} />
              <DetailRow label="Unit No" value={unitNumber} />
              <DetailRow label="Document Type" value={documentType} />

            </div>

          </div>
          <div className="flex gap-4 justify-end">
            <button onClick={() => documentStatusCheangeFun("Approved")}
              className="bg-gradient-to-l px-6 from-[#1565C0] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#1565C0] text-white py-5 rounded-md font-medium duration-300">Approve</button>
            <button onClick={() => documentStatusCheangeFun("Reject")}
              className="px-6 py-5 border rounded-md flex items-center gap-2 hover:bg-red-500/20 hover:text-red-500 font-medium duration-300">Reject <IoMdCloseCircleOutline className="text-red-500" /> </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="text-gray-900 font-medium">{value}</span>
  </div>
);

export default DocumentDetails;
