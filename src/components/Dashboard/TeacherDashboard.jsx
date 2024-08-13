import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const TeacherDashboard = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const updateUserRole = async () => {
        if (user.unsafeMetadata.role !== "teacher") {
          await user.update({ unsafeMetadata: { role: "teacher" } });
        }
      };

      updateUserRole();
    }
  }, [user]);

  return <div>Teacher Dashboard</div>;
};

export default TeacherDashboard;
