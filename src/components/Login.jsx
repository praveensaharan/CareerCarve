import React from "react";
import { useNavigate } from "react-router-dom";
import Update from "./Update";

const Login = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate("/student-login");
  };

  const handleTeacherLogin = () => {
    navigate("/teacher-login");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleStudentLogin}>Login as Student</button>
      <button onClick={handleTeacherLogin}>Login as Teacher</button>
      <Update />
    </div>
  );
};

export default Login;
