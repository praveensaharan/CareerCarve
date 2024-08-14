import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";

const RoleBasedRoute = ({ requiredRole, redirectTo, element }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.unsafeMetadata?.role) {
      // Assign role to the user if it's not already set
      user.update({ unsafeMetadata: { role: requiredRole } }).then(() => {
        // Redirect after setting the role
        navigate("/");
      });
    }
  }, [user, requiredRole, navigate]);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.unsafeMetadata?.role === requiredRole) {
    return element;
  }

  return <Navigate to={redirectTo} />;
};

export default RoleBasedRoute;
