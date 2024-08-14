import React, { useEffect, useState } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function TeacherLogin() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser(); // `isLoaded` tells us if the user object is ready
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (isLoaded && user && !isUpdating) {
        const { unsafeMetadata } = user;

        if (unsafeMetadata?.role) {
          if (unsafeMetadata.role === "teacher") {
            navigate("/teacher-dashboard");
          } else if (unsafeMetadata.role === "student") {
            navigate("/student-dashboard");
          }
        } else {
          // If no role is defined, set it to 'teacher' and redirect
          setIsUpdating(true); // Prevent re-entrance
          await user.update({ unsafeMetadata: { role: "teacher" } });
          setIsUpdating(false);
          navigate("/teacher-dashboard");
        }
      }
    };

    checkUserRole();
  }, [user, isLoaded, isUpdating, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Teacher Login
        </h2>
        <SignIn forceRedirectUrl={"/teacher-dashboard"} />
      </div>
    </div>
  );
}

export default TeacherLogin;
