import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, DatePicker, TimePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const BookingForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    navigate("/payment-checkout");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Booking Form
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            time: null,
            role: "",
            duration: "",
            date: null,
          }}
        >
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please select a time" }]}
            className="mb-6"
          >
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
            className="mb-6"
          >
            <Select className="w-full" placeholder="Select Role">
              <Option value="E-Commerce">E-Commerce</Option>
              <Option value="FMCG Sales">FMCG Sales</Option>
              <Option value="Retail Management">Retail Management</Option>
              <Option value="Digital Marketing">Digital Marketing</Option>
              <Option value="Project Management">Project Management</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please select a duration" }]}
            className="mb-6"
          >
            <Select className="w-full" placeholder="Select Duration">
              <Option value="30 min">30 min</Option>
              <Option value="45 min">45 min</Option>
              <Option value="60 min">60 min</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
            className="mb-6"
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 rounded-md"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;
