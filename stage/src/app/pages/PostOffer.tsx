import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, CheckCircle, Briefcase, MapPin, Clock, DollarSign, Users, FileText } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { domains, cities } from "../data/mockData";

interface PostOfferProps {
  onLogout?: () => void;
}

const steps = [
  { id: 1, label: "Informations générales" },
  { id: 2, label: "Missions & Profil" },
  { id: 3, label: "Conditions & Avantages" },
  { id: 4, label: "Aperçu & Publication" },
];

export default function PostOffer({ onLogout }: PostOfferProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    domain: "",
    location: "",
    remote: false,
    duration: "",
    salary: "",
    startDate: "",
    deadline: "",
    description: "",
    missions: [""],
    requirements: [""],
    benefits: [""],
    level: "",
    contractType: "Stage de fin d'études",
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const updateArray = (field: "missions" | "requirements" | "benefits", index: number, value: string) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addToArray = (field: "missions" | "requirements" | "benefits") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeFromArray = (field: "missions" | "requirements" | "benefits", index: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handlePublish = async () => {
    setPublishing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setPublishing(false);
    setPublished(true);
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  if (published) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userType="company" onLogout={onLogout} />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Offre publiée ! 🎉</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Votre offre "<strong>{form.title || "Stage"}</strong>" est maintenant visible par tous les étudiants sur StageConnect.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/company/dashboard")}
                className="px-6 py-3 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Voir le tableau de bord
              </button>
              <button
                onClick={() => { setPublished(false); setStep(1); setForm({ ...form, title: "", description: "" }); }}
                className="px-6 py-3 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg, #F97316, #ea6c0a)" }}
              >
                Publier une autre offre
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="company" onLogout={onLogout} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate("/company/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Retour au tableau de bord
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Publier une offre de stage</h1>
        <p className="text-gray-500 text-sm mb-8">Complétez les informations pour attirer les meilleurs candidats</p>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex items-center gap-2 ${step > s.id ? "cursor-pointer" : "cursor-default"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step > s.id
                      ? "bg-green-500 text-white"
                      : step === s.id
                      ? "text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  style={step === s.id ? { background: "linear-gradient(135deg, #F97316, #ea6c0a)" } : {}}
                >
                  {step > s.id ? <CheckCircle size={16} /> : s.id}
                </div>
                <span className={`text-sm hidden sm:block ${step === s.id ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 rounded-full ${step > s.id ? "bg-green-400" : "bg-gray-200"}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* Step 1: General Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-orange-500" /> Informations générales
              </h2>
              <div>
                <label className={labelClass}>Intitulé du poste *</label>
                <input
                  className={inputClass}
                  placeholder="Ex: Stage Développeur Web Full Stack"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Domaine *</label>
                  <select title="domain" className={inputClass} value={form.domain} onChange={(e) => update("domain", e.target.value)}>
                    <option value="">Sélectionnez un domaine</option>
                    {domains.slice(1).map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Type de contrat</label>
                  <select title="type de contat" className={inputClass} value={form.contractType} onChange={(e) => update("contractType", e.target.value)}>
                    <option>Stage de fin d'études</option>
                    <option>Stage académique</option>
                    <option>Stage d'observation</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Ville *</label>
                  <select title="ville" className={inputClass} value={form.location} onChange={(e) => update("location", e.target.value)}>
                    <option value="">Sélectionnez une ville</option>
                    {cities.slice(1).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Durée *</label>
                  <select title="durée" className={inputClass} value={form.duration} onChange={(e) => update("duration", e.target.value)}>
                    <option value="">Sélectionnez la durée</option>
                    {["1 mois", "2 mois", "3 mois", "4 mois", "5 mois", "6 mois"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <button
                  onClick={() => update("remote", !form.remote)}
                  className={`w-12 h-6 rounded-full transition-all relative ${form.remote ? "bg-orange-500" : "bg-gray-300"}`}
                >{}
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.remote ? "left-6" : "left-0.5"}`}></div>
                </button>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Télétravail possible</p>
                  <p className="text-xs text-gray-500">Activer si le poste peut être exercé en remote</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Date de début</label>
                  <input title="date debut" type="date" className={inputClass} value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Date limite de candidature</label>
                  <input title="date limite" type="date" className={inputClass} value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Missions & Requirements */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText size={20} className="text-blue-500" /> Missions & Profil recherché
              </h2>
              <div>
                <label className={labelClass}>Description du stage *</label>
                <textarea
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 resize-none"
                  placeholder="Décrivez le poste, le contexte, les objectifs du stage..."
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className={labelClass}>Missions principales</label>
                <div className="space-y-2">
                  {form.missions.map((mission, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={inputClass}
                        placeholder={`Mission ${i + 1}...`}
                        value={mission}
                        onChange={(e) => updateArray("missions", i, e.target.value)}
                      />
                      {form.missions.length > 1 && (
                        <button onClick={() => removeFromArray("missions", i)} className="p-2 text-red-400 hover:text-red-600">
                          <X size={16} />{" "}
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addToArray("missions")}
                    className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600"
                  >
                    <Plus size={14} /> Ajouter une mission
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Profil requis</label>
                <div className="space-y-2">
                  {form.requirements.map((req, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={inputClass}
                        placeholder={`Critère ${i + 1}...`}
                        value={req}
                        onChange={(e) => updateArray("requirements", i, e.target.value)}
                      />
                      {form.requirements.length > 1 && (
                        <button onClick={() => removeFromArray("requirements", i)} className="p-2 text-red-400 hover:text-red-600">
                          <X size={16} />{" "}
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addToArray("requirements")}
                    className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600"
                  >
                    <Plus size={14} /> Ajouter un critère
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Niveau d'études requis</label>
                <select title="niveau d'étude requis" className={inputClass} value={form.level} onChange={(e) => update("level", e.target.value)}>
                  <option value="">Indifférent</option>
                  <option>Licence 1 / Licence 2</option>
                  <option>Licence 3</option>
                  <option>Master 1</option>
                  <option>Master 2</option>
                  <option>Bac+3 et plus</option>
                  <option>Bac+4 et plus</option>
                  <option>Bac+5</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Conditions */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign size={20} className="text-green-500" /> Conditions & Avantages
              </h2>
              <div>
                <label className={labelClass}>Indemnité mensuelle</label>
                <div className="relative">
                  <input
                    className={inputClass + " pr-20"}
                    placeholder="Ex: 150 000"
                    value={form.salary}
                    onChange={(e) => update("salary", e.target.value)}
                    type="number"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">FCFA</span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">💡 Les offres avec indemnité reçoivent 2x plus de candidatures</p>
              </div>
              <div>
                <label className={labelClass}>Avantages proposés</label>
                <div className="space-y-2">
                  {form.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={inputClass}
                        placeholder={`Ex: Tickets restaurant, Transport, Formation...`}
                        value={benefit}
                        onChange={(e) => updateArray("benefits", i, e.target.value)}
                      />
                      {form.benefits.length > 1 && (
                        <button onClick={() => removeFromArray("benefits", i)} className="p-2 text-red-400 hover:text-red-600">
                          <X size={16} />{" "}
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addToArray("benefits")}
                    className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600"
                  >
                    <Plus size={14} /> Ajouter un avantage
                  </button>
                </div>
              </div>

              {/* Quick suggestions */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Suggestions rapides :</p>
                <div className="flex flex-wrap gap-2">
                  {["Indemnité mensuelle", "Transport", "Tickets restaurant", "Possibilité d'embauche", "Formation continue", "Télétravail partiel"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        if (!form.benefits.includes(s)) {
                          const emptyIndex = form.benefits.findIndex(b => !b);
                          if (emptyIndex >= 0) updateArray("benefits", emptyIndex, s);
                          else addToArray("benefits");
                        }
                      }}
                      className="text-xs bg-gray-100 hover:bg-orange-50 hover:text-orange-600 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Preview */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" /> Aperçu de votre offre
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-2xl shrink-0">🏢</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{form.title || "Titre du poste"}</h3>
                    <p className="text-gray-500">Votre entreprise</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.location && (
                        <span className="flex items-center gap-1 text-xs bg-white text-gray-600 px-2.5 py-1 rounded-full border">
                          <MapPin size={10} /> {form.location}
                        </span>
                      )}
                      {form.duration && (
                        <span className="text-xs bg-white text-gray-600 px-2.5 py-1 rounded-full border">
                          ⏱ {form.duration}
                        </span>
                      )}
                      {form.salary && (
                        <span className="text-xs bg-orange-50 text-orange-500 px-2.5 py-1 rounded-full border border-orange-100 font-semibold">
                          💰 {parseInt(form.salary).toLocaleString()} FCFA/mois
                        </span>
                      )}
                      {form.remote && (
                        <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-100">
                          🌐 Remote
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {form.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">{form.description}</p>
                )}
                {form.missions.some(m => m) && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">Missions :</p>
                    <ul className="space-y-1">
                      {form.missions.filter(m => m).map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={14} className="text-orange-400 shrink-0 mt-0.5" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-700">
                  ✅ Votre offre sera visible instantanément par <strong>12 400+ étudiants</strong> sur la plateforme StageConnect.
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`px-6 py-3 text-sm font-semibold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
            >
              Précédent
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-8 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #F97316, #ea6c0a)" }}
              >
                Continuer →
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-8 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-70 flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, #16A34A, #15803d)" }}
              >
                {publishing ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Publication...</>
                ) : (
                  <><CheckCircle size={16} /> Publier l'offre</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
