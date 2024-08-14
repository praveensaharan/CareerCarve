import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import StudentLogin from "./components/StudentLogin";
import TeacherLogin from "./components/TeacherLogin";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import Login from "./components/Login";
import RoleBasedRoute from "./components/RoleBasedRoute";
import Role from "./components/Dashboard/Role";
import NotExist from "./components/Dashboard/NotExist";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/student-dashboard"
          element={
            <SignedIn>
              <RoleBasedRoute
                requiredRole="student"
                redirectTo="/role"
                element={<StudentDashboard />}
              />
            </SignedIn>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <SignedIn>
              <RoleBasedRoute
                requiredRole="teacher"
                redirectTo="/role"
                element={<TeacherDashboard />}
              />
            </SignedIn>
          }
        />
        <Route
          path="/role"
          element={
            <SignedIn>
              <Role />
            </SignedIn>
          }
        />

        {/* Wildcard Route for Signed In Users */}
        <Route
          path="*"
          element={
            <SignedIn>
              <NotExist />
            </SignedIn>
          }
        />

        {/* Wildcard Route for Signed Out Users */}
        <Route
          path="*"
          element={
            <SignedOut>
              <Navigate to="/" />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
