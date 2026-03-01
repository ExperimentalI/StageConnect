import { useNavigate } from "react-router";
import {
  Bell, Search, Clock, CheckCircle, XCircle, Eye, FileText,
  Star, ArrowRight, MapPin, Bookmark, Zap
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { mockApplications, mockOffers } from "../data/mockData";

interface StudentDashboardProps {
  onLogout?: () => void;
}

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  "En cours d'examen": { color: "text-orange-600", bg: "bg-orange-50", icon: <Clock size={13} /> },
  "Présélectionné":    { color: "text-green-700",  bg: "bg-green-50",  icon: <CheckCircle size={13} /> },
  "En attente":        { color: "text-gray-600",   bg: "bg-gray-100",  icon: <Clock size={13} /> },
  "Refusé":            { color: "text-red-600",    bg: "bg-red-50",    icon: <XCircle size={13} /> },
};

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const navigate = useNavigate();
  const recommended = mockOffers.filter((o) => o.featured).slice(0, 3);

  const stats = [
    { label: "Candidatures envoyées",  value: mockApplications.length,                                                    icon: FileText  },
    { label: "En cours d'examen",      value: mockApplications.filter(a => a.status === "En cours d'examen").length,      icon: Clock     },
    { label: "Présélections",          value: mockApplications.filter(a => a.status === "Présélectionné").length,         icon: Star      },
    { label: "Offres sauvegardées",    value: 5,                                                                           icon: Bookmark  },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="student" onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bonjour, Kouamé Ange 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Voici un résumé de vos activités</p>
          </div>
          <button
            onClick={() => navigate("/offers")}
            className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "#F97316" }}
          >
            <Search size={15} /> Chercher un stage
          </button>
        </div>

        {/* Notification Banner */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
              <Bell size={18} className="text-orange-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">🎉 Félicitations ! Vous êtes présélectionné(e)</p>
              <p className="text-gray-400 text-xs">Ecobank CI a retenu votre candidature – Un test technique vous a été envoyé</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white text-xs shrink-0">Voir →</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
                <stat.icon size={20} className="text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Mes candidatures</h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {mockApplications.length} total
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {mockApplications.map((app) => {
                  const cfg = statusConfig[app.status] || { color: "text-gray-600", bg: "bg-gray-100", icon: null };
                  return (
                    <div key={app.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 truncate">{app.offerTitle}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{app.company}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                              {cfg.icon} {app.status}
                            </span>
                            <span className="text-xs text-gray-400">Postulé le {app.appliedDate}</span>
                          </div>
                          {app.nextStep && app.status !== "Refusé" && (
                            <p className="text-xs text-gray-500 mt-1.5">📌 {app.nextStep}</p>
                          )}
                        </div>
                        <button onClick={() => navigate(`/offers/${app.offerId}`)}
                          className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
                          <Eye size={16} />{" "}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Profile completion */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-gray-900">Complétude du profil</h3>
                <span className="text-sm font-bold" style={{ color: "#F97316" }}>75%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div className="h-2 rounded-full" style={{ width: "75%", background: "#F97316" }}></div>
              </div>
              <div className="space-y-2">
                {[
                  { item: "Photo de profil",     done: true  },
                  { item: "CV uploadé",           done: true  },
                  { item: "Compétences ajoutées", done: true  },
                  { item: "Lettre de motivation", done: false },
                  { item: "Portfolio / LinkedIn", done: false },
                ].map(({ item, done }) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    {done
                      ? <CheckCircle size={13} className="text-green-500 shrink-0" />
                      : <div className="w-3.5 h-3.5 border-2 border-gray-300 rounded-full shrink-0"></div>}
                    <span className={done ? "text-gray-400 line-through" : "text-gray-700"}>{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/student/profile")}
                className="w-full mt-4 text-sm border border-gray-200 rounded-xl py-2.5 text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Compléter mon profil
              </button>
            </div>

            {/* Recommended */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                  <Zap size={15} className="text-orange-500" /> Recommandés
                </h3>
                <button onClick={() => navigate("/offers")} className="text-xs font-semibold hover:opacity-80 transition-opacity" style={{ color: "#F97316" }}>
                  Voir tout
                </button>
              </div>
              <div className="space-y-3">
                {recommended.map((offer) => (
                  <button
                    key={offer.id}
                    onClick={() => navigate(`/offers/${offer.id}`)}
                    className="w-full text-left p-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{offer.companyLogo}</span>
                      <p className="text-sm font-medium text-gray-900 flex-1 truncate">{offer.title}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={10} /> {offer.location}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: "#F97316" }}>{offer.salary}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}