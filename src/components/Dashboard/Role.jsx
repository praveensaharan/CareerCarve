import React from "react";
import { useUser } from "@clerk/clerk-react";

const Role = () => {
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role || "unknown";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h2>
        <p className="text-gray-700 mb-6">
          Your role cannot access this page as you are a{" "}
          <span className="font-semibold text-blue-600">{role}</span>.
        </p>
        <p className="text-gray-600">
          Please contact your administrator or{" "}
          <a href="/" className="text-blue-500 hover:underline">
            request the appropriate access
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Role;
