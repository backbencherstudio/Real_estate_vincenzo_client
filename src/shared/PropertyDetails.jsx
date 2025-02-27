/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Modal, Spin, Table } from "antd";
import { useParams } from "react-router-dom";
import sharedApi from "../redux/fetures/sharedApi/sharedApi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/fetures/auth/authSlice";
import ownerApi from "../redux/fetures/owner/ownerApi";
import { toast } from "sonner";
import { url } from "../globalConst/const";
import authApi from "../redux/fetures/auth/authApi";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";

const PropertyDetails = () => {
  const [pageSize, setPageSize] = useState(10);

  const {
    register: registerUnit,
    handleSubmit: handleSubmitUnit,
    reset: resetUnit,
    formState: { errors: errorsUnit }
  } = useForm();

  const {
    register: registerUpdateUnit,
    handleSubmit: handleSubmitUpdateUnit,
    reset: resetUdateUnit,
    formState: { errors: errorsUpdateUnit }
  } = useForm();

  const {
    register: registerTenant,
    handleSubmit: handleSubmitTenant,
    reset: resetTenant,
    formState: { errors: errorsTenant }
  } = useForm();


  const [createUnit, { isLoading }] = ownerApi.useCreateUnitMutation();
  const [createTenant, { isLoading: tenantIsLoading }] = ownerApi.useCreateTenantMutation();

  const { id } = useParams();

  const currentUser = useSelector(selectCurrentUser);
  const { data: ownerData, isLoading: userLoading, error } = authApi.useGetSingleUserInfoQuery(currentUser?.email);
  const [deleteUnit] = ownerApi.useDeleteUnitMutation()
  const { data } = sharedApi.useGetPropertieUnitsQuery(id);
  const [updateUnit, {isLoading : updateUnitIsLoading}] = ownerApi.useUpdateUnitMutation()

  const property = data?.data?.property;
  const allUnits = data?.data?.allUnits;
  const propertyImages = data?.data?.property?.propertyImages;
  const images = Array.isArray(propertyImages) ? propertyImages : [];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // const currentTenant = allUnits?.filter(item => item.booked === true)
  const [tenantModal2Open, setTenantModal2Open] = useState(false);
  const [ids, setIds] = useState({})

  const addTenantFun = (unitId, ownerId, propertyId) => {
    const allIds = {
      unitId,
      ownerId,
      propertyId
    }
    setTenantModal2Open(true)
    setIds(allIds);
  }

  const deleteUnitHandler = async (unitId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to remove this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUnit(unitId);
        if (res?.data?.success) {
          toast.success(res?.data?.message);
        }
      }
    });
  }

  const onSubmitForTenant = async (data) => {
    const tenantData = {
      role: "tenant",
      ...data,
      ...ids
    }
    const res = await createTenant(tenantData);
    if (res.data.success) {
      toast.success(res.data.message);
      resetTenant();
      setTenantModal2Open(false)
    }
  }

  const tableData = allUnits?.map(({
    isSecurityDepositPay,
    _id,
    propertyId,
    unitNumber,
    numberOfBedroom,
    numberOfBathroom,
    numberOfKitchen,
    rent,
    booked,
    createdAt,
    updatedAt,
    ownerId,
    lateFee,
    securityDeposit

  }) => ({
    key: _id,
    isSecurityDepositPay,
    propertyId,
    unitNumber,
    numberOfBedroom,
    numberOfBathroom,
    numberOfKitchen,
    rent,
    booked,
    createdAt,
    updatedAt,
    ownerId,
    lateFee,
    securityDeposit
  }));

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Status",
      dataIndex: "booked",
      render: (text, record) => (
        <div>
          <span
            className="text-[#4A90E2] flex items-center"
          >
            {record.booked ? <p className="text-[#D32F2F] font-semibold" >Reserved</p> : <p className="text-green-500 font-semibold" >Available</p>}
          </span>
        </div>
      ),
    },
    {
      title: "Unit",
      dataIndex: "unitNumber",
    },
    {
      title: "Total Rent",
      dataIndex: "rent",
      render: (text) => (
        <div>
          <h2>${text}</h2>
        </div>
      )
    },
    {
      title: "Late Fee",
      dataIndex: "lateFee"
    },
    {
      title: "Security Deposit",
      dataIndex: "securityDeposit"
    },
    {
      title: "Bedroom",
      dataIndex: "numberOfBedroom"
    },
    {
      title: "Bathroom",
      dataIndex: "numberOfBathroom"
    },
    {
      title: "Kitchen",
      dataIndex: "numberOfKitchen",
    },

    ...(currentUser.role === "owner"
      ? [
        {
          title: "Add Tenant",
          dataIndex: "addTenant",
          render: (text, record) => (
            <div>
              <button
                onClick={() =>
                  addTenantFun(record.key, record.ownerId, record.propertyId)
                }
                disabled={record.booked}
                className={`font-semibold text-green-500 border border-green-500 rounded-md p-1  hover:bg-green-500 ${record.booked ? "text-white" : "hover:text-white"} transition-all duration-300 active:scale-95 ${record.booked && "text-[#D32F2F] hover:bg-transparent cursor-not-allowed border-none"
                  }`}
              >
                {record.booked ? "Booked" : "Add"}
              </button>
            </div>
          ),
        },

        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) => (
            <div className="flex items-center">
              <button
                onClick={() =>
                  deleteUnitHandler(record.key)
                }
                disabled={record.booked}
                className={`font-semibold text-red-500 border border-red-500 rounded-md p-1  hover:bg-red-500 ${record.booked ? "text-white" : "hover:text-white"} transition-all duration-300 active:scale-95 ${record.booked && "text-[#cfcfcf] cursor-not-allowed hover:bg-transparent border-none"
                  }`}
              >
                <MdDeleteForever className="text-[24px]" />
              </button>

              <button
                onClick={() =>
                  updateUnitHandler(record.key)
                }
                className={`font-semibold ml-2 text-green-500 border border-green-500 rounded-md p-1 cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-300 active:scale-95 ${record.booked && "text-yellow-700 cursor-not-allowed border-yellow-700 hover:bg-yellow-700"
                  }`}
              >
                <CiEdit className="text-[24px]" />
              </button>
            </div>
          ),
        },


      ]
      : []),
  ];

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };
  const [modal2Open, setModal2Open] = useState(false);

  const addUnitModalShowFun = () => {
    const totalUnits = ownerData?.data?.getTotalUnit || 0;
    const bookedUnits = ownerData?.data?.numberOfTotalUnits || 0;

    if (totalUnits === bookedUnits) {
      return toast.error(
        "You have reached the maximum number of units allowed by your subscription plan. To add more units, please update your plan."
      );
    }
    setModal2Open(true);
  };

  const onSubmit = async (data) => {
    const unitData = {
      ...data,
      propertyId: id,
      ownerId: currentUser?.userId
    }
    const res = await createUnit(unitData)
    if (res.data.success) {
      toast.success(res.data.message);
      resetUnit();
      setModal2Open(false)
    }
  };

  const [updateModalOpen, setUpdateModalpen] = useState(false);
  const [unitId, setUnitId] = useState("")

  const updateUnitHandler = async (unitId) => {
    setUpdateModalpen(true)
    setUnitId(unitId);
  }

  const onSubmitForUpdateUnit = async (data) => {
    const numberFields = ["lateFee", "numberOfBedroom", "numberOfBathroom", "numberOfKitchen", "rent", "securityDeposit"];
    const filteredData = Object.fromEntries(
      Object.entries(data)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => [
          key,
          numberFields.includes(key) ? parseInt(value, 10) : value
        ])
    );
    const unitData = {
      ...filteredData,
      unitId,
    }
    const res = await updateUnit(unitData);

    if (res.data.success) {
      toast.success(res.data.message);
      resetUdateUnit();
      setUpdateModalpen(false)
    }

  };


  return (
    <div>
      <div>
        <h2 className="font-manrope tracking-[-0.03em] text-left heading">
          Properties
        </h2>
        <span>
          <p className="text-[#64748B] text-[14px]">
            <span className="opacity-60">Home / My Properties / </span>
            Property Details
          </p>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
        <div className="grid grid-cols-4 gap-2">
          {/* Small images */}
          <div className="col-span-1 grid gap-2 h-[504px] overflow-auto custom-scroll">
            {images.map((image, index) => (
              <img
                key={index}
                src={`${url}${image}`}
                onClick={() => {
                  setSelectedImage(image);
                }}
                className={`h-[120px] w-full rounded-lg object-cover cursor-pointer duration-300 ${image === selectedImage
                  ? "border-2 border-red-500"
                  : "border-2 border-transparent"
                  }`}
                alt="Small Image"
              />
            ))}
          </div>

          <div className="col-span-3 w-[100%] h-[504px]">
            <img
              className="h-full w-full rounded-xl object-cover"
              src={`${url}${selectedImage ? selectedImage : images[0]}`}
              alt="Large Display"
            />
          </div>
        </div>
        <div className="" >
          <h2 className="heading">
            {property?.propertyName}
          </h2>
          <p className="text-[#646262] text-lg font-normal mt-8">
            {property?.Description}
          </p>

          <div className="mt-8 text-[1rem]">

            <div className="flex justify-between py-2 ">
              <p>Total Unit</p>
              <p className="font-semibold "> {property?.numberOfUnits | 0} </p>
            </div>

            <div className="flex justify-between py-2 ">
              <p>Total Booked Unit</p>
              <p className="font-semibold "> {property?.numberOfBookedUnits | 0} </p>
            </div>

            <div className="flex justify-between py-2 ">
              <p>Total Rent</p>
              <p className="font-semibold ">$ {property?.totalRent | 0} </p>
            </div>

            <div className="flex justify-between py-2 ">
              <p>Total Rented Amount</p>
              <p className="font-semibold ">$ {property?.totalBookedRent | 0} </p>
            </div>

            {/* <div className="flex justify-between py-2 ">
              <p>Current Tenants</p>
              <p className="font-semibold ">{currentTenant?.length} </p>
            </div> */}

            <div className="flex justify-between py-2 ">
              <p>Parking</p>
              <p className="font-semibold ">{property?.availableParking ? "Yes" : "No"} </p>
            </div>

            <div className="flex justify-between py-2 ">
              <p>Location</p>
              <p className="font-semibold ">{property?.propertyLocation?.country} , {property?.propertyLocation?.city} </p>
            </div>

            <div className="flex justify-between py-2 ">
              <p>Maintainer Name</p>
              <p className="font-semibold ">{property?.maintainerName}  </p>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="clamp-text font-semibold my-5"> {property?.propertyName} <span className="text-xl" >( All Units )</span> </h1>
          </div>{" "}
          <div>
            {
              currentUser.role === "owner" &&
              <Button type="primary" onClick={addUnitModalShowFun}>
                Add Unit
              </Button>
            }
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          scroll={{ x: 800 }}
          pagination={{
            pageSize: pageSize,
            pageSizeOptions: ["5", "10", "15", "20", "25"],
            showSizeChanger: true,
            onShowSizeChange: handlePageSizeChange,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>

      <Modal
        centered
        open={modal2Open}
        footer={null}
        onCancel={() => setModal2Open(false)}
        width={1000}
      >
        <div className="p-5" >
          <h2 className="text-2xl" >Unit Information</h2>
          <form onSubmit={handleSubmitUnit(onSubmit)} className="mt-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Unit Number
                </label>
                <input
                  {...registerUnit("unitNumber", { required: "Unit number is required" })}
                  type="text"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600 
              ${errorsUnit.unitNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUnit.unitNumber && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.unitNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Bedroom
                </label>
                <input
                  {...registerUnit("numberOfBedroom", {
                    required: "Number of bedrooms is required",
                    min: { value: 1, message: "Must be at least 1" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUnit.numberOfBedroom ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUnit.numberOfBedroom && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.numberOfBedroom.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Bathroom
                </label>
                <input
                  {...registerUnit("numberOfBathroom", {
                    required: "Number of bathrooms is required",
                    min: { value: 1, message: "Must be at least 1" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUnit.numberOfBathroom ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUnit.numberOfBathroom && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.numberOfBathroom.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Kitchen
                </label>
                <input
                  {...registerUnit("numberOfKitchen", {
                    required: "Number of kitchens is required",
                    min: { value: 1, message: "Must be at least 1" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUnit.numberOfKitchen ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUnit.numberOfKitchen && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.numberOfKitchen.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rent Amount
                </label>
                <input
                  {...registerUnit("rent", {
                    required: "Rent amount is required",
                    min: { value: 0, message: "Must be a positive number" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUnit.rent ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUnit.rent && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.rent.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Security Deposit
                </label>
                <input
                  {...registerUnit("securityDeposit", {
                    required: "Security deposit is required",
                    min: { value: 0, message: "Must be a positive number" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUnit.securityDeposit ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUnit.securityDeposit && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.securityDeposit.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rent Type
                </label>
                <select
                  {...registerUnit("rentType", { required: "Rent type is required" })}
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUnit.rentType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  {/* <option value="Weekly">Weekly</option> */}
                  <option value="Monthly">Monthly</option>
                  {/* <option value="Yearly">Yearly</option> */}
                </select>
                {errorsUnit.rentType && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.rentType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Late Fee
                </label>
                <input
                  {...registerUnit("lateFee", {
                    required: "Late fee is required",
                    min: { value: 0, message: "Must be a positive number" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUnit.lateFee ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUnit.lateFee && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.lateFee.message}</p>
                )}
              </div>

              {/* <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Due Date
                </label>
                <input
                  {...registerUnit("paymentDueDate", {
                    required: "Payment due date is required"
                  })}
                  type="date"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUnit.paymentDueDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUnit.paymentDueDate && (
                  <p className="text-red-500 text-sm mt-1">{errorsUnit.paymentDueDate.message}</p>
                )}
              </div> */}

            </div>


            <div className="flex justify-end mt-4" >
              <button type="submit" className="text-[16px] px-9 py-2 rounded-md bg-gradient-to-t from-[#468ddf] to-[#1969c3] text-white font-medium 
          hover:bg-gradient-to-t hover:from-blue-600 hover:to-blue-700
           hover:shadow" >
                {
                  isLoading ? <Spin size="large" /> : "Add"
                }
              </button>
            </div>

          </form>
        </div>

      </Modal>


      <Modal
        centered
        open={updateModalOpen}
        footer={null}
        onCancel={() => setUpdateModalpen(false)}
        width={1000}
      >
        <div className="p-5" >
          <h2 className="text-2xl" >Unit Update Information</h2>
          <form onSubmit={handleSubmitUpdateUnit(onSubmitForUpdateUnit)} className="mt-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Unit Number
                </label>
                <input
                  {...registerUpdateUnit("unitNumber")}
                  type="text"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600 
              ${errorsUpdateUnit.unitNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUpdateUnit.unitNumber && (
                  <p className="text-red-500 text-sm mt-1">{errorsUpdateUnit.unitNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Bedroom
                </label>
                <input
                  {...registerUpdateUnit("numberOfBedroom", {
                    min: { value: 1, message: "Must be at least 1" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUpdateUnit.numberOfBedroom ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUpdateUnit.numberOfBedroom && (
                  <p className="text-red-500 text-sm mt-1">{errorsUpdateUnit.numberOfBedroom.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Bathroom
                </label>
                <input
                  {...registerUpdateUnit("numberOfBathroom", {
                    min: { value: 1, message: "Must be at least 1" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUpdateUnit.numberOfBathroom ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUpdateUnit.numberOfBathroom && (
                  <p className="text-red-500 text-sm mt-1">{errorsUpdateUnit.numberOfBathroom.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Kitchen
                </label>
                <input
                  {...registerUpdateUnit("numberOfKitchen", {
                    min: { value: 1, message: "Must be at least 1" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUpdateUnit.numberOfKitchen ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUpdateUnit.numberOfKitchen && (
                  <p className="text-red-500 text-sm mt-1">{errorsUpdateUnit.numberOfKitchen.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rent Amount
                </label>
                <input
                  {...registerUpdateUnit("rent", {
                    min: { value: 0, message: "Must be a positive number" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUpdateUnit.rent ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUpdateUnit.rent && (
                  <p className="text-red-500 text-sm mt-1">{errorsUpdateUnit.rent.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Security Deposit
                </label>
                <input
                  {...registerUpdateUnit("securityDeposit", {
                    min: { value: 0, message: "Must be a positive number" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUpdateUnit.securityDeposit ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUpdateUnit.securityDeposit && (
                  <p className="text-red-500 text-sm mt-1">{errorsUpdateUnit.securityDeposit.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rent Type
                </label>
                <select
                  {...registerUpdateUnit("rentType")}
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUpdateUnit.rentType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  {/* <option value="Weekly">Weekly</option> */}
                  <option value="Monthly">Monthly</option>
                  {/* <option value="Yearly">Yearly</option> */}
                </select>
                {errorsUpdateUnit.rentType && (
                  <p className="text-red-500 text-sm mt-1">{errorsUpdateUnit.rentType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Late Fee
                </label>
                <input
                  {...registerUpdateUnit("lateFee", {
                    min: { value: 0, message: "Must be a positive number" }
                  })}
                  type="number"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsUpdateUnit.lateFee ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsUpdateUnit.lateFee && (
                  <p className="text-red-500 text-sm mt-1">{errorsUpdateUnit.lateFee.message}</p>
                )}
              </div>
            </div>


            <div className="flex justify-end mt-4" >
              <button type="submit" className="text-[16px] px-9 py-2 rounded-md bg-gradient-to-t from-[#468ddf] to-[#1969c3] text-white font-medium 
          hover:bg-gradient-to-t hover:from-blue-600 hover:to-blue-700
           hover:shadow" >
                {
                  isLoading ? <Spin size="large" /> : "Add"
                }
              </button>
            </div>

          </form>
        </div>

      </Modal>


      <Modal
        centered
        open={tenantModal2Open}
        footer={null}
        onCancel={() => setTenantModal2Open(false)}
        width={1000}
      >
        <div className="p-5" >
          <h2 className="text-2xl" >Tenant Information</h2>
          <form onSubmit={handleSubmitTenant(onSubmitForTenant)} className="mt-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...registerTenant("name", { required: "Name is required" })}
                  type="text"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600 
              ${errorsTenant.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsTenant.name && (
                  <p className="text-red-500 text-sm mt-1">{errorsTenant.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  email
                </label>
                <input
                  {...registerTenant("email", {
                    required: "Enter a valid email",
                    min: { value: 1, message: "Must be at least 1" }
                  })}
                  type="email"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsTenant.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsTenant.email && (
                  <p className="text-red-500 text-sm mt-1">{errorsTenant.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  {...registerTenant("password", {
                    required: "Password is required",
                    min: { value: 1, message: "Must be at least 1" }
                  })}
                  type="password"
                  className={`w-full p-2 border rounded-lg bg-white text-gray-600
              ${errorsTenant.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errorsTenant.password && (
                  <p className="text-red-500 text-sm mt-1">{errorsTenant.password.message}</p>
                )}
              </div>


            </div>


            <div className="flex justify-end" >
              <button type="submit" className="text-[16px] px-9 py-2 rounded-md bg-gradient-to-t from-[#468ddf] to-[#1969c3] text-white font-medium 
          hover:bg-gradient-to-t hover:from-blue-600 hover:to-blue-700
           hover:shadow" >
                {
                  tenantIsLoading ? <Spin size="large" /> : "Add Tenant"
                }
              </button>
            </div>

          </form>
        </div>

      </Modal>



    </div>
  );
};

export default PropertyDetails;