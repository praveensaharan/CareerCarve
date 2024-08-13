import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.unsafeMetadata.role !== "student") {
        // Redirect to a different page if the user is not a student
        navigate("/not-authorized");
      }
    } else {
      // Redirect to login if no user is found
      navigate("/student-login");
    }
  }, [user, navigate]);

  return <div>Student Dashboard</div>;
};

export default StudentDashboard;
