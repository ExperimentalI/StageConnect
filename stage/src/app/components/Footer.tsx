import { Link } from "react-router";
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F97316, #16A34A)" }}>
                <span className="text-white text-sm">SC</span>
              </div>
              <span className="text-white" style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                Stage<span style={{ color: "#F97316" }}>Connect</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              La plateforme qui connecte les étudiants avec les meilleures opportunités de stage en Côte d'Ivoire et en Afrique de l'Ouest.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Étudiants */}
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: "0.9rem" }}>Pour les étudiants</h4>
            <ul className="space-y-2.5">
              {["Rechercher un stage", "Mon tableau de bord", "Mon profil", "Mes candidatures", "Recommandations"].map((item) => (
                <li key={item}>
                  <Link to="/offers" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprises */}
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: "0.9rem" }}>Pour les entreprises</h4>
            <ul className="space-y-2.5">
              {["Publier une offre", "Gérer les candidatures", "Tableau de bord", "Profil entreprise", "Statistiques"].map((item) => (
                <li key={item}>
                  <Link to="/auth?type=company" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: "0.9rem" }}>Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={15} className="text-orange-400 mt-0.5 shrink-0" />
                Plateau, Abidjan, Côte d'Ivoire
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={15} className="text-orange-400 shrink-0" />
                contact@stageconnect.ci
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={15} className="text-orange-400 shrink-0" />
                +225 07 00 00 00 00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 StageConnect. Tous droits réservés. 🇨🇮 Made in Côte d'Ivoire
          </p>
          <div className="flex gap-5">
            {["Conditions d'utilisation", "Politique de confidentialité", "Aide"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
