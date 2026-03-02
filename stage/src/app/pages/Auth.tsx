import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Eye, EyeOff, GraduationCap, Building2, ArrowLeft, CheckCircle, Upload } from "lucide-react";

interface AuthProps {
  onLogin: (type: "student" | "company") => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"student" | "company">(
    (searchParams.get("type") as "student" | "company") || "student"
  );
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", school: "",
    domain: "", level: "", companyName: "", sector: "", siret: "", phone: "",
  });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "student" || type === "company") setUserType(type);
  }, [searchParams]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 800));
    onLogin(userType);
    navigate(userType === "student" ? "/student/dashboard" : "/company/dashboard");
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all placeholder-gray-400";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, #F97316, transparent)" }}></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, #16A34A, transparent)" }}></div>
        </div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="border-4 border-blue-500 w-10 h-10 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">SC</span>
            </div>
            <span className="text-white text-xl font-bold">
              Stage<span className="text-blue-500">Connect</span>
            </span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl text-white font-bold mb-4 leading-tight">
            {userType === "student"
              ? "Trouvez le stage qui lancera votre carrière 🎓"
              : "Recrutez les talents de demain 🏢"}
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {userType === "student"
              ? "Rejoignez 12 400+ étudiants qui ont trouvé leur stage grâce à StageConnect en Côte d'Ivoire et en Afrique de l'Ouest."
              : "Accédez à un vivier de stagiaires qualifiés issus des meilleures universités. Publiez vos offres et gérez vos candidatures facilement."}
          </p>
          <div className="space-y-3">
            {(userType === "student"
              ? ["Accès à 800+ offres de stage", "Candidature en un clic", "Suivi de vos candidatures", "Recommandations personnalisées"]
              : ["Publication d'offres illimitée", "Gestion des candidatures", "Filtrage des profils", "Statistiques en temps réel"]
            ).map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-green-400 shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-xs text-gray-600">
          © {new Date().getFullYear()} StageConnect 🇨🇮 · Abidjan, Côte d'Ivoire
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F97316, #16A34A)" }}>
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <span className="text-gray-900 font-bold">Stage<span style={{ color: "#F97316" }}>Connect</span></span>
          </Link>
          <Link to="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={14} /> Accueil
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* User type tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setUserType("student")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-all ${userType === "student" ? "bg-white shadow-sm text-gray-900 font-semibold" : "text-gray-500"}`}
            >
              <GraduationCap size={16} /> Étudiant
            </button>
            <button
              onClick={() => setUserType("company")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-all ${userType === "company" ? "bg-white shadow-sm text-gray-900 font-semibold" : "text-gray-500"}`}
            >
              <Building2 size={16} /> Entreprise
            </button>
          </div>

          {/* Mode tabs */}
          <div className="mb-6">
            <h1 className="text-2xl text-gray-900 font-bold mb-1">
              {mode === "login" ? "Bon retour ! 👋" : "Créer un compte"}
            </h1>
            <p className="text-sm text-gray-500">
              {mode === "login"
                ? "Connectez-vous à votre espace"
                : `Inscrivez-vous comme ${userType === "student" ? "étudiant" : "entreprise"}`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && userType === "student" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Prénom</label>
                    <input className={inputClass} placeholder="Kouamé" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Nom</label>
                    <input className={inputClass} placeholder="Brice" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1.5 font-semibold">École / Université</label>
                  <input className={inputClass} placeholder="INP-HB, UFHB, ESATIC..." value={form.school} onChange={(e) => update("school", e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Domaine d'études</label>
                    <input className={inputClass} placeholder="Informatique" value={form.domain} onChange={(e) => update("domain", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Niveau</label>
                    <select className={inputClass} value={form.level} title="niveau" onChange={(e) => update("level", e.target.value)}>
                      <option value="">Choisir</option>
                      <option>Licence 1</option><option>Licence 2</option><option>Licence 3</option>
                      <option>Master 1</option><option>Master 2</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {mode === "register" && userType === "company" && (
              <>
                <div>
                  <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Nom de l'entreprise</label>
                  <input className={inputClass} placeholder="Orange Côte d'Ivoire" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Secteur d'activité</label>
                    <input className={inputClass} placeholder="Télécommunications" value={form.sector} onChange={(e) => update("sector", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Téléphone</label>
                    <input className={inputClass} placeholder="+225 07 00 00 00 00" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Email</label>
              <input
                type="email"
                className={inputClass}
                placeholder="votre@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1.5 font-semibold">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={inputClass + " pr-12"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === "register" && userType === "student" && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-orange-300 transition-colors cursor-pointer">
                <Upload size={20} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Uploader votre CV</p>
                <p className="text-xs text-gray-400">PDF, DOC · Max 5MB</p>
              </div>
            )}

            {mode === "login" && (
              <div className="text-right">
                <button type="button" className="text-xs text-blue-500 hover:text-blue-600">
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 w-full text-white py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
              
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Connexion...</>
              ) : success ? (
                <><CheckCircle size={16} /> Connecté !</>
              ) : mode === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {mode === "login" ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
            >
              {mode === "login" ? "S'inscrire gratuitement" : "Se connecter"}
            </button>
          </p>

          {/* {mode === "login" && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-600 text-center">
                💡 <span className="font-semibold">Démo :</span> Cliquez sur "Se connecter" pour accéder à la plateforme
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
