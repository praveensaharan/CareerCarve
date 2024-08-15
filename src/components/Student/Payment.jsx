import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import {
  DollarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const demoPaymentData = {
  mentorName: "Alice Johnson",
  time: "2:00 PM",
  duration: "30 min",
  studentName: "John Doe",
  date: "2024-08-20",
  role: "Digital Marketing",
  price: 2000,
};

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment processed!");
    navigate("/student-dashboard");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <Card
        className="w-full max-w-lg"
        bordered={false}
        title={<Title level={2}>Payment Details</Title>}
        extra={
          <Button type="link" onClick={() => navigate("/student-dashboard")}>
            Exit
          </Button>
        }
        style={{ borderRadius: "12px" }}
      >
        <Title level={3} className="mb-4">
          Class Details
        </Title>
        <div className="space-y-2">
          <div className="flex items-center">
            <UserOutlined className="text-blue-500 text-lg mr-2" />
            <Text strong>Mentor:</Text> {demoPaymentData.mentorName}
          </div>
          <div className="flex items-center">
            <ClockCircleOutlined className="text-gray-600 text-lg mr-2" />
            <Text strong>Time:</Text> {demoPaymentData.time}
          </div>
          <div className="flex items-center">
            <CalendarOutlined className="text-gray-600 text-lg mr-2" />
            <Text strong>Date:</Text> {demoPaymentData.date}
          </div>
          <div className="flex items-center">
            <ClockCircleOutlined className="text-gray-600 text-lg mr-2" />
            <Text strong>Duration:</Text> {demoPaymentData.duration}
          </div>
          <div className="flex items-center">
            <DollarOutlined className="text-green-600 text-lg mr-2" />
            <Text strong>Role:</Text> {demoPaymentData.role}
          </div>
          <div className="mt-4">
            <Title level={4} className="text-lg">
              Price to Pay
            </Title>
            <Text className="text-2xl font-bold text-green-600">
              ${demoPaymentData.price}
            </Text>
          </div>
        </div>
        <Button
          type="primary"
          className="w-full mt-6"
          onClick={handlePayment}
          size="large"
          style={{ borderRadius: "8px" }}
        >
          Proceed to Payment
        </Button>
      </Card>
    </div>
  );
};

export default Payment;
