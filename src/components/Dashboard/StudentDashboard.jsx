import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Mentors from "../Student/Mentors";
import Sessions from "../Student/Upcoming";
import { Button } from "antd";
import { LogoutOutlined, BookOutlined } from "@ant-design/icons";
import { SignOutButton } from "@clerk/clerk-react";

const StudentDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Redirect if no user
  if (!user) {
    navigate("/");
    return null;
  }

  // Navigate to the booking form
  const handleNavigate = () => {
    navigate("/student-form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Student Dashboard
          </h1>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-200 transform hover:scale-105"
          >
            <SignOutButton />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* User Details */}
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome, {user?.fullName || "Student"}!
              </h2>
              <p className="text-gray-700 mb-4">
                Here are your details and upcoming sessions.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Your Details</h3>
                <p className="text-gray-600">
                  <strong className="text-gray-800">Name:</strong>{" "}
                  {user?.fullName}
                </p>
                <p className="text-gray-600">
                  <strong className="text-gray-800">Email:</strong>{" "}
                  {user?.primaryEmailAddress.emailAddress}
                </p>
              </div>
            </div>

            {/* Booking Button */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Book a Session</h2>
              <Button
                onClick={handleNavigate}
                type="primary"
                icon={<BookOutlined />}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200 transform hover:scale-105"
              >
                Book Now
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 lg:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Upcoming Sessions</h3>
            <Sessions />
          </div>
        </div>

        {/* Mentors */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Mentors</h3>
          <Mentors />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
