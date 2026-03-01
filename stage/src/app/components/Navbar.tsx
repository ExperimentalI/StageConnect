import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X, GraduationCap, Building2, ChevronDown, Bell, User, MessageSquare } from "lucide-react";
import { mockConversations } from "../data/mockData";

interface NavbarProps {
  userType?: "student" | "company" | null;
  onLogout?: () => void;
}

export function Navbar({ userType = null, onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const totalUnread = mockConversations.reduce((s, c) => s + c.unreadCount, 0);

  const linkCls = (path: string) =>
    `text-sm transition-colors ${isActive(path) ? "text-blue-500 font-semibold" : "text-gray-600 hover:text-gray-900"}`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="border-4 border-blue-500 w-9 h-9 rounded-xl flex items-center justify-center" >
              <span className="text-blue-500 text-sm font-bold">SC</span>
            </div>
            <span className="text-gray-900 font-bold" style={{ fontSize: "1.1rem" }}>
              Stage<span className="text-blue-500">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/offers" className={linkCls("/offers")}>Offres de stage</Link>

            {!userType && (
              <>
                <Link to="/auth?type=student" className={linkCls("/auth")}>Étudiants</Link>
                <Link to="/auth?type=company" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Entreprises</Link>
              </>
            )}

            {userType === "student" && (
              <>
                <Link to="/student/dashboard" className={linkCls("/student/dashboard")}>Tableau de bord</Link>
                <Link to="/student/profile" className={linkCls("/student/profile")}>Mon profil</Link>
              </>
            )}

            {userType === "company" && (
              <>
                <Link to="/company/dashboard" className={linkCls("/company/dashboard")}>Tableau de bord</Link>
                <Link to="/company/post-offer" className={linkCls("/company/post-offer")}>Publier une offre</Link>
              </>
            )}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            {!userType ? (
              <>
                <button
                  onClick={() => navigate("/auth?type=student")}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
                >
                  Se connecter
                </button>
                <button
                  onClick={() => navigate("/auth?type=student")}
                  className="bg-blue-500 text-sm text-white px-4 py-2 rounded-lg transition-all hover:opacity-90"
                >
                  S'inscrire
                </button>
              </>
            ) : (
              <>
                {/* Messages */}
                <Link to="/messages" className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
                  <MessageSquare size={19} />
                  {totalUnread > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 text-white text-xs rounded-full flex items-center justify-center" style={{ background: "#F97316", fontSize: "10px" }}>
                      {totalUnread}
                    </span>
                  )}
                </Link>

                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
                  <Bell size={19} />{" "}
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#F97316" }}></span>
                </button>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors ml-1"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "#111827" }}>
                      {userType === "student" ? <GraduationCap size={15} /> : <Building2 size={15} />}
                    </div>
                    <ChevronDown size={13} className="text-gray-400" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <Link
                        to={userType === "student" ? "/student/profile" : "/company/dashboard"}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User size={14} /> Mon profil
                      </Link>
                      <Link
                        to="/messages"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <MessageSquare size={14} /> Messages
                        {totalUnread > 0 && (
                          <span className="ml-auto text-xs text-white px-1.5 py-0.5 rounded-full" style={{ background: "#F97316" }}>
                            {totalUnread}
                          </span>
                        )}
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => { onLogout?.(); setDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <Link to="/offers" className="block text-sm text-gray-700 py-2.5 border-b border-gray-50" onClick={() => setMobileOpen(false)}>Offres de stage</Link>

          {userType && (
            <Link to="/messages" className="flex items-center justify-between text-sm text-gray-700 py-2.5 border-b border-gray-50" onClick={() => setMobileOpen(false)}>
              <span>Messages</span>
              {totalUnread > 0 && <span className="text-xs text-white px-2 py-0.5 rounded-full" style={{ background: "#F97316" }}>{totalUnread}</span>}
            </Link>
          )}

          {!userType && (
            <>
              <Link to="/auth?type=student" className="block text-sm text-gray-700 py-2.5 border-b border-gray-50" onClick={() => setMobileOpen(false)}>Étudiants</Link>
              <Link to="/auth?type=company" className="block text-sm text-gray-700 py-2.5 border-b border-gray-50" onClick={() => setMobileOpen(false)}>Entreprises</Link>
              <button onClick={() => { navigate("/auth?type=student"); setMobileOpen(false); }}
                className="w-full mt-2 text-sm text-white px-4 py-2.5 rounded-lg"
                style={{ background: "#F97316" }}>
                S'inscrire gratuitement
              </button>
            </>
          )}
          {userType === "student" && (
            <>
              <Link to="/student/dashboard" className="block text-sm text-gray-700 py-2.5 border-b border-gray-50" onClick={() => setMobileOpen(false)}>Tableau de bord</Link>
              <Link to="/student/profile" className="block text-sm text-gray-700 py-2.5 border-b border-gray-50" onClick={() => setMobileOpen(false)}>Mon profil</Link>
              <button onClick={onLogout} className="w-full text-left text-sm text-red-500 py-2.5 mt-1">Se déconnecter</button>
            </>
          )}
          {userType === "company" && (
            <>
              <Link to="/company/dashboard" className="block text-sm text-gray-700 py-2.5 border-b border-gray-50" onClick={() => setMobileOpen(false)}>Tableau de bord</Link>
              <Link to="/company/post-offer" className="block text-sm text-gray-700 py-2.5 border-b border-gray-50" onClick={() => setMobileOpen(false)}>Publier une offre</Link>
              <button onClick={onLogout} className="w-full text-left text-sm text-red-500 py-2.5 mt-1">Se déconnecter</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
