import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const Premium = () => {
  const [mentor, setMentor] = useState(null);
  const [formData, setFormData] = useState({
    time: "",
    role: "",
    duration: "",
    date: "",
  });
  const [errors, setErrors] = useState({
    time: "",
    role: "",
    date: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  // Hardcoded mentor data for demo
  const mentorData = {
    id: "2",
    name: "Bob Smith",
    availability: [
      {
        date: "2024-08-15",
        startTime: "10:00",
        endTime: "14:00",
      },
      {
        date: "2024-08-16",
        startTime: "12:00",
        endTime: "16:00",
      },
      {
        date: "2024-08-17",
        startTime: "09:00",
        endTime: "13:00",
      },
    ],
    roles: ["FMCG Sales", "Retail Management"],
  };

  // Set mentor data in state
  useState(() => {
    setMentor(mentorData);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    let valid = true;
    const newErrors = { time: "", role: "", date: "" };

    // Check if date is selected and in mentor's availability
    const selectedDate = new Date(formData.date).toISOString().split("T")[0];
    const availabilityForDate = mentor.availability.find(
      (avail) => avail.date === selectedDate
    );

    if (!formData.date) {
      newErrors.date = "Date is required.";
      valid = false;
    } else if (!availabilityForDate) {
      newErrors.date = "Date is not available for this mentor.";
      valid = false;
    }

    if (!formData.time) {
      newErrors.time = "Time is required.";
      valid = false;
    } else if (availabilityForDate) {
      const [startHour, startMinute] = availabilityForDate.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = availabilityForDate.endTime
        .split(":")
        .map(Number);
      const [selectedHour, selectedMinute] = formData.time
        .split(":")
        .map(Number);

      if (
        selectedHour < startHour ||
        (selectedHour === startHour && selectedMinute < startMinute) ||
        selectedHour > endHour ||
        (selectedHour === endHour && selectedMinute > endMinute)
      ) {
        newErrors.time = "Time is outside of mentor's availability.";
        valid = false;
      }
    }

    if (!formData.role || !mentor.roles.includes(formData.role)) {
      newErrors.role = "Role must match mentor's expertise.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted with data:", formData);
      // Perform form submission logic here

      // Navigate to the payment-checkout page after successful form submission
      navigate("/payment-checkout");
    }
  };

  if (!mentor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Schedule Premium Session with {mentor.name}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm"
      >
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-medium mb-2"
          >
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.date ? "border-red-500" : ""
            }`}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-gray-700 font-medium mb-2"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.time ? "border-red-500" : ""
            }`}
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-md ${
              errors.role ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Role</option>
            {mentor.roles.map((r, index) => (
              <option key={index} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-gray-700 font-medium mb-2"
          >
            Duration
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Duration</option>
            <option value="30 min">30 min</option>
            <option value="45 min">45 min</option>
            <option value="60 min">60 min</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Book Session
        </button>
      </form>
    </div>
  );
};

export default Premium;
