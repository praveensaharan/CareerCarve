import React from "react";
import { useNavigate } from "react-router-dom";

// Demo data for mentors
const demoMentors = [
  {
    id: 112,
    name: "Alice Johnson",
    available: "Monday, Wednesday, Friday - 2:00 PM to 5:00 PM",
    roles: "Digital Marketing, E-Commerce",
    rating: 4.8,
  },
  {
    id: 117,
    name: "Bob Smith",
    available: "Tuesday, Thursday - 9:00 AM to 12:00 PM",
    roles: "FMCG Sales, Retail Management",
    rating: 4.5,
  },
  {
    id: 116,
    name: "Carol Lee",
    available: "Monday to Friday - 10:00 AM to 3:00 PM",
    roles: "Equity Research, Financial Analysis",
    rating: 4.7,
  },
];

const Mentors = () => {
  const navigate = useNavigate();

  const handleMentorClick = () => {
    navigate("/student-premium-form");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Mentors</h2>
      {demoMentors.length > 0 ? (
        <ul className="space-y-4">
          {demoMentors.map((mentor) => (
            <li
              key={mentor.id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm cursor-pointer"
              onClick={handleMentorClick}
            >
              <h3 className="text-xl font-medium mb-2">Name: {mentor.name}</h3>
              <p className="text-gray-700">
                <strong>Available:</strong> {mentor.available}
              </p>
              <p className="text-gray-700">
                <strong>Roles:</strong> {mentor.roles}
              </p>
              <p className="text-gray-700">
                <strong>Rating:</strong> {mentor.rating} / 5
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No mentors available.</p>
      )}
    </div>
  );
};

export default Mentors;
