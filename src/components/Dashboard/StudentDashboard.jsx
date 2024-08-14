import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Mentors from "../Student/Mentors";
import Sessions from "../Student/Upcoming";

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Student Dashboard
          </h1>
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition duration-200 transform hover:scale-105"
          >
            View Profile
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8 space-y-6">
        {/* User Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user?.fullName || "Student"}!
          </h2>
          <p className="text-gray-700 mb-4">
            Here are your details and upcoming sessions.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Your Details</h3>
            <p className="text-gray-600">
              <strong>Name:</strong> {user?.fullName}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user?.primaryEmailAddress.emailAddress}
            </p>
          </div>
        </div>
        {/* Booking Button */}
        <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Book a Session</h2>
          <button
            onClick={handleNavigate}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200 transform hover:scale-105"
          >
            Book Now
          </button>
        </div>

        {/* Mentors and Sessions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Mentors</h3>
            <Mentors />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Sessions</h3>
            <Sessions />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Your School Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
