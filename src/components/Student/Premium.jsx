import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  DatePicker,
  TimePicker,
  Select,
  Form,
  message,
  Avatar,
  Rate,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const Premium = () => {
  const [mentor, setMentor] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mentorId } = useParams(); // Get the mentor ID from the URL parameters

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/getmentor?id=${mentorId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch mentor data");
        }
        const data = await response.json();
        setMentor(data);
      } catch (error) {
        message.error("Error fetching mentor data: " + error.message);
      }
    };

    fetchMentorData();
  }, [mentorId]);

  const validateForm = (values) => {
    const { date, time, role, duration } = values;
    let valid = true;

    const selectedDate = date ? date.format("YYYY-MM-DD") : "";
    const availabilityForDate = mentor.availability.find(
      (avail) => avail.date === selectedDate
    );

    if (!date) {
      message.error("Date is required.");
      valid = false;
    } else if (!availabilityForDate) {
      message.error("Date is not available for this mentor.");
      valid = false;
    }

    if (!time) {
      message.error("Time is required.");
      valid = false;
    } else if (availabilityForDate) {
      const [startHour, startMinute] = availabilityForDate.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = availabilityForDate.endTime
        .split(":")
        .map(Number);
      const [selectedHour, selectedMinute] = time
        .format("HH:mm")
        .split(":")
        .map(Number);

      // Check if the selected time is within the mentor's availability
      if (
        selectedHour < startHour ||
        (selectedHour === startHour && selectedMinute < startMinute) ||
        selectedHour > endHour ||
        (selectedHour === endHour && selectedMinute > endMinute)
      ) {
        message.error("Time is outside of mentor's availability.");
        valid = false;
      }

      // Calculate the session's end time based on the selected time and duration
      if (valid) {
        const durationInMinutes = parseInt(duration.split(" ")[0], 10); // Extracting the duration value
        const selectedTimeInMinutes = selectedHour * 60 + selectedMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;
        const sessionEndTimeInMinutes =
          selectedTimeInMinutes + durationInMinutes;

        // Check if session's end time exceeds mentor's available end time
        if (sessionEndTimeInMinutes > endTimeInMinutes) {
          message.error(
            "The session's end time exceeds the mentor's availability."
          );
          valid = false;
        }
      }
    }

    if (!role || !mentor.roles.includes(role)) {
      message.error("Role must match mentor's expertise.");
      valid = false;
    }

    return valid;
  };

  const formatAvailability = (availability) => {
    return (
      <ul className="list-disc ml-6">
        {availability.map((slot, index) => (
          <li key={index} className="text-gray-600 mb-1">
            <span className="font-semibold">
              {moment(slot.date).format("dddd, MMMM Do")}:
            </span>{" "}
            {slot.startTime} - {slot.endTime}
          </li>
        ))}
      </ul>
    );
  };

  const handleSubmit = (values) => {
    if (validateForm(values)) {
      console.log("Form submitted with data:", values);
      navigate("/payment-checkout");
    }
  };

  if (!mentor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Mentor Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center lg:w-1/3 transition-transform duration-300 hover:scale-105">
          <Avatar
            size={100}
            icon={<UserOutlined />}
            className="mb-6"
            style={{
              backgroundColor: "#87d068",
            }}
          />
          <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            {mentor.name}
          </h3>
          <div className="text-center mb-4">
            <p className="text-gray-700 mb-1">
              <strong>Available Dates:</strong>{" "}
              {formatAvailability(mentor.availability)}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Expertise:</strong> {mentor.roles.join(", ")}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:w-2/3 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Book a Session with {mentor.name}
          </h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ date: null, time: null, role: "", duration: "" }}
          >
            <Form.Item
              label="Select Date"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
              className="mb-6"
            >
              <DatePicker
                className="w-full"
                disabledDate={(current) =>
                  current && current < moment().endOf("day")
                }
              />
            </Form.Item>

            <Form.Item
              label="Select Time"
              name="time"
              rules={[{ required: true, message: "Please select a time" }]}
              className="mb-6"
            >
              <TimePicker
                className="w-full"
                format="HH:mm"
                // minuteStep={15}
                // disabledHours={() =>
                //   mentor.availability.map((a) =>
                //     [...Array(24).keys()].filter(
                //       (h) =>
                //         h < a.startTime.split(":")[0] ||
                //         h > a.endTime.split(":")[0]
                //     )
                //   )[0]
                // }
              />
            </Form.Item>

            <Form.Item
              label="Select Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
              className="mb-6"
            >
              <Select className="w-full" placeholder="Select a Role">
                {mentor.roles.map((role, index) => (
                  <Option key={index} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Duration"
              name="duration"
              rules={[{ required: true, message: "Please select a duration" }]}
              className="mb-6"
            >
              <Select className="w-full" placeholder="Select Duration">
                <Option value="30 min">30 min</Option>
                <Option value="45 min">45 min</Option>
                <Option value="60 min">60 min</Option>
              </Select>
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Confirm Booking
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Premium;
