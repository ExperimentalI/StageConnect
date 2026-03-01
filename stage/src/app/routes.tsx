import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Offers from "./pages/Offers";
import OfferDetail from "./pages/OfferDetail";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import CompanyDashboard from "./pages/CompanyDashboard";
import PostOffer from "./pages/PostOffer";
import Messages from "./pages/Messages";

export function createAppRouter(
  userType: "student" | "company" | null,
  onLogin: (type: "student" | "company") => void,
  onLogout: () => void
) {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true,          element: <Landing /> },
        { path: "auth",         element: <Auth onLogin={onLogin} /> },
        { path: "offers",       element: <Offers userType={userType} onLogout={onLogout} /> },
        { path: "offers/:id",   element: <OfferDetail userType={userType} onLogout={onLogout} /> },
        { path: "messages",     element: <Messages userType={userType} onLogout={onLogout} /> },
        { path: "student/dashboard", element: <StudentDashboard onLogout={onLogout} /> },
        { path: "student/profile",   element: <StudentProfile onLogout={onLogout} /> },
        { path: "company/dashboard", element: <CompanyDashboard onLogout={onLogout} /> },
        { path: "company/post-offer",element: <PostOffer onLogout={onLogout} /> },
      ],
    },
  ]);
}