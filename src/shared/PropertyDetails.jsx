import  { useState } from "react";
import img from "../assets/download.jpg"; // Sample image
import img2 from "../assets/imageright.png"; // Sample image
import img3 from "../assets/loginiconimage.png"; // Sample image
import img4 from "../assets/loginpagegirlimage.png"; // Sample image
import CustomButton from "./CustomButton";
import { Table, Tag } from "antd";
import { data } from "../testJson/testJson";
import { BiPlus } from "react-icons/bi";

const PropertyDetails = () => {
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };
  const [selectedImage, setSelectedImage] = useState(img);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "orange"
              : status === "complete"
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
        <div>
          <h2 className="heading">
            Design of a modern house as mansion blue couch
          </h2>
          <p className="text-[#646262] text-lg font-normal mt-8">
            It is a long established fact that a reader will be distracted a the
            readable content a pageant its layout. The point of using Lorem
            Ipsum is that it has a more-or-less normal distributed
          </p>
          <div className="mt-8 text-[1rem]">
            <div className="flex justify-between">
              <p>Total Unit</p>
              <p className="font-semibold ">3</p>
            </div>
            <div className="flex justify-between">
              <p>Total Rent</p>
              <p className="font-semibold ">$12,765</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <h2 className="text-xl font-semibold">Property Details</h2>
        <CustomButton
          content={
            <div className="flex items-center  gap-1">
              {"Add Unit"} <BiPlus size={16} />{" "}
            </div>
          }
        />
      </div>
      <div className="mt-3">
        <Table
          columns={columns}
          dataSource={data}
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
