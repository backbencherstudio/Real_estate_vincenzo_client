/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { url } from "../../globalConst/const";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import adminApi from "../../redux/fetures/admin/adminApi";
import { toast } from "sonner";

const ProfileInformation = ({ personalInfo = {}, addressInfo = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [addTransactionData, { isLoading }] = adminApi.useAddTransactionDataMutation();

  const allowedFields = ["email", "name", "personalInfo", "permanentAddress", "routingNumber", "bankAccountNumber"];
  const [open, setOpen] = useState(false);
  const [ownerData, setOwnerInfoData] = useState({})

  const handleModalFun = (data) => {
    setOpen(true)
    setOwnerInfoData(data)
  }




  const onSubmit = async (data) => {
    const transferData = {
      ownerId: ownerData._id,
      name: ownerData.name,
      email: ownerData.email,
      transactionId: data.transactionId,
      mainBalance: ownerData.paidAmount,
      percentage: ownerData.percentage,
      amount: (
        personalInfo?.paidAmount - (personalInfo?.paidAmount * (personalInfo?.percentage / 100))
      ).toFixed(2),

    }
    const res = await addTransactionData(transferData)
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      setOpen(false);
      reset();
    }
  };


  const displayValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).filter(Boolean).join(", ") || "N/A";
    }
    return value || "N/A";
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
          {personalInfo?.profileImage ? (
            <img
              src={`${url}${personalInfo?.profileImage}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUser className="size-full p-4" />
          )}

          {/* <img
                        src={`${url}${personalInfo?.profileImage}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    /> */}
        </div>
        <div className=" flex justify-between items-center flex-grow  ">

          <div>
            <h2 className="text-xl font-semibold">
              {displayValue(personalInfo?.name)}
            </h2>
            <p className="text-gray-500">{displayValue(personalInfo?.email)}</p>
          </div>
          {
            personalInfo?.role === "owner" &&
            <div className="" >
              {
                personalInfo?.paidAmount === 0 || !personalInfo?.paidAmount ? <div>
                  <h2 className="text-red-500 font-bold text-[17px] " > Amount Not Available </h2>
                </div> :
                  <div>
                    <h2 className="font-bold" > Current Balance = {personalInfo?.paidAmount}</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-md font-medium text-gray-700">Fee:</span>
                      <span className="text-md font-semibold text-orange-500">{personalInfo?.percentage}%</span>
                      <span className="text-md text-gray-600">=</span>
                      <span className="text-md font-bold text-red-500">
                        -{(personalInfo?.paidAmount * (personalInfo?.percentage / 100)).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center ">
                      <span className="font-semibold text-gray-800">Total After Deduction = </span>
                      <span className=" font-bold text-green-600 ml-1">
                        {(
                          personalInfo?.paidAmount - (personalInfo?.paidAmount * (personalInfo?.percentage / 100))
                        ).toFixed(2)}
                      </span>
                    </div>
                    {/* <button onClick={() => handleModalFun(personalInfo)}> Add Transaction Id </button> */}
                    <button
                      onClick={() => handleModalFun(personalInfo)}
                      className="bg-blue-100  font-semibold mt-2 py-1 px-2 rounded-md shadow-md hover:bg-blue-200 transition duration-300 ease-in-out">
                      ➕ Add Transaction ID
                    </button>
                  </div>
              }
            </div>
          }
        </div>
      </div>
      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          {Object.entries(personalInfo)
            .filter(([key]) => allowedFields.includes(key))
            .map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:justify-between pb-2"
              >
                <span className="text-gray-600 capitalize mb-1 sm:mb-0">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="font-medium">{displayValue(value)}</span>
              </div>
            ))}
        </div>

        {/* Permanent Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Permanent Address</h3>
          {Object.keys(addressInfo).length ? (
            Object.entries(addressInfo).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:justify-between pb-2"
              >
                <span className="text-gray-600 capitalize mb-1 sm:mb-0">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="font-medium">{displayValue(value)}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No permanent address available.</p>
          )}
        </div>
      </div>


      <Modal
        title="Transaction ID Required After Successful Transfer The Amount. 🚀"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
        footer={false}

      >

        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 p-6 rounded-lg'>

          <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">

              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter Transaction ID"
                {...register("transactionId", { required: "Transaction ID is required" })}
                className="w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* Error Message */}
              {errors.transactionId && (
                <p className="text-red-500 text-sm">{errors.transactionId.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300">
                {
                  isLoading ? "Loading..." : "➕ Add ID"
                }
              </button>
            </form>
          </div>
        </div>
      </Modal>




    </div>
  );
};

export default ProfileInformation;
