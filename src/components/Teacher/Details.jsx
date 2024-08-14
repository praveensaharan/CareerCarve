import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Typography } from "antd";
import { useUser } from "@clerk/clerk-react";

const { Option } = Select;
const { Title } = Typography;

const Details = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (values) => {
    console.log("Form submitted:", values);
    setLoading(true); // Start loading

    try {
      // Update the user's metadata with Clerk
      await user.update({
        unsafeMetadata: {
          name: values.name,
          roles: values.role,
          role: "teacher",
        },
      });

      navigate("/teacher-dashboard");
    } catch (error) {
      console.error("Failed to update user metadata:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <Title level={2} className="text-gray-800 mb-6 text-center">
          Mentor Details Update
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: user?.fullName || "",
            role: null,
          }}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Expertise Roles"
            rules={[{ required: true, message: "Please select your roles!" }]}
          >
            <Select
              mode="tags"
              placeholder="Select or type your expertise roles"
              style={{ width: "100%" }}
            >
              <Option value="Digital Marketing">Digital Marketing</Option>
              <Option value="FMCG Sales">FMCG Sales</Option>
              <Option value="Retail Management">Retail Management</Option>
              <Option value="Financial Analysis">Financial Analysis</Option>
            </Select>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 rounded-md"
              loading={loading} // Show loading spinner while submitting
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Details;
