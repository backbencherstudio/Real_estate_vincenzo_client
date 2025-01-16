import { useState } from "react";
import img from "../assets/download.jpg";
import img2 from "../assets/imageright.png";
import img3 from "../assets/loginiconimage.png";
import img4 from "../assets/loginpagegirlimage.png";
import { Button, Modal, Spin, Table } from "antd";
import { useParams } from "react-router-dom";
import sharedApi from "../redux/fetures/sharedApi/sharedApi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/fetures/auth/authSlice";
import ownerApi from "../redux/fetures/owner/ownerApi";
import { toast } from "sonner";

const PropertyDetails = () => {
  const [pageSize, setPageSize] = useState(10);

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors }
  // } = useForm({});

  const {
    register: registerUnit,
    handleSubmit: handleSubmitUnit,
    reset: resetUnit,
    formState: { errors: errorsUnit }
  } = useForm(); // This is for the first form (unit form)

  // For Tenant Form
  const {
    register: registerTenant,
    handleSubmit: handleSubmitTenant,
    reset: resetTenant,
    formState: { errors: errorsTenant }
  } = useForm(); // This is for the second form (tenant form)


  const [createUnit, { isLoading }] = ownerApi.useCreateUnitMutation();

  const [selectedImage, setSelectedImage] = useState(img);
  const { id } = useParams();
  const currentUser = useSelector(selectCurrentUser);

  const { data } = sharedApi.useGetPropertieUnitsQuery(id);
  const property = data?.data?.property;
  const allUnits = data?.data?.allUnits;

  // const currentTenant = allUnits?.filter(item => item.booked === true)
  const [tenantModal2Open, setTenantModal2Open] = useState(false);
  const [ids, setIds] =useState({})

  const addTenantFun = (unitId, ownerId, propertyId) => {
    const allIds = {
      unitId,
      ownerId,
      propertyId
    }
    setTenantModal2Open(true)
    setIds(allIds);
  }

  const onSubmitForTenant = async (data) => {
    const tenantData = {
      ...data,
      ...ids
    }
    console.log("tenant data = ", tenantData);
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
    ownerId
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
            {record.booked ? <p className="text-yellow-700" >Booked</p> : <p className="text-green-500" >Available</p>}
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
    {
      title: "Add Tenant",
      dataIndex: "add tenant",
      render: (text, record) => (
        <div>
          <button onClick={() => addTenantFun(record.key, record.ownerId, record.propertyId)} disabled={record.booked} className={`font-semibold text-green-500 ${record.booked && "text-yellow-700 cursor-not-allowed"} `} >
            Add
          </button>
        </div>
      )
    },

  ];

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };
  const [modal2Open, setModal2Open] = useState(false);


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

  const images = [img, img2, img3, img4];

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
          <div className="col-span-1 grid gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={() => {
                  setSelectedImage(image); // Set the clicked image as selected
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
              src={selectedImage}
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
            <h1 className="clamp-text font-semibold my-5"> Property Details </h1>
          </div>{" "}
          <div>
            <Button type="primary" onClick={() => setModal2Open(true)}>
              Add Unit
            </Button>
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
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
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

              <div className="space-y-2">
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
              </div>

            </div>


            <div className="flex justify-end" >
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
                  isLoading ? <Spin size="large" /> : "Add Tenant"
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
