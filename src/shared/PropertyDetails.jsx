import { useState } from "react";
import img from "../assets/download.jpg"; // Sample image
import img2 from "../assets/imageright.png"; // Sample image
import img3 from "../assets/loginiconimage.png"; // Sample image
import img4 from "../assets/loginpagegirlimage.png"; // Sample image
import { Select, Table } from "antd";
import { useParams } from "react-router-dom";
import sharedApi from "../redux/fetures/sharedApi/sharedApi";

const PropertyDetails = () => {
  const [pageSize, setPageSize] = useState(10);

  const [selectedImage, setSelectedImage] = useState(img);
  const { id } = useParams();

  const { data } = sharedApi.useGetPropertieUnitsQuery(id);
  const property = data?.data?.property;
  const allUnits = data?.data?.allUnits;

  const currentTenant = allUnits?.filter(item => item.booked === true )
  
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
            {record.booked ? <p className="text-yellow-700" >Booked</p> : <p className="text-green-500" >Available</p> }
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
    }
  ];

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
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

          {/* Large image display */}
          <div className="col-span-3 w-[100%] h-[504px]">
            <img
              className="h-full w-full rounded-xl object-cover"
              src={selectedImage} // Display selected image
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
              <p className="font-semibold "> {property?.numberOfUnits} </p>
            </div>
            <div className="flex justify-between py-2 ">
              <p>Total Rent</p>
              <p className="font-semibold ">$ {property?.totalRent} </p>
            </div>
            <div className="flex justify-between py-2 ">
              <p>Current Tenants</p>
              <p className="font-semibold ">{currentTenant?.length} </p>
            </div>

            <div className="flex justify-between py-2 ">
              <p>Parking</p>
              <p className="font-semibold ">{ property?.availableParking ? "Yes" : "No" } </p>
            </div>

            <div className="flex justify-between py-2 ">
              <p>Location</p>
              <p className="font-semibold ">{ property?.propertyLocation?.country } , { property?.propertyLocation?.city } </p>
            </div>

            <div className="flex justify-between py-2 ">
              <p>Maintainer Name</p>
              <p className="font-semibold ">{ property?.maintainerName }  </p>
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
            <Select
              showSearch
              placeholder="Select a Status"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "pending",
                  label: "Pending",
                },
                {
                  value: "cancel",
                  label: "Cancel",
                },
                {
                  value: "completed",
                  label: "Completed",
                },
              ]}
            />
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



    </div>
  );
};

export default PropertyDetails;
