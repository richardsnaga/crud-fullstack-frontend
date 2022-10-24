import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import active_user from "./users";

export default function ProtectedRoutes() {
  return active_user[0] ? <Outlet /> : <Navigate to="/login" />;
}
