import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, MapPin, ArrowRight, Star, CheckCircle, GraduationCap,
  Building2, TrendingUp, Zap, Bell, Users, BarChart3, ChevronRight
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { testimonials, stats, mockOffers } from "../data/mockData";

const studentImg = "https://images.unsplash.com/photo-1638636214032-581196ffd400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudHMlMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc3MjEzNjg2OXww&ixlib=rb-4.1.0&q=80&w=1080";
const workImg = "https://images.unsplash.com/photo-1765648684630-ac9c15ac98d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMEFmcmljYW4lMjBwcm9mZXNzaW9uYWwlMjB3b3JraW5nJTIwbGFwdG9wfGVufDF8fHx8MTc3MjEzNjg3M3ww&ixlib=rb-4.1.0&q=80&w=1080";
const teamImg = "https://images.unsplash.com/photo-1562910859-be83f1df7b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdGVjaCUyMHN0YXJ0dXAlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzIxMzY4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const domains = [
  { name: "Informatique", icon: "💻", count: 142 },
  { name: "Finance", icon: "💰", count: 87 },
  { name: "Marketing", icon: "📣", count: 95 },
  { name: "RH", icon: "👥", count: 63 },
  { name: "Génie Civil", icon: "🏗️", count: 55 },
  { name: "Design", icon: "🎨", count: 48 },
  { name: "Commerce", icon: "🤝", count: 71 },
  { name: "Droit", icon: "⚖️", count: 39 },
];

export default function Landing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = () => {
    navigate(`/offers?q=${searchQuery}&city=${searchCity}`);
  };

  const featuredOffers = mockOffers.filter(o => o.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "#111827" }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, #F97316, transparent)" }}></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, #F97316, transparent)" }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-200 border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-blue-800 text-xs">🇨🇮 N°1 des stages en Côte d'Ivoire</span>
              </div>
              <h1 className="text-4xl lg:text-5xl text-white mb-6 leading-tight" style={{ fontWeight: 800 }}>
                Trouvez votre stage{" "}
                <span style={{ background: "linear-gradient(90deg, #F97316, #16A34A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  idéal
                </span>{" "}
                en Afrique de l'Ouest
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                StageConnect connecte les étudiants ambitieux avec les meilleures entreprises de Côte d'Ivoire et d'Afrique de l'Ouest. Postulez en un clic, démarrez votre carrière.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl mb-8">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search size={18} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Domaine, compétence, entreprise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 outline-none text-sm text-gray-700 bg-transparent py-2"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <div className="hidden sm:block w-px bg-gray-200 self-stretch my-1"></div>
                <div className="flex items-center gap-2 px-3 sm:w-44">
                  <MapPin size={18} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Ville"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="flex-1 outline-none text-sm text-gray-700 bg-transparent py-2"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl text-sm transition-all hover:opacity-90 whitespace-nowrap"
                
                >
                  Rechercher
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span>Populaires :</span>
                {["Développeur", "Finance", "Marketing", "Data Science"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { setSearchQuery(tag); navigate(`/offers?q=${tag}`); }}
                    className="bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-1 rounded-full transition-colors border border-white/10"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Images */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <img
                  src={studentImg}
                  alt="Étudiants"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Stage trouvé !</p>
                    <p className="text-sm text-gray-900 font-semibold">Orange CI - Dev Web</p>
                  </div>
                </div>
                <div className="absolute -top-5 -right-5 bg-white rounded-xl p-3 shadow-xl">
                  <p className="text-xs text-gray-500 mb-1">Nouvelles offres</p>
                  <p className="text-2xl" style={{ fontWeight: 800, color: "#F97316" }}>+48</p>
                  <p className="text-xs text-gray-400">cette semaine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-2xl text-gray-900 mb-1" style={{ fontWeight: 800 }}>{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>Explorez par domaine</h2>
            <p className="text-gray-500">Trouvez des stages dans votre secteur d'activité</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {domains.map((domain) => (
              <button
                key={domain.name}
                onClick={() => navigate(`/offers?domain=${domain.name}`)}
                className="bg-white border border-gray-100 rounded-xl p-5 text-center hover:border-orange-200 hover:shadow-sm transition-all group"
              >
                <div className="text-3xl mb-3">{domain.icon}</div>
                <p className="text-sm text-gray-800 font-semibold mb-1">{domain.name}</p>
                <p className="text-xs text-gray-400">{domain.count} offres</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>Offres en vedette</h2>
              <p className="text-gray-500">Les meilleures opportunités du moment</p>
            </div>
            <button onClick={() => navigate("/offers")}
              className="hidden sm:flex items-center gap-2 text-sm text-blue-600 font-semibold hover:opacity-80 transition-opacity"
              >
              Voir toutes les offres <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredOffers.map((offer) => (
              <div key={offer.id} onClick={() => navigate(`/offers/${offer.id}`)}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {offer.companyLogo}
                  </div>
                  {offer.remote && <span className="text-xs bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full">Remote</span>}
                </div>
                <h3 className="text-gray-900 mb-1 group-hover:text-orange-500 transition-colors" style={{ fontWeight: 600 }}>
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{offer.company}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                    <MapPin size={11} /> {offer.location}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">⏱ {offer.duration}</span>
                  <span className="text-xs font-semibold bg-blue-200 px-2.5 py-1 rounded-full" >
                    {offer.salary}/mois
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{offer.posted}</span>
                  <span className="text-xs text-gray-400">{offer.applicants} candidats</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>Comment ça marche ?</h2>
            <p className="text-gray-500">Trouvez votre stage en 3 étapes simples</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={workImg} alt="Comment ça marche" className="w-full h-72 object-cover rounded-2xl shadow-sm" />
            </div>
            <div className="space-y-8">
              {[
                { step: "01", icon: GraduationCap, title: "Créez votre profil", desc: "Inscrivez-vous en quelques minutes, complétez votre profil et uploadez votre CV." },
                { step: "02", icon: Search, title: "Trouvez votre stage", desc: "Explorez des centaines d'offres filtrées par domaine, ville, durée et salaire." },
                { step: "03", icon: Zap, title: "Postulez en un clic", desc: "Envoyez votre candidature directement depuis la plateforme avec votre lettre de motivation." },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-blue-400"/>
                  </div>
                  <div>
                    <div className="text-xs font-bold mb-1 text-gray-400">ÉTAPE {item.step}</div>
                    <h3 className="text-gray-900 mb-1.5" style={{ fontWeight: 600 }}>{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Companies */}
      <section className="py-16" style={{ background: "#111827" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                <Building2 size={14} className="text-blue-400" />
                <span className="text-blue-400 text-xs font-semibold">Pour les entreprises</span>
              </div>
              <h2 className="text-3xl text-white mb-5" style={{ fontWeight: 700 }}>
                Recrutez les meilleurs stagiaires de la région
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Accédez à un vivier de talents qualifiés issus des meilleures universités de Côte d'Ivoire et d'Afrique de l'Ouest.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Users,    text: "12 400+ profils étudiants" },
                  { icon: Zap,      text: "Publication en 5 minutes"  },
                  { icon: BarChart3,text: "Statistiques détaillées"   },
                  { icon: Bell,     text: "Alertes candidatures"      },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={16} className="text-blue-500 shrink-0" />
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/auth?type=company")}
                className="bg-blue-500 flex items-center gap-2 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                >
                Commencer gratuitement <ArrowRight size={16} />
              </button>
            </div>
            <div>
              <img src={teamImg} alt="Entreprises" className="w-full h-80 object-cover rounded-2xl opacity-70" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>Ils nous font confiance</h2>
            <p className="text-gray-500">Ce que disent nos utilisateurs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                    {t.school && <p className="text-xs text-gray-400">{t.school}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>
            Prêt à lancer votre carrière ? 🚀
          </h2>
          <p className="text-gray-500 mb-8">
            Rejoignez plus de 12 400 étudiants qui ont déjà trouvé leur stage grâce à StageConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/auth?type=student")}
              className="bg-blue-500 flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:opacity-90">
              <GraduationCap size={18} /> Je suis étudiant – Je m'inscris
            </button>
            <button onClick={() => navigate("/auth?type=company")}
              className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:bg-gray-800">
              <Building2 size={18} /> Je suis une entreprise
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}