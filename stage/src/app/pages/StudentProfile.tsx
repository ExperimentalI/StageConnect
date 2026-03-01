import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Edit2, Upload, Plus, X, MapPin, Phone, Mail, Globe, Linkedin,
  GraduationCap, Briefcase, Star, CheckCircle, Save, Camera
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

interface StudentProfileProps {
  onLogout?: () => void;
}

const initialSkills = ["React.js", "Node.js", "Python", "SQL", "Git", "TypeScript"];
const suggestedSkills = ["Java", "Docker", "MongoDB", "Angular", "Vue.js", "Django", "Machine Learning", "Power BI"];

export default function StudentProfile({ onLogout }: StudentProfileProps) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Kouamé Ange",
    lastName: "Brice",
    title: "Étudiant en Génie Informatique",
    school: "INP-HB Yamoussoukro",
    level: "Master 2",
    domain: "Génie Informatique",
    email: "kouame.brice@inphb.edu.ci",
    phone: "+225 07 54 32 10 00",
    city: "Abidjan",
    linkedIn: "linkedin.com/in/kouamebrice",
    portfolio: "kouamebrice.dev",
    bio: "Passionné par le développement web et les nouvelles technologies, je suis à la recherche d'un stage de fin d'études dans le domaine du développement logiciel ou de la data science. Rigoureux, curieux et toujours prêt à apprendre.",
    availability: "Mars 2026",
    desiredDuration: "6 mois",
    desiredSalary: "150 000 FCFA",
  });

  const update = (field: string, value: string) =>
    setProfile((prev) => ({ ...prev, [field]: value }));

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleSave = async () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all";

  const experiences = [
    {
      id: 1,
      title: "Stage Développeur Front-end",
      company: "StartupCI",
      period: "Juin 2025 – Août 2025",
      description: "Développement de l'interface utilisateur d'une application fintech avec React.js",
    },
  ];

  const formations = [
    {
      id: 1,
      degree: "Master 2 – Génie Informatique",
      school: "INP-HB Yamoussoukro",
      period: "2024 – 2026",
    },
    {
      id: 2,
      degree: "Licence – Informatique",
      school: "INP-HB Yamoussoukro",
      period: "2021 – 2024",
    },
  ];

  const completionPercentage = 75;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="student" onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Save notification */}
        {saved && (
          <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm animate-in slide-in-from-right">
            <CheckCircle size={16} /> Profil sauvegardé !
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-20" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}></div>
              <div className="px-6 pb-6 -mt-10">
                <div className="relative inline-block mb-3">
                  <div className="w-20 h-20 rounded-2xl border-4 border-white flex items-center justify-center text-white text-2xl font-bold shadow-md"
                    style={{ background: "linear-gradient(135deg, #F97316, #16A34A)" }}>
                    KB
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
                    <Camera size={13} className="text-gray-500" />{" "}
                  </button>
                </div>
                {editing ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input className={inputClass} value={profile.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Prénom" />
                      <input className={inputClass} value={profile.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Nom" />
                    </div>
                    <input className={inputClass} value={profile.title} onChange={(e) => update("title", e.target.value)} placeholder="Title"/>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-gray-900">{profile.firstName} {profile.lastName}</h2>
                    <p className="text-sm text-gray-500">{profile.title}</p>
                  </>
                )}

                {/* Completion */}
                <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-orange-700 font-semibold">Complétude du profil</span>
                    <span className="text-xs text-orange-600 font-bold">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-orange-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${completionPercentage}%`, background: "linear-gradient(90deg, #F97316, #16A34A)" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-gray-900">Informations</h3>
                <button onClick={() => setEditing(!editing)} className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors">
                  <Edit2 size={14} />{" "}
                </button>
              </div>
              <div className="space-y-3">
                {editing ? (
                  <>
                    <input className={inputClass} value={profile.email} onChange={(e) => update("email", e.target.value)} placeholder="Email" />
                    <input className={inputClass} value={profile.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Téléphone" />
                    <input className={inputClass} value={profile.city} onChange={(e) => update("city", e.target.value)} placeholder="Ville" />
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 text-sm text-gray-600">
                      <Mail size={14} className="text-orange-400 shrink-0" /> {profile.email}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-600">
                      <Phone size={14} className="text-orange-400 shrink-0" /> {profile.phone}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-600">
                      <MapPin size={14} className="text-orange-400 shrink-0" /> {profile.city}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-blue-500">
                      <Linkedin size={14} className="shrink-0" /> {profile.linkedIn}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-purple-500">
                      <Globe size={14} className="shrink-0" /> {profile.portfolio}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-sm text-gray-900 mb-4">Préférences de stage</h3>
              {editing ? (
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Disponibilité</label>
                    <input className={inputClass} value={profile.availability} onChange={(e) => update("availability", e.target.value)} placeholder="Avalability"/>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Durée souhaitée</label>
                    <input className={inputClass} value={profile.desiredDuration} onChange={(e) => update("desiredDuration", e.target.value)} placeholder="Durée souhaitée"/>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Indemnité souhaitée</label>
                    <input className={inputClass} value={profile.desiredSalary} onChange={(e) => update("desiredSalary", e.target.value)} placeholder="Indemnité souhaitée"/>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Disponible dès</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{profile.availability}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Durée</span>
                    <span className="text-xs font-semibold text-blue-600">{profile.desiredDuration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Indemnité min.</span>
                    <span className="text-xs font-semibold text-orange-500">{profile.desiredSalary}</span>
                  </div>
                </div>
              )}
            </div>

            {/* CV */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-sm text-gray-900 mb-4">CV & Documents</h3>
              <div className="p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 mb-3">
                <span className="text-xl">📄</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Mon_CV_2026.pdf</p>
                  <p className="text-xs text-gray-500">Mis à jour le 15 Jan 2026</p>
                </div>
                <CheckCircle size={16} className="text-green-500" />
              </div>
              <button className="w-full border-2 border-dashed border-gray-200 rounded-xl p-3 text-sm text-gray-500 hover:border-orange-300 hover:text-orange-500 transition-colors flex items-center justify-center gap-2">
                <Upload size={15} /> Mettre à jour le CV
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Bio */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">À propos de moi</h3>
                <button onClick={() => setEditing(!editing)} className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors">
                  <Edit2 size={15} />{" "}
                </button>
              </div>
              {editing ? (
                <textarea
                  rows={5}
                  value={profile.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="Bio"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 resize-none"
                />
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Formation */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap size={18} className="text-orange-500" /> Formation
                </h3>
                <button className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors">
                  <Plus size={15} />{" "}
                </button>
              </div>
              <div className="space-y-4">
                {formations.map((f) => (
                  <div key={f.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                      <GraduationCap size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{f.degree}</p>
                      <p className="text-sm text-gray-600">{f.school}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{f.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expériences */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase size={18} className="text-blue-500" /> Expériences
                </h3>
                <button className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors">
                  <Plus size={15} />{" "}
                </button>
              </div>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Briefcase size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{exp.title}</p>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-400 mt-0.5 mb-2">{exp.period}</p>
                      <p className="text-xs text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-gray-200 rounded-xl p-3 text-sm text-gray-500 hover:border-blue-200 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
                  <Plus size={14} /> Ajouter une expérience
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Star size={18} className="text-yellow-500" /> Compétences
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 text-sm bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full font-medium"
                  >
                    {skill}
                    {editing && (
                      <button onClick={() => removeSkill(skill)} className="text-blue-400 hover:text-red-500 transition-colors">
                        <X size={12} />{" "}
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editing && (
                <>
                  <div className="flex gap-2 mb-3">
                    <input
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="Ajouter une compétence..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
                    />
                    <button
                      onClick={() => addSkill(newSkill)}
                      className="px-4 py-2 text-white rounded-xl text-sm"
                      style={{ background: "linear-gradient(135deg, #F97316, #ea6c0a)" }}
                    >
                      Ajouter
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Suggestions :</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.filter(s => !skills.includes(s)).map((s) => (
                        <button
                          key={s}
                          onClick={() => addSkill(s)}
                          className="text-xs text-gray-600 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 px-3 py-1 rounded-full transition-colors"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Save button */}
            {editing && (
              <button
                onClick={handleSave}
                className="w-full text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #F97316, #ea6c0a)" }}
              >
                <Save size={16} /> Sauvegarder les modifications
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
