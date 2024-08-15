import React, { useState, useEffect } from "react";
import { Card, Badge, Row, Col, message } from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useSession } from "@clerk/clerk-react";

const Upcoming = () => {
  const [sessions, setSessions] = useState([]); // Corrected state variable name
  const [loading, setLoading] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    const fetchMentorData = async () => {
      if (session) {
        try {
          const token = await session.getToken();
          const response = await fetch(
            "https://careercavebackend.vercel.app/sessionstudent",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch mentor data");
          }

          const data = await response.json();
          setSessions(data); // Updated state correctly
        } catch (error) {
          message.error("Error fetching mentor data: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    // Delay the fetch by 3 seconds
    const delayFetch = setTimeout(() => {
      fetchMentorData();
    }, 2000);

    // Clear timeout if the component unmounts
    return () => clearTimeout(delayFetch);
  }, [session]);
  return (
    <div className="p-4 sm:p-8 bg-gray-200 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Upcoming Sessions
        </h2>
        {loading ? (
          <p className="text-gray-700 text-center">Loading...</p>
        ) : sessions.length > 0 ? ( // Corrected session to sessions
          <Row gutter={[16, 16]} justify="center">
            {sessions.map((sessionItem, index) => (
              <Col xs={24} sm={12} lg={12} key={index}>
                <Badge.Ribbon text="Upcoming" color="green">
                  <Card
                    hoverable
                    className="rounded-2xl shadow-xl"
                    title={
                      <div className="flex items-center">
                        <UserOutlined className="text-blue-500 text-2xl mr-3" />
                        <span className="text-xl sm:text-2xl font-semibold text-gray-900">
                          {sessionItem.mentorName}
                        </span>
                      </div>
                    }
                  >
                    <p className="text-gray-800 flex items-center mb-3">
                      <ClockCircleOutlined className="text-gray-600 text-lg mr-2" />
                      <strong className="text-gray-700">Duration:</strong>{" "}
                      {sessionItem.duration}
                    </p>
                    <p className="text-gray-800 flex items-center mb-3">
                      <CalendarOutlined className="text-gray-600 text-lg mr-2" />
                      <strong className="text-gray-700">Date & Time:</strong>{" "}
                      {moment(sessionItem.dateTime).format(
                        "MMMM Do YYYY, h:mm A"
                      )}
                    </p>
                    <p className="text-gray-800 flex items-center mb-3">
                      <IdcardOutlined className="text-gray-600 text-lg mr-2" />
                      <strong className="text-gray-700">Role:</strong>{" "}
                      {sessionItem.role}
                    </p>
                    <p className="text-gray-800 flex items-center">
                      <IdcardOutlined className="text-gray-600 text-lg mr-2" />
                      <strong className="text-gray-700">Order ID:</strong>{" "}
                      {sessionItem.orderId}
                    </p>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-gray-700 text-center">No upcoming sessions.</p>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
