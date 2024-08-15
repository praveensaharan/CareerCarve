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

        if (unsafeMetadata && unsafeMetadata.role) {
          if (unsafeMetadata.role === "student") {
            navigate("/student-dashboard");
          } else if (unsafeMetadata.role === "teacher") {
            navigate("/teacher-dashboard");
          }
        } else {
          await user.update({ unsafeMetadata: { role: "student" } });
          navigate("/student-dashboard");
        }
      }
    };

    checkUserRole();
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Student Login
        </h2>
        <SignIn forceRedirectUrl={"/student-dashboard"} />
      </div>
    </div>
  );
}

export default StudentLogin;
