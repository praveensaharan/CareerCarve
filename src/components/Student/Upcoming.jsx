import React from "react";

// Demo JSON data with updated format
const demoData = [
  {
    mentorName: "John Doe",
    duration: "30 min",
    dateTime: "2024-08-20 14:00:00",
    role: "Digital Marketing",
    orderId: "ORD123456",
  },
  {
    mentorName: "Jane Smith",
    duration: "45 min",
    dateTime: "2024-08-22 16:00:00",
    role: "FMCG Sales",
    orderId: "ORD123457",
  },
];

const Upcoming = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
      {demoData.length > 0 ? (
        <ul className="space-y-4">
          {demoData.map((session, index) => (
            <li
              key={index}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-xl font-medium mb-2">
                Mentor: {session.mentorName}
              </h3>
              <p className="text-gray-700">
                <strong>Duration:</strong> {session.duration}
              </p>
              <p className="text-gray-700">
                <strong>Date & Time:</strong>{" "}
                {new Date(session.dateTime).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Role:</strong> {session.role}
              </p>
              <p className="text-gray-700">
                <strong>Order ID:</strong> {session.orderId}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No upcoming sessions.</p>
      )}
    </div>
  );
};

export default Upcoming;
