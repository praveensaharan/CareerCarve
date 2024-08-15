import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, DatePicker, TimePicker, Select, Form, message } from "antd";
import moment from "moment";

const { Option } = Select;

const Premium = () => {
  const [mentor, setMentor] = React.useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getmentor?id=118");
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
  }, []);

  // Validate form data
  const validateForm = (values) => {
    const { date, time, role } = values;
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

      if (
        selectedHour < startHour ||
        (selectedHour === startHour && selectedMinute < startMinute) ||
        selectedHour > endHour ||
        (selectedHour === endHour && selectedMinute > endMinute)
      ) {
        message.error("Time is outside of mentor's availability.");
        valid = false;
      }
    }

    if (!role || !mentor.roles.includes(role)) {
      message.error("Role must match mentor's expertise.");
      valid = false;
    }

    return valid;
  };

  // Handle form submission
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
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Schedule Premium Session with {mentor.name}
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ date: null, time: null, role: "", duration: "" }}
        >
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
            className="mb-6"
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please select a time" }]}
            className="mb-6"
          >
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
            className="mb-6"
          >
            <Select className="w-full" placeholder="Select Role">
              {mentor.roles.map((r, index) => (
                <Option key={index} value={r}>
                  {r}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Duration"
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
              className="w-full py-2 rounded-md"
            >
              Book Session
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Premium;
