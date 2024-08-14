import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     const { unsafeMetadata } = user;

  //     if (unsafeMetadata && unsafeMetadata.role) {
  //       if (unsafeMetadata.role !== "student") {
  //         // Redirect to the teacher login if the user's role is not "student"
  //         navigate("/teacher-login");
  //       }
  //     } else {
  //       // Redirect to student login if no role is found
  //       navigate("/student-login");
  //     }
  //   } else {
  //     // Redirect to the home page if the user is not logged in
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user?.fullName || "Student"}!
          </h2>
          <p className="text-gray-700">
            This is your student dashboard. Here, you can find all your courses,
            assignments, and more.
          </p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Your School Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
