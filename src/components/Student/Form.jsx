import React, { useState } from "react";
import { useSession } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const BookingForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { session } = useSession(); // Corrected session usage
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (values) => {
    try {
      if (session) {
        setLoading(true);
        const token = await session.getToken();
        const response = await axios.post(
          "http://localhost:3000/payment-checkout",
          {
            time: values.time.format("HH:mm"), // Formatting time correctly
            role: values.role,
            duration: values.duration,
            date: values.date.format("YYYY-MM-DD"), // Formatting date correctly
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const paymentid = response.data.paymentid; // Assuming paymentid is returned by the API
          message.success("Booking successful!");
          // navigate(`/payment-checkout/${paymentid}`);
        } else {
          throw new Error("Failed to book session");
        }
      }
    } catch (error) {
      console.error("Error submitting booking form:", error);
      message.error("Error submitting booking form: " + error.message);
    } finally {
      setLoading(false); // Ensure loading is stopped after request
    }
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
              loading={loading} // Added loading state to button
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
