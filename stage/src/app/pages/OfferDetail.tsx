import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft, MapPin, Clock, DollarSign, Users, Eye, Calendar,
  CheckCircle, Share2, BookmarkPlus, Wifi, Building2, Send, X,
  Share2Icon
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { mockOffers } from "../data/mockData";

interface OfferDetailProps {
  userType?: "student" | "company" | null;
  onLogout?: () => void;
}

export default function OfferDetail({ userType = null, onLogout }: OfferDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = mockOffers.find((o) => o.id === id);
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [sending, setSending] = useState(false);

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Offre introuvable</h2>
          <button onClick={() => navigate("/offers")} className="text-orange-500 text-sm hover:underline">
            Retour aux offres
          </button>
        </div>
      </div>
    );
  }

  const relatedOffers = mockOffers.filter((o) => o.id !== id && o.domain === offer.domain).slice(0, 2);

  const handleApply = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setApplied(true);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType={userType} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate("/offers")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Retour aux offres
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  {offer.companyLogo}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">{offer.title}</h1>
                      <p className="text-gray-500 font-medium">{offer.company}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all">
                        <Share2Icon size={18} />{" "}
                      </button>
                      <button className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:border-orange-200 hover:text-orange-500 transition-all">
                        <BookmarkPlus size={18} />{" "}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                      <MapPin size={13} className="text-gray-400" /> {offer.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                      <Clock size={13} className="text-gray-400" /> {offer.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-semibold bg-orange-50 px-3 py-1.5 rounded-full" style={{ color: "#F97316" }}>
                      <DollarSign size={13} /> {offer.salary}/mois
                    </span>
                    {offer.remote && (
                      <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                        <Wifi size={13} /> Remote
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{offer.applicants}</p>
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-0.5">
                    <Users size={11} /> Candidats
                  </p>
                </div>
                <div className="text-center border-x border-gray-100">
                  <p className="text-xl font-bold text-gray-900">{offer.views}</p>
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-0.5">
                    <Eye size={11} /> Vues
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-900">{offer.posted}</p>
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-0.5">
                    <Calendar size={11} /> Publié
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Description du stage</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{offer.description}</p>
            </div>

            {/* Missions */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Vos missions</h2>
              <ul className="space-y-3">
                {offer.missions.map((mission, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#F97316" }}>
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{mission}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Profil recherché</h2>
              <ul className="space-y-3">
                {offer.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-gray-600 text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Avantages & bénéfices</h2>
              <div className="flex flex-wrap gap-3">
                {offer.benefits.map((benefit, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full">
                    <CheckCircle size={14} className="text-green-500" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Apply card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-20">
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-medium">Date limite</span>
                  <span className="text-xs text-red-500 font-semibold">📅 {offer.deadline}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: "65%", background: "#F97316" }}></div>
                </div>
              </div>

              {applied ? (
                <div className="text-center py-4">
                  <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
                  <p className="text-green-600 font-bold mb-1">Candidature envoyée !</p>
                  <p className="text-xs text-gray-500">Vous recevrez une réponse par email</p>
                </div>
              ) : (
                <button
                  onClick={() => userType === "student" ? setShowModal(true) : navigate("/auth?type=student")}
                  className="w-full text-white py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: "#F97316" }}
                >
                  <Send size={16} />
                  {userType === "student" ? "Postuler maintenant" : "Connectez-vous pour postuler"}
                </button>
              )}

              {!userType && (
                <p className="text-center text-xs text-gray-400 mt-3">
                  <button onClick={() => navigate("/auth?type=student")} className="font-semibold hover:opacity-80" style={{ color: "#F97316" }}>
                    Créez un compte
                  </button>{" "}
                  pour postuler gratuitement
                </p>
              )}
            </div>

            {/* Company info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 size={16} className="text-gray-500" /> À propos de l'entreprise
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                  {offer.companyLogo}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{offer.company}</p>
                  <p className="text-xs text-gray-500">{offer.domain}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2"><MapPin size={13} /> {offer.location}</div>
                <div className="flex items-center gap-2"><Users size={13} /> {offer.applicants * 3}+ employés</div>
              </div>
            </div>

            {/* Related */}
            {relatedOffers.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Offres similaires</h3>
                <div className="space-y-3">
                  {relatedOffers.map((ro) => (
                    <button key={ro.id} onClick={() => navigate(`/offers/${ro.id}`)}
                      className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{ro.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{ro.company}</p>
                      <p className="text-xs font-semibold mt-1" style={{ color: "#F97316" }}>{ro.salary}/mois</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Postuler – {offer.title}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X size={20} />{" "}
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2 font-semibold">CV joint automatiquement ✅</p>
                <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-3">
                  <span className="text-lg">📄</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Mon_CV_2026.pdf</p>
                    <p className="text-xs text-gray-500">Depuis votre profil</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lettre de motivation</label>
                <textarea rows={6}
                  placeholder="Bonjour,&#10;&#10;Je suis étudiant(e) en ... et je souhaite postuler à votre offre car..."
                  value={motivation} onChange={(e) => setMotivation(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 resize-none"
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button onClick={handleApply} disabled={sending}
                  className="flex-1 text-white py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
                  style={{ background: "#F97316" }}>
                  {sending
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Envoi...</>
                    : <><Send size={15} /> Envoyer ma candidature</>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}