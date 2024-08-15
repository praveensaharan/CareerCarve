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
import StudentForm from "./components/Student/Form";
import StudentPremiumForm from "./components/Student/Premium";
import StudentPayment from "./components/Student/Payment";
import TeacherForm from "./components/Teacher/Details";
import TeacherSetTime from "./components/Teacher/Setime";

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
          path="/payment-checkout"
          element={
            <SignedIn>
              <RoleBasedRoute
                requiredRole="student"
                redirectTo="/role"
                element={<StudentPayment />}
              />
            </SignedIn>
          }
        />

        <Route
          path="/student-premium-form/:mentorId"
          element={
            <SignedIn>
              <RoleBasedRoute
                requiredRole="student"
                redirectTo="/role"
                element={<StudentPremiumForm />}
              />
            </SignedIn>
          }
        />

        <Route
          path="/student-form"
          element={
            <SignedIn>
              <RoleBasedRoute
                requiredRole="student"
                redirectTo="/role"
                element={<StudentForm />}
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
          path="/teacher-form"
          element={
            <SignedIn>
              <RoleBasedRoute
                requiredRole="teacher"
                redirectTo="/role"
                element={<TeacherForm />}
              />
            </SignedIn>
          }
        />

        <Route
          path="/teacher-settime"
          element={
            <SignedIn>
              <RoleBasedRoute
                requiredRole="teacher"
                redirectTo="/role"
                element={<TeacherSetTime />}
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
