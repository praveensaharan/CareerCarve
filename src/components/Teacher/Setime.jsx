import React, { useState } from "react";
import {
  Form,
  DatePicker,
  TimePicker,
  Button,
  Typography,
  List,
  Divider,
  message,
  Row,
  Col,
} from "antd";
import moment from "moment";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import { useUser, useSession } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Setime = () => {
  const [form] = Form.useForm();
  const [dates, setDates] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const { session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleTimeChange = (time, timeString, index, type) => {
    const newDates = [...dates];
    newDates[index] = { ...newDates[index], [type]: timeString };
    setDates(newDates);
    console.log(`${type} Selected Time:`, timeString);
  };

  const handleDatePickerChange = (date, dateString) => {
    if (dateString && !dates.some((d) => d.date === dateString)) {
      setDates([
        ...dates,
        { date: dateString, startTime: null, endTime: null },
      ]);
      form.resetFields();
    }
  };

  const validateTimes = (startTime, endTime) => {
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");
    return start.isBefore(end);
  };

  const handleSubmit = async () => {
    for (const dateInfo of dates) {
      if (!validateTimes(dateInfo.startTime, dateInfo.endTime)) {
        message.error(
          `Invalid time range on ${dateInfo.date}: Start time must be before end time.`
        );
        return;
      }
    }
    console.log("Form submitted:", dates);
    setLoading(true);

    try {
      if (session) {
        // Retrieve the authentication token from the session
        const token = await session.getToken();

        // Send a POST request to update mentor details on the server
        const response = await axios.post(
          "https://careercavebackend.vercel.app/updatementorsession",
          {
            dates, // Correctly send the dates array in the request body
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Show a success message and navigate to the dashboard
          message.success("Availability saved successfully!");
          navigate("/teacher-dashboard");
        } else {
          throw new Error("Failed to update availability");
        }
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      message.error("Error updating availability: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <Title level={2} className="text-gray-800 mb-6 text-center">
          Set Your Availability
        </Title>
        <Form form={form} layout="vertical">
          <Form.Item
            name="date"
            label={
              <span className="flex items-center">
                <CalendarOutlined className="mr-2" />
                Select Date
              </span>
            }
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              onChange={handleDatePickerChange}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Form.Item>

          {dates.length > 0 && (
            <div>
              {dates.map((dateInfo, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm flex flex-col gap-4"
                >
                  <Title
                    level={4}
                    className="text-gray-800 mb-0 flex items-center gap-2"
                  >
                    <CalendarOutlined className="text-blue-500" />
                    {moment(dateInfo.date).format("YYYY-MM-DD")}
                  </Title>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <span className="flex items-center">
                            <ClockCircleOutlined className="mr-2" />
                            Start Time
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please select a start time!",
                          },
                        ]}
                      >
                        <TimePicker
                          format="HH:mm"
                          onChange={(time, timeString) =>
                            handleTimeChange(
                              time,
                              timeString,
                              index,
                              "startTime"
                            )
                          }
                          style={{ width: "100%", borderRadius: "8px" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <span className="flex items-center">
                            <ClockCircleOutlined className="mr-2" />
                            End Time
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please select an end time!",
                          },
                        ]}
                      >
                        <TimePicker
                          format="HH:mm"
                          onChange={(time, timeString) =>
                            handleTimeChange(time, timeString, index, "endTime")
                          }
                          style={{ width: "100%", borderRadius: "8px" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          )}

          <Form.Item className="mb-0">
            <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full py-2 rounded-lg"
              loading={loading}
            >
              Save Availability
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <Title level={3} className="text-gray-800 mb-4 text-center">
          Your Available Slots
        </Title>
        <div>
          {dates.length > 0 ? (
            <List
              bordered
              dataSource={dates}
              renderItem={(item) => (
                <List.Item className="flex justify-between">
                  <span>
                    <CalendarOutlined className="mr-2 text-blue-500" />
                    {moment(item.date).format("YYYY-MM-DD")}
                  </span>
                  <span>
                    <ClockCircleOutlined className="mr-2 text-blue-500" />
                    {item.startTime} to {item.endTime}
                  </span>
                </List.Item>
              )}
              className="rounded-lg overflow-hidden shadow-sm"
            />
          ) : (
            <p className="text-gray-700 text-center">No available slots set.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setime;
