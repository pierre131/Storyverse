import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

function ProtectedRoute({ children }) {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;