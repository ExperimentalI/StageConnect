import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Search, MapPin, Filter, X, BookmarkPlus, ChevronDown, SlidersHorizontal, Wifi } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { mockOffers, domains, cities, durations } from "../data/mockData";

interface OffersProps {
  userType?: "student" | "company" | null;
  onLogout?: () => void;
}

export default function Offers({ userType = null, onLogout }: OffersProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [city, setCity] = useState(searchParams.get("city") || "Toutes les villes");
  const [domain, setDomain] = useState(searchParams.get("domain") || "Tous les domaines");
  const [duration, setDuration] = useState("Toutes les durées");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [savedOffers, setSavedOffers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recent");

  const filteredOffers = mockOffers.filter((offer) => {
    const matchQuery = !query || offer.title.toLowerCase().includes(query.toLowerCase()) ||
      offer.company.toLowerCase().includes(query.toLowerCase()) ||
      offer.domain.toLowerCase().includes(query.toLowerCase());
    const matchCity = city === "Toutes les villes" || offer.location.includes(city);
    const matchDomain = domain === "Tous les domaines" || offer.domain === domain;
    const matchDuration = duration === "Toutes les durées" || offer.duration.includes(duration.replace(" mois", ""));
    const matchRemote = !remoteOnly || offer.remote;
    return matchQuery && matchCity && matchDomain && matchDuration && matchRemote;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortBy === "applicants") return b.applicants - a.applicants;
    if (sortBy === "salary") return parseInt(b.salary) - parseInt(a.salary);
    return 0;
  });

  const toggleSave = (id: string) => {
    setSavedOffers((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const domainColors: Record<string, string> = {
    "Informatique": "bg-blue-50 text-blue-600",
    "Finance": "bg-green-50 text-green-600",
    "Marketing": "bg-purple-50 text-purple-600",
    "Data Science": "bg-indigo-50 text-indigo-600",
    "Ressources Humaines": "bg-pink-50 text-pink-600",
    "Génie Civil": "bg-yellow-50 text-yellow-700",
  };

  const inputClass = "bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType={userType} onLogout={onLogout} />

      {/* Header */}
      <div style={{ background: "#111827" }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl text-white font-bold mb-2">Offres de stage</h1>
          <p className="text-gray-400 mb-8">Découvrez les meilleures opportunités en Côte d'Ivoire et en Afrique de l'Ouest</p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-xl max-w-3xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Titre, entreprise, compétence..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-700 py-2 bg-transparent"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />{" "}
                </button>
              )}
            </div>
            <div className="hidden sm:block w-px bg-gray-200 self-stretch my-1"></div>
            <div className="flex items-center gap-2 px-3 sm:w-48">
              <MapPin size={18} className="text-gray-400 shrink-0" />
              <select title="ville" value={city} onChange={(e) => setCity(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-700 py-2 bg-transparent">
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button className="text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: "#F97316" }}>
              Rechercher
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4"
            >
              <span className="text-sm font-semibold flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-orange-500" /> Filtres
              </span>
              <ChevronDown size={16} className={`text-gray-500 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            <div className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Domain */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Domaine</h3>
                <div className="space-y-2">
                  {domains.map((d) => (
                    <label key={d} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="domain" checked={domain === d} onChange={() => setDomain(d)} className="accent-orange-500" />
                      <span className={`text-sm ${domain === d ? "text-orange-500 font-semibold" : "text-gray-600"}`}>{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Durée</h3>
                <div className="space-y-2">
                  {durations.map((d) => (
                    <label key={d} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="duration" checked={duration === d} onChange={() => setDuration(d)} className="accent-orange-500" />
                      <span className={`text-sm ${duration === d ? "text-orange-500 font-semibold" : "text-gray-600"}`}>{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Remote */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Wifi size={15} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-800">Remote uniquement</span>
                  </div>
                  <button
                    onClick={() => setRemoteOnly(!remoteOnly)}
                    className={`w-10 h-5 rounded-full transition-all relative ${remoteOnly ? "" : "bg-gray-200"}`}
                    style={remoteOnly ? { background: "#F97316" } : {}}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${remoteOnly ? "left-5" : "left-0.5"}`}></div>
                  </button>
                </label>
              </div>

              <button
                onClick={() => { setDomain("Tous les domaines"); setDuration("Toutes les durées"); setRemoteOnly(false); setQuery(""); }}
                className="w-full text-sm text-gray-500 border border-gray-200 rounded-xl py-2.5 hover:border-gray-300 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{sortedOffers.length}</span> offre{sortedOffers.length !== 1 ? "s" : ""} trouvée{sortedOffers.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Trier par</span>
                <select title="trie" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white focus:outline-none">
                  <option value="recent">Plus récent</option>
                  <option value="applicants">Plus de candidats</option>
                  <option value="salary">Salaire</option>
                </select>
              </div>
            </div>

            {sortedOffers.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Aucune offre trouvée</h3>
                <p className="text-gray-500 text-sm">Essayez d'élargir vos critères de recherche</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
                    onClick={() => navigate(`/offers/${offer.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                        {offer.companyLogo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-gray-900 font-semibold group-hover:text-orange-500 transition-colors">
                                {offer.title}
                              </h3>
                              {offer.featured && (
                                <span className="text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full font-semibold shrink-0">
                                  Vedette
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-3">{offer.company}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleSave(offer.id); }}
                            className={`p-2 rounded-lg transition-colors shrink-0 ${savedOffers.includes(offer.id) ? "text-orange-500" : "text-gray-300 hover:text-gray-500"}`}
                          >
                            <BookmarkPlus size={18} />{" "}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                            <MapPin size={11} /> {offer.location}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">⏱ {offer.duration}</span>
                          <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">{offer.domain}</span>
                          {offer.remote && (
                            <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">🌐 Remote</span>
                          )}
                          <span className="text-xs font-semibold bg-orange-50 px-2.5 py-1 rounded-full" style={{ color: "#F97316" }}>
                            {offer.salary}/mois
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{offer.posted}</span>
                            <span>👁 {offer.views}</span>
                            <span>👥 {offer.applicants} candidats</span>
                          </div>
                          <span className="text-xs text-gray-400">Avant le {offer.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}