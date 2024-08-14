import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

// Function to generate a random color
const getRandomColor = () => {
  const colors = ["#FF5733", "#33C4FF", "#28A745", "#FFC107", "#6F42C1"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const demoMentors = [
  {
    id: 112,
    name: "Alice Johnson",
    availability: [
      {
        date: "2024-08-15",
        startTime: "10:00",
        endTime: "14:00",
      },
      {
        date: "2024-08-16",
        startTime: "12:00",
        endTime: "16:00",
      },
    ],
    roles: "Digital Marketing, E-Commerce",
    rating: 3,
  },
  {
    id: 117,
    name: "Bob Smith",
    availability: [
      {
        date: "2024-08-15",
        startTime: "09:00",
        endTime: "12:00",
      },
      {
        date: "2024-08-16",
        startTime: "14:00",
        endTime: "17:00",
      },
    ],
    roles: "FMCG Sales, Retail Management",
    rating: 4,
  },
  {
    id: 116,
    name: "Carol Lee",
    availability: [
      {
        date: "2024-08-17",
        startTime: "09:00",
        endTime: "13:00",
      },
      {
        date: "2024-08-18",
        startTime: "11:00",
        endTime: "15:00",
      },
    ],
    roles: "Equity Research, Financial Analysis",
    rating: 4.5,
  },
];

const Mentors = () => {
  const navigate = useNavigate();

  const handleMentorClick = () => {
    navigate("/student-premium-form");
  };

  // Function to format availability into a list of readable strings
  const formatAvailability = (availability) => {
    return (
      <ul className="list-disc ml-6">
        {availability.map((slot, index) => (
          <li key={index} className="text-gray-600 mb-1">
            <span className="font-semibold">
              {moment(slot.date).format("dddd, MMMM Do")}:
            </span>
            {slot.startTime} - {slot.endTime}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
        Meet Our Mentors
      </h2>
      {demoMentors.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-8">
          {demoMentors.map((mentor) => (
            <li
              key={mentor.id}
              className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 flex items-center hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={handleMentorClick}
            >
              <Avatar
                size={80}
                icon={<UserOutlined />}
                className="flex-shrink-0 mr-8"
                style={{
                  backgroundColor: getRandomColor(),
                }}
              />
              <div>
                <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                  {mentor.name}
                </h3>
                <div className="mb-4">
                  <strong className="text-gray-800">Available:</strong>
                  {formatAvailability(mentor.availability)}
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Roles:</strong> {mentor.roles}
                </p>
                <div className="flex items-center">
                  <strong className="text-gray-700 mr-2">Rating:</strong>
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={mentor.rating}
                    className="text-yellow-500"
                  />
                  <span className="text-gray-600 ml-2">
                    ({mentor.rating} / 5)
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 text-center">No mentors available.</p>
      )}
    </div>
  );
};

export default Mentors;
