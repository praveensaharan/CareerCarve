import React, { useEffect } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function TeacherLogin() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        const { unsafeMetadata } = user;

        // Check if the user has a role defined
        if (unsafeMetadata && unsafeMetadata.role) {
          if (unsafeMetadata.role === "teacher") {
            navigate("/teacher-dashboard");
          } else if (unsafeMetadata.role === "student") {
            navigate("/student-dashboard");
          }
        } else {
          // If no role is defined, set it to 'teacher' and redirect to teacher dashboard
          await user.update({ unsafeMetadata: { role: "teacher" } });
          navigate("/teacher-dashboard");
        }
      }
    };

    checkUserRole();
  }, [user, navigate]);

  return (
    <div>
      <h2>Teacher Login</h2>
      <SignIn />
    </div>
  );
}

export default TeacherLogin;
