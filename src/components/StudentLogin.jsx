import React, { useEffect } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        const { unsafeMetadata } = user;

        // Check if the user has a role defined
        if (unsafeMetadata && unsafeMetadata.role) {
          if (unsafeMetadata.role === "student") {
            navigate("/student-dashboard");
          } else if (unsafeMetadata.role === "teacher") {
            navigate("/teacher-dashboard");
          }
        } else {
          // If no role is defined, set it to 'student' and redirect to student dashboard
          await user.update({ unsafeMetadata: { role: "student" } });
          navigate("/student-dashboard");
        }
      }
    };

    checkUserRole();
  }, [user, navigate]);

  return (
    <div>
      <h2>Student Login</h2>
      <SignIn />
    </div>
  );
}

export default StudentLogin;
