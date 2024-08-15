import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const Login = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { openSignIn } = useClerk();

  useEffect(() => {
    if (user) {
      const { unsafeMetadata } = user;

      if (unsafeMetadata && unsafeMetadata.role) {
        if (unsafeMetadata.role === "student") {
          navigate("/student-dashboard");
        } else if (unsafeMetadata.role === "teacher") {
          navigate("/teacher-dashboard");
        }
      }
    }
  }, [user, navigate]);

  const handleStudentLogin = () => {
    openSignIn({
      // Optional configuration
      mode: "signUpOrSignIn",
      redirectUrl: "/student-login",
    });
  };

  const handleTeacherLogin = () => {
    openSignIn({
      // Optional configuration
      mode: "signUpOrSignIn",
      redirectUrl: "/teacher-login",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
        <button
          onClick={handleStudentLogin}
          className="w-full py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login as Student
        </button>
        <button
          onClick={handleTeacherLogin}
          className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
        >
          Login as Teacher
        </button>
      </div>
    </div>
  );
};

export default Login;
