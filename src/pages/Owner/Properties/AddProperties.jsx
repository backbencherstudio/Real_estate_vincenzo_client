import { useState } from "react";
import { Form, Button, Row, Col, Select, AutoComplete, Spin } from "antd";
import { Controller, useForm } from "react-hook-form";
import { countryData } from "../../../data/data";
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { toast } from "sonner";

const AddProperties = () => {
  const currentUser = useSelector(selectCurrentUser)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [countryOptions, setCountryOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [updateImageIndex, setUpdateImageIndex] = useState(null);

  const [createProperty, { isLoading }] = ownerApi.useCreatePropertyMutation()

  const handleImageUpload = (e) => {
    e.stopPropagation();
    const files = Array.from(e.target.files);
    if (updateImageIndex !== null) {
      setImages((prevImages) =>
        prevImages.map((img, i) => (i === updateImageIndex ? files[0] : img))
      );
      setUpdateImageIndex(null);
    } else {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUpdateImage = (index) => {
    setUpdateImageIndex(index);
    document.getElementById("imageUpdateInput").click();
  };

  const handleSearch = (value) => {
    if (!value) {
      setCountryOptions([]);
    } else {
      const filteredOptions = countryData
        .filter((country) =>
          country.toLowerCase().includes(value.toLowerCase())
        )
        .map((country) => ({ value: country }));
      setCountryOptions(filteredOptions);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('ownerId', currentUser?.userId);
    formData.append('propertyName', data?.propertyName);
    formData.append('Description', data?.description);
    formData.append('amenities', data?.amenities);
    formData.append('availableParking', data?.parking === 'yes');
    formData.append('maintainerName', data?.maintainerName);
    formData.append('houseNumber', data?.houseNo);
    formData.append(
      'propertyLocation',
      JSON.stringify({
        country: data?.country,
        state: data?.state,
        city: data?.city,
        address: data?.address,
        zipCode: data?.zipCode,
      })
    );
    images.forEach((file) => formData.append('propertyImages', file));
    const response = await createProperty(formData);

    if (response?.data?.success) {
      reset();
      setImages([]);
      toast.success(response?.data?.message)
    }

  };


  return (
    <div>
      {/* Header Section */}
      <div>
        <h2 className="font-manrope tracking-[-0.03em] text-left heading">
          Properties
        </h2>
        <span>
          <p className="text-[#64748B] text-[14px] ">
            <span className="opacity-60">Home / My Properties /</span> Add
            Properties
          </p>
        </span>
      </div>

      {/* Form Section */}
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <div className="bg-white mt-16 py-8 px-6 rounded-lg">
          <h2 className="sub-heading">Property Information</h2>
          <Row gutter={[16]} className="mt-8">
            {/* Property Name */}
            <Col xs={24} sm={24} md={8}>
              <Form.Item required>
                <Controller
                  name="propertyName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Property Name is required",
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        id="propertyName"
                        type="text"
                        placeholder="Property Name"
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label
                        htmlFor="propertyName"
                        className="absolute left-3 -top-2.5 bg-white cursor-text px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                      >
                        Property Name
                      </label>
                    </div>
                  )}
                />
                {errors.propertyName && (
                  <p className="text-red-500">{errors.propertyName.message}</p>
                )}
              </Form.Item>
            </Col>

            {/* Number of Units */}
            <Col xs={24} sm={24} md={8}>
              <Form.Item required>
                <Controller
                  name="maintainerName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Maintainer Name is required",
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        id="maintainerName"
                        {...field}
                        placeholder="Write Maintainer Name...."
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label htmlFor="maintainerName" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                        Owner Name
                      </label>
                    </div>
                  )}
                />
                {errors?.maintainerName && (
                  <p className="text-red-500">
                    {errors.maintainerName?.message}
                  </p>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item required>
                <Controller
                  name="houseNo"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "House No is required",
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        id="houseNo"
                        {...field}
                        placeholder="Write House No...."
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label htmlFor="houseNo" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                        House No
                      </label>
                    </div>
                  )}
                />
                {errors.houseNo && (
                  <p className="text-red-500">{errors.houseNo.message}</p>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item required>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <div className="relative">
                      <textarea
                        id="description"
                        {...field}
                        placeholder="Write Description here...."
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label htmlFor="description" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                        Description
                      </label>
                    </div>
                  )}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            {/* Amenities */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item required>
                <Controller
                  name="amenities"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Amenities name is required" }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        id="amenities"
                        {...field}
                        placeholder="Type here...."
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label htmlFor="amenities" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                        Amenities
                      </label>
                    </div>
                  )}
                />
                {errors.amenities && (
                  <p className="text-red-500">{errors.amenities.message}</p>
                )}
              </Form.Item>
            </Col>

            {/* Parking */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item required>
                <div className="relative">
                  <Controller
                    name="parking"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Parking of units is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          showSearch
                          placeholder=" "
                          optionFilterProp="label"
                          style={{
                            height: "48px",
                            width: "100%",
                          }}
                          options={[
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                          ]}
                          className="peer"
                        />
                        <label
                          className={`absolute left-3 px-1 text-sm transition-all bg-white ${field.value
                              ? "-top-2.5 text-sm text-blue-500"
                              : "top-3.5 text-base text-gray-400"
                            } peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500`}
                        >
                          Parking
                        </label>
                      </>
                    )}
                  />
                </div>
                {errors.parking && (
                  <p className="text-red-500">{errors.parking.message}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Property Location */}
        <div className="bg-white mt-6 py-8 px-6 rounded-lg">
          <h2 className="sub-heading">Property Location</h2>
          <Row gutter={[16]} className="mt-8">
            {/* Country Field */}
            <Col xs={24} sm={12} md={8}>
              <Form.Item required>
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <>
                      <AutoComplete
                        {...field}
                        style={{ height: "48px" }}
                        options={countryOptions}
                        onSearch={handleSearch}
                        placeholder="Type a country"
                        className="text-[#666666]"
                      />
                      {field.value && (
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                          Country
                        </label>
                      )}
                    </>
                  )}
                />

                {errors.country && (
                  <p className="text-red-500">{errors.country.message}</p>
                )}
              </Form.Item>
            </Col>

            {/* State Field */}
            <Col xs={24} sm={12} md={8}>
              <Form.Item required>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        id="state"
                        {...field}
                        placeholder="Write State Name"
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label htmlFor="state" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                        State
                      </label>
                    </div>
                  )}
                />
                {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                )}
              </Form.Item>
            </Col>

            {/* City Field */}
            <Col xs={24} sm={12} md={8}>
              <Form.Item required>
                <Controller
                  id="city"
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        id="city"
                        {...field}
                        placeholder="Write City Name"
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label htmlFor="city" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                        City
                      </label>
                    </div>
                  )}
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16]} className="mt-2">
            <Col xs={24} sm={12} md={12}>
              <Form.Item required>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        id="address"
                        {...field}
                        placeholder="Write Address"
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label htmlFor="address" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                        Address
                      </label>
                    </div>
                  )}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12}>
              <Form.Item required>
                <Controller
                  name="zipCode"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Zip Code is required" }}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        id="zipCode"
                        {...field}
                        type="number"
                        placeholder="Write Zip Code"
                        className="peer w-full px-3 py-3 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label htmlFor="zipCode" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                        Zip Code
                      </label>
                    </div>
                  )}
                />
                {errors.zipCode && (
                  <p className="text-red-500">{errors.zipCode.message}</p>
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white mt-6 py-8 px-6 rounded-lg">
          <h2 className="sub-heading">Property Images</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  className="h-64 w-full object-cover rounded-lg cursor-pointer"
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${index + 1}`}
                  onClick={() => handleUpdateImage(index)}
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                  onClick={() => handleDeleteImage(index)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <div className="relative inline-block">
              <input
                id="imageUpdateInput"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center text-[#e8ecf2] border border-dashed border-[#b6ceeb] rounded-lg cursor-pointer h-64 w-full">
                <div className="w-full flex-col flex items-center">
                  <IoCloudUploadOutline className="h-24 w-24" />
                  <p className="text-[#b3b4b7]">
                    Select <span className="text-blue-400">New File</span> to
                    Upload
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <div className="flex justify-end">
            <Button
              className="text-[16px] px-9 py-5 bg-gradient-to-t from-[#468ddf] to-[#1969c3] text-white font-medium 
              hover:bg-gradient-to-t hover:from-blue-600 hover:to-blue-700
               hover:shadow mt-6"
              htmlType="submit"
            >
              {
                isLoading ? <Spin size="large" /> : "Submit"
              }
              <FaAngleRight />{" "}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProperties;
