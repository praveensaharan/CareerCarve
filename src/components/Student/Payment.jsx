import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-medium mb-4">Class Details</h3>
        <p className="text-gray-700">
          <strong>Mentor:</strong> {demoPaymentData.mentorName}
        </p>
        <p className="text-gray-700">
          <strong>Time:</strong> {demoPaymentData.time}
        </p>
        <p className="text-gray-700">
          <strong>Duration:</strong> {demoPaymentData.duration}
        </p>
        <p className="text-gray-700">
          <strong>Student:</strong> {demoPaymentData.studentName}
        </p>
        <p className="text-gray-700">
          <strong>Role:</strong> {demoPaymentData.role}
        </p>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Price to Pay</h4>
          <p className="text-2xl font-bold text-green-600">
            ${demoPaymentData.price}
          </p>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-600"
          onClick={handlePayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
