import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select, AutoComplete } from "antd";
import { Controller, useForm } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import { countryData } from "../../../data/data";

const AddProperties = () => {
  const { control, handleSubmit, reset } = useForm();
  const [countryOptions, setCountryOptions] = useState([]);
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
  const onSubmit = (data) => {
    console.log(data);
    reset();
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
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Property Name"
                required
                validateStatus=""
                help=""
              >
                <Controller
                  name="propertyName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Property name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Write Property Name...."
                      className="text-[#666666] p-3"
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Number of Unit */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Number of Unit"
                required
                validateStatus=""
                help=""
              >
                <Controller
                  name="numberOfUnits"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Number of units is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Write Number of Unit...."
                      className="text-[#666666] p-3"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Description" required validateStatus="" help="">
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      type="number"
                      placeholder="Write Description here...."
                      className="text-[#666666] p-3"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16]}>
            {/* Property Name */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Amenities" required validateStatus="" help="">
                <Controller
                  name="amenities"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Amenities name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Type here...."
                      className="text-[#666666] p-3"
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Parking" required validateStatus="" help="">
                <Controller
                  name="parking"
                  control={control}
                  defaultValue=""
                  rules={{ required: "parking of units is required" }}
                  render={({ field }) => (
                    <Select
                      showSearch
                      placeholder="Select Parking"
                      optionFilterProp="label"
                      style={{
                        height: "48px",
                        width: "100%",
                      }}
                      options={[
                        {
                          value: "yes",
                          label: "Yes",
                        },
                        {
                          value: "no",
                          label: "No",
                        },
                      ]}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="bg-white mt-6 py-8 px-6 rounded-lg">
          <h2 className="sub-heading">Property Location</h2>
          <Row gutter={[16]} className="mt-8">
            {/* Country Field */}
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Country" required validateStatus="" help="">
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <AutoComplete
                      {...field}
                      style={{
                        height: "48px",
                      }}
                      options={countryOptions}
                      onSearch={handleSearch}
                      placeholder="Type a country"
                      className="text-[#666666] "
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* State Field */}
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="State" required validateStatus="" help="">
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Write State Name"
                      className="text-[#666666] p-3"
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* City Field */}
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="City" required validateStatus="" help="">
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Write City Name"
                      className="text-[#666666] p-3"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            {/* Address Field 1 */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Address" required validateStatus="" help="">
                <Controller
                  name="address1"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Write Address"
                      className="text-[#666666] p-3"
                    />
                  )}
                />
              </Form.Item>
            </Col>

            {/* Address Field 2 */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Zip Code" required validateStatus="" help="">
                <Controller
                  name="zipcode"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Write Zip Code "
                      className="text-[#666666] p-3"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProperties;
