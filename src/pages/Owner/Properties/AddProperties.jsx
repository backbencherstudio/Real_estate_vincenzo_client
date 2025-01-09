import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Controller, useForm } from "react-hook-form";

const AddProperties = () => {
  const { control, handleSubmit, reset } = useForm();

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
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="bg-white mt-16 py-8 px-6 rounded-lg"
      >
        <h2 className="sub-heading">Property Information</h2>
        <Row gutter={[16]} className="mt-8">
          {/* Property Name */}
          <Col xs={24} sm={24} md={12}>
            <Form.Item label="Property Name" required validateStatus="" help="">
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

        {/* Submit Button */}
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
