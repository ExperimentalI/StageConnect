import { useState, useMemo } from "react";
import { RouterProvider } from "react-router";
import { createAppRouter } from "./routes";

export default function App() {
  const [userType, setUserType] = useState<"student" | "company" | null>(null);

  const handleLogin = (type: "student" | "company") => {
    setUserType(type);
  };

  const handleLogout = () => {
    setUserType(null);
  };

  const router = useMemo(
    () => createAppRouter(userType, handleLogin, handleLogout),
    [userType]
  );

  return <RouterProvider router={router} />;
}
