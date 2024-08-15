import React, { useState, useEffect } from "react";
import { Card, Badge, Row, Col, message } from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import moment from "moment";

const Upcoming = () => {
  const [session, setSession] = useState([]);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch("http://localhost:3000/sessionstudent");
        if (!response.ok) {
          throw new Error("Failed to fetch mentor data");
        }
        const data = await response.json();
        setSession(data); // Update state with fetched data
      } catch (error) {
        message.error("Error fetching mentor data: " + error.message);
      }
    };

    fetchMentorData();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gray-200 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Upcoming Sessions
        </h2>
        {session.length > 0 ? (
          <Row gutter={[16, 16]} justify="center">
            {session.map((sessionItem, index) => (
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
