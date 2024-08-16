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

const BaseUrl = "https://careercavebackend.vercel.app";
// const BaseUrl = "http://localhost:3000";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    const fetchMentorData = async () => {
      if (session) {
        try {
          const token = await session.getToken();
          const response = await fetch(`${BaseUrl}/sessionmentor`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch mentor data");
          }

          const data = await response.json();
          setSessions(data); // Assuming data is an array of sessions
        } catch (error) {
          message.error("Error fetching mentor data: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMentorData();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-200 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Upcoming Sessions
        </h2>
        {sessions.length > 0 ? (
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
                          {sessionItem.studentName}
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

export default Sessions;
