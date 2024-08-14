import React from "react";
import { Card, Badge, Row, Col } from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import moment from "moment";

const demoData = [
  {
    studentName: "John Doe",
    duration: "30 min",
    dateTime: "2024-08-20 14:00:00",
    role: "Digital Marketing",
  },
  {
    studentName: "Jane Smith",
    duration: "45 min",
    dateTime: "2024-08-22 16:00:00",
    role: "FMCG Sales",
  },
];

const Sessions = () => {
  return (
    <div className="p-4 sm:p-8 bg-gray-200 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Upcoming Sessions
        </h2>
        {demoData.length > 0 ? (
          <Row gutter={[16, 16]} justify="center">
            {demoData.map((session, index) => (
              <Col xs={24} sm={12} lg={12} key={index}>
                <Badge.Ribbon text="Upcoming" color="green">
                  <Card
                    hoverable
                    className="rounded-2xl shadow-xl"
                    title={
                      <div className="flex items-center">
                        <UserOutlined className="text-blue-500 text-2xl mr-3" />
                        <span className="text-xl sm:text-2xl font-semibold text-gray-900">
                          {session.studentName}
                        </span>
                      </div>
                    }
                  >
                    <p className="text-gray-800 flex items-center mb-3">
                      <ClockCircleOutlined className="text-gray-600 text-lg mr-2" />
                      <strong className="text-gray-700">Duration:</strong>{" "}
                      {session.duration}
                    </p>
                    <p className="text-gray-800 flex items-center mb-3">
                      <CalendarOutlined className="text-gray-600 text-lg mr-2" />
                      <strong className="text-gray-700">Date & Time:</strong>{" "}
                      {moment(session.dateTime).format("MMMM Do YYYY, h:mm A")}
                    </p>
                    <p className="text-gray-800 flex items-center mb-3">
                      <IdcardOutlined className="text-gray-600 text-lg mr-2" />
                      <strong className="text-gray-700">Role:</strong>{" "}
                      {session.role}
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
