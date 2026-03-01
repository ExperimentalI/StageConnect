import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Plus, Eye, Users, TrendingUp, BarChart3, CheckCircle,
  Clock, Mail, ChevronRight, FileText
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { mockCompanyOffers, mockCandidates } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ResponsiveContainer } from "recharts";

interface CompanyDashboardProps {
  onLogout?: () => void;
}

const chartData = [
  { name: "Lun", views: 28, candidates: 8 },
  { name: "Mar", views: 35, candidates: 12 },
  { name: "Mer", views: 22, candidates: 6 },
  { name: "Jeu", views: 45, candidates: 18 },
  { name: "Ven", views: 38, candidates: 14 },
  { name: "Sam", views: 15, candidates: 4 },
  { name: "Dim", views: 10, candidates: 2 },
];

export default function CompanyDashboard({ onLogout }: CompanyDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "candidates" | "offers">("overview");
  const [candidateStatuses, setCandidateStatuses] = useState<Record<string, string>>({
    s1: "Nouveau",
    s2: "En examen",
    s3: "Présélectionné",
  });

  const updateStatus = (id: string, status: string) =>
    setCandidateStatuses((prev) => ({ ...prev, [id]: status }));

  const stats = [
    { label: "Offres actives",        value: 2,    icon: FileText,   trend: "+1 ce mois" },
    { label: "Candidatures reçues",   value: 45,   icon: Users,      trend: "+12 cette semaine" },
    { label: "Vues des offres",       value: 300,  icon: Eye,        trend: "+85 cette semaine" },
    { label: "Taux de réponse",       value: "87%",icon: TrendingUp, trend: "Excellent" },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      Actif:          "bg-green-50 text-green-700",
      Expiré:         "bg-red-50 text-red-600",
      Brouillon:      "bg-gray-100 text-gray-600",
      Nouveau:        "bg-orange-50 text-orange-600",
      "En examen":    "bg-gray-100 text-gray-700",
      Présélectionné: "bg-green-50 text-green-700",
      Refusé:         "bg-red-50 text-red-600",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="company" onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-500 text-sm mt-1">Bienvenue, Orange Côte d'Ivoire 🏢</p>
          </div>
          <button
            onClick={() => navigate("/company/post-offer")}
            className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "#F97316" }}
          >
            <Plus size={16} /> Publier une offre
          </button>
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
              <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
          {[
            { key: "overview",   label: "Vue d'ensemble" },
            { key: "candidates", label: "Candidatures"   },
            { key: "offers",     label: "Mes offres"     },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-5 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.key
                  ? "bg-white shadow-sm text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Overview ───────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-5">Activité cette semaine</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }} />
                    <Bar dataKey="views"      fill="#e5e7eb" radius={[6, 6, 0, 0]} name="Vues"      />
                    <Bar dataKey="candidates" fill="#F97316" radius={[6, 6, 0, 0]} name="Candidats" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Candidatures récentes</h3>
                  <button onClick={() => setActiveTab("candidates")} className="text-xs font-semibold flex items-center gap-1 hover:opacity-80" style={{ color: "#F97316" }}>
                    Voir toutes <ChevronRight size={12} />
                  </button>
                </div>
                {mockCandidates.filter(c => c.applied).map((c) => (
                  <div key={c.id} className="px-6 py-4 flex items-center justify-between gap-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: "#111827" }}>
                        {c.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.school} · {c.level}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block text-xs text-gray-500">{c.offerTitle}</div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBadge(candidateStatuses[c.id])}`}>
                      {candidateStatuses[c.id]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-sm text-gray-900 mb-4">Offres actives</h3>
                <div className="space-y-3">
                  {mockCompanyOffers.filter(o => o.status === "Actif").map((offer) => (
                    <div key={offer.id} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-900">{offer.title}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Users size={10} /> {offer.applicants}</span>
                        <span className="flex items-center gap-1"><Eye size={10} /> {offer.views}</span>
                        <span className="text-red-400">Expire {offer.deadline.slice(-6)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("/company/post-offer")}
                  className="w-full mt-4 border-2 border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-500 hover:border-orange-200 hover:text-orange-500 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Plus size={14} /> Nouvelle offre
                </button>
              </div>

              <div className="bg-gray-900 rounded-2xl p-5">
                <p className="text-white font-bold text-sm mb-2">💡 Conseil</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Les offres avec une description détaillée reçoivent <span className="text-orange-400 font-semibold">3x plus</span> de candidatures qualifiées.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Candidates ─────────────────────────────────────────────── */}
        {activeTab === "candidates" && (
          <div className="space-y-4">
            {mockCandidates.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ background: "#111827" }}>
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{c.name}</h3>
                        <p className="text-sm text-gray-500">{c.school} · {c.domain} · {c.level}</p>
                        <p className="text-xs text-gray-400 mt-1">📍 {c.location} · Disponible dès {c.availability}</p>
                      </div>
                      <select
                        title="candidature"
                        value={candidateStatuses[c.id] || "Nouveau"}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none bg-white shrink-0"
                      >
                        {["Nouveau", "En examen", "Présélectionné", "Refusé"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {c.skills.map((skill) => (
                        <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                    <Eye size={13} /> Voir le CV
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-white px-3 py-2 rounded-lg hover:opacity-90 transition-all"
                    style={{ background: "#F97316" }}>
                    <Mail size={13} /> Contacter
                  </button>
                  {candidateStatuses[c.id] !== "Présélectionné" && (
                    <button onClick={() => updateStatus(c.id, "Présélectionné")}
                      className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors">
                      <CheckCircle size={13} /> Présélectionner
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Offers ─────────────────────────────────────────────────── */}
        {activeTab === "offers" && (
          <div className="space-y-4">
            {mockCompanyOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900">{offer.title}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBadge(offer.status)}`}>
                        {offer.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{offer.domain} · Publié le {offer.posted}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5"><Users size={14} className="text-gray-400" /><strong>{offer.applicants}</strong> candidatures</span>
                      <span className="flex items-center gap-1.5"><Eye size={14} className="text-gray-400" /><strong>{offer.views}</strong> vues</span>
                      <span className="text-gray-400 text-xs">📅 Expire le {offer.deadline}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">Modifier</button>
                    <button onClick={() => setActiveTab("candidates")}
                      className="text-xs text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                      style={{ background: "#F97316" }}>
                      Voir candidats
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => navigate("/company/post-offer")}
              className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-8 text-gray-400 hover:border-orange-200 hover:text-orange-500 transition-colors flex flex-col items-center gap-2">
              <Plus size={24} />
              <span className="text-sm font-semibold">Publier une nouvelle offre</span>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}