import { useState, useMemo } from "react";
import { RouterProvider } from "react-router/dom";
import { createAppRouter } from "./routes";
import { QueryProvider, AuthProvider } from "./context";
import "../styles/index.css"

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

  return (
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
  );
}
