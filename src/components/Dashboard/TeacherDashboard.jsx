import React, { useEffect, useState } from "react";
import { useUser, useSession, SignOutButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import {
  CalendarOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Sessions from "../Teacher/Sessions";
import Available from "../Teacher/Available";

const TeacherDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { session } = useSession();
  const [mentorData, setMentorData] = useState(null);
  const [error, setError] = useState(null);

  const name = user?.unsafeMetadata?.name || user?.fullName || "Not Available";
  const role = mentorData?.roles || "Not Available";

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const token = await session.getToken();
          const response = await axios.get(
            "https://careercavebackend.vercel.app/fetchmentor",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            setMentorData(response.data.credits);
          } else {
            throw new Error("Failed to fetch mentor data");
          }
        } catch (error) {
          console.error("Error fetching mentor data:", error);
          setError(error.message);
          message.error("Error fetching mentor data: " + error.message);
        }
      }
    };

    fetchData();
  }, [session]);

  const handleAvailability = () => {
    // if (user?.unsafeMetadata?.roles)
    if (mentorData?.roles) {
      navigate("/teacher-settime");
    } else {
      navigate("/teacher-form");
      message.error("First Choose Your Roles");
    }
  };

  const handleDetails = () => {
    navigate("/teacher-form");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gradient-to-r from-green-400 to-green-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Mentor Dashboard
          </h1>
          <SignOutButton>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-200 transform hover:scale-105"
            >
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold mb-6">
            Welcome, {user?.fullName || "Teacher"}!
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <strong>Email:</strong>{" "}
              {user?.primaryEmailAddress?.emailAddress || "Not Available"}
            </p>
            <p className="text-gray-600">
              <strong>Name:</strong> {name}
            </p>
            <p className="text-gray-600">
              <strong>Roles:</strong> {role}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-green-100 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-700">
                  Set Your Availability
                </h3>
                <p className="text-sm text-gray-600">
                  Manage your available time slots.
                </p>
              </div>
              <Button
                onClick={handleAvailability}
                type="primary"
                icon={<CalendarOutlined />}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Set Availability
              </Button>
            </div>

            <div className="bg-blue-100 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-700">
                  Set Your Details
                </h3>
                <p className="text-sm text-gray-600">
                  Update your personal information and preferences.
                </p>
              </div>
              <Button
                onClick={handleDetails}
                type="primary"
                icon={<SettingOutlined />}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Set Details
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row">
            <div className="mt-10 w-full sm:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Your Current Availability
              </h3>
              <Available />
            </div>

            <div className="mt-10 w-full sm:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Upcoming Sessions
              </h3>
              <Sessions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
