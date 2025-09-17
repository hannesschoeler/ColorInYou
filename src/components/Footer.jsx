import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { title: "Unternehmen", links: [{ label: "Über uns", href: "/#about" }, { label: "Kontakt", href: "/kontakt" }, { label: "Impressum", href: "/impressum" }] },
    { title: "Produkt", links: [{ label: "So geht's", href: "/#how-it-works" }, { label: "Preise", href: "/preise" }, { label: "Galerie", href: "/galerie" }] },
    { title: "Rechtliches", links: [{ label: "Datenschutz", href: "/datenschutz" }, { label: "AGB", href: "/agb" }] }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-gray-400 text-sm">
              Verwandle deine Fotos in einzigartige Ausmalbilder.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(social => (
                <a key={social.label} href={social.href} className="text-gray-400 hover:text-white transition-colors" aria-label={social.label}>
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map(section => (
            <div key={section.title}>
              <p className="font-semibold text-gray-200 tracking-wider uppercase">{section.title}</p>
              <ul className="mt-4 space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} ColorInYou. Alle Rechte vorbehalten.</p>
          <p className="mt-4 sm:mt-0">
            <Link to="/shopify-test" className="hover:text-white">Shopify Test</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;