import React from "react";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import StudentLogin from "./components/StudentLogin";
import TeacherLogin from "./components/TeacherLogin";
import Dashboard from "./components/Dashboard/Dashboard";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <SignedIn>
              <StudentDashboard />
            </SignedIn>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <SignedIn>
              <TeacherDashboard />
            </SignedIn>
          }
        />

        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
