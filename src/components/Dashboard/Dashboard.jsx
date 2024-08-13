import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const role = user.publicMetadata.role;

      // Redirect based on the user's role
      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        // Optionally handle unrecognized role or error
        console.error("Unrecognized role:", role);
      }
    }
  }, [user, navigate]);

  return <div>Loading...</div>;
}

export default Dashboard;
