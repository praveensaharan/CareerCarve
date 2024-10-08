import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import { message } from "antd";
import { useSession } from "@clerk/clerk-react";

const BaseUrl = "https://careercavebackend.vercel.app";
// const BaseUrl = "http://localhost:3000";

const Available = () => {
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const { session } = useSession();

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        if (session) {
          const token = await session.getToken();

          const response = await fetch(`${BaseUrl}/getmentordata`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch mentor data");
          }

          const data = await response.json();
          setAvailableSlots(data.availability || []); // Handle potential null values
        }
      } catch (error) {
        message.error("Error fetching mentor data: " + error.message);
      }
    };

    fetchMentorData();
  }, [session]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formattedDate = moment(date).format("YYYY-MM-DD");

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Available Time Slots
      </h2>

      {/* Calendar Component */}
      <div className="w-full max-w-3xl mb-8">
        <Calendar
          className="bg-white rounded-lg shadow-md w-full h-96"
          onChange={handleDateChange}
          value={date}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const formattedTileDate = moment(date).format("YYYY-MM-DD");
              const isSlotAvailable = availableSlots.some(
                (slot) => slot.date === formattedTileDate
              );
              return isSlotAvailable ? "bg-green-200" : "";
            }
            return "";
          }}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const formattedTileDate = moment(date).format("YYYY-MM-DD");
              const slot = availableSlots.find(
                (slot) => slot.date === formattedTileDate
              );
              if (slot) {
                return (
                  <div className="text-center text-sm text-gray-600">
                    <div>{slot.startTime}</div>
                    <div>{slot.endTime}</div>
                  </div>
                );
              }
            }
            return null;
          }}
        />
      </div>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          All Available Slots
        </h3>
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left text-gray-700 font-medium">
                Date
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">
                Start Time
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">
                End Time
              </th>
            </tr>
          </thead>
          <tbody>
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-2 text-gray-800">{slot.date}</td>
                  <td className="px-4 py-2 text-gray-800">{slot.startTime}</td>
                  <td className="px-4 py-2 text-gray-800">{slot.endTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-600">
                  No slots available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Available;
