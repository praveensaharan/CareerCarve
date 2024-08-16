import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Typography, Input, message, Spin } from "antd";
import {
  DollarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useSession } from "@clerk/clerk-react";
import axios from "axios";
import moment from "moment";
import CapthaImage from "../../assets/captcha.png";

const { Title, Text } = Typography;
const BaseUrl = "https://careercavebackend.vercel.app";
// const BaseUrl = "http://localhost:3000";

const Payment = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const { session } = useSession();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(null);
  const [processing, setProcessing] = useState(false); // Added loading state for payment
  const captchaCode = "679543"; // The CAPTCHA code to be entered by the user

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        if (session) {
          const token = await session.getToken();

          const response = await axios.get(
            `${BaseUrl}/payment?id=${paymentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setPaymentData(response.data);
        }
      } catch (error) {
        setError("Failed to fetch payment data.");
        message.error("Error fetching payment data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [paymentId, session]);

  const handlePayment = async () => {
    if (captchaInput !== captchaCode) {
      setCaptchaError("Incorrect CAPTCHA. Please try again.");
      return;
    }

    setProcessing(true); // Set loading to true when processing payment

    try {
      if (session) {
        const token = await session.getToken();

        await axios.post(
          `${BaseUrl}/payment-done`,
          { id: paymentId, check: captchaInput },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        message.success("Payment processed successfully!");
        navigate("/student-dashboard");
      }
    } catch (error) {
      message.error("Failed to process payment: " + error.message);
    } finally {
      setProcessing(false); // Ensure loading is stopped after request
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
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
          <div className="text-red-500 text-center">{error}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <Card
        className="w-full max-w-lg shadow-xl rounded-3xl overflow-hidden bg-white"
        bordered={false}
        title={
          <div className="flex justify-between items-center">
            <Title level={2} className="text-gray-800">
              Payment Details
            </Title>
            <Button
              type="link"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => navigate("/student-dashboard")}
            >
              Exit
            </Button>
          </div>
        }
      >
        <Title level={3} className="mb-4 text-gray-700">
          Class Details
        </Title>
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <UserOutlined className="text-blue-500 text-2xl mr-3" />
            <Text strong className="mr-1">
              Mentor Email:
            </Text>{" "}
            {paymentData.mentor_email}
          </div>
          <div className="flex items-center text-gray-600">
            <ClockCircleOutlined className="text-gray-600 text-2xl mr-3" />
            <Text strong className="mr-1">
              Time:
            </Text>{" "}
            {moment(paymentData.time, "HH:mm:ss").format("hh:mm A")}
          </div>
          <div className="flex items-center text-gray-600">
            <CalendarOutlined className="text-gray-600 text-2xl mr-3" />
            <Text strong className="mr-1">
              Date:
            </Text>{" "}
            {moment(paymentData.date).format("MMMM Do, YYYY")}
          </div>
          <div className="flex items-center text-gray-600">
            <ClockCircleOutlined className="text-gray-600 text-2xl mr-3" />
            <Text strong className="mr-1">
              Duration:
            </Text>{" "}
            {paymentData.duration}
          </div>
          <div className="flex items-center text-gray-600">
            <DollarOutlined className="text-green-500 text-2xl mr-3" />
            <Text strong className="mr-1">
              Role:
            </Text>{" "}
            {paymentData.role}
          </div>
          <div className="mt-6">
            <Title level={4} className="text-xl text-gray-800">
              Price to Pay
            </Title>
            <Text className="text-3xl font-extrabold text-green-600">
              ₹{parseFloat(paymentData.price).toFixed(2)}
            </Text>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <Title level={4} className="text-xl text-gray-900 font-semibold">
              Verify CAPTCHA
            </Title>
            <img
              src={CapthaImage}
              alt="CAPTCHA"
              className="ml-4 h-12 border rounded shadow-md"
            />
          </div>
          <Input
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Enter CAPTCHA"
            maxLength={6}
            className={`text-lg py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              captchaError
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-blue-500 border-gray-300"
            }`}
            size="large"
            status={captchaError ? "error" : ""}
          />
          {captchaError && (
            <div className="text-red-600 mt-2 text-sm font-medium">
              {captchaError}
            </div>
          )}
        </div>

        <Button
          type="primary"
          className="w-full mt-8 py-3 text-lg rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
          onClick={handlePayment}
          loading={processing} // Added loading state to button
        >
          Proceed to Payment
        </Button>
      </Card>
    </div>
  );
};

export default Payment;
