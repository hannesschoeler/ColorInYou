import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Trash2, FileText, Mail } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: "1. Verantwortlicher",
      content: `
        Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
        
        MalBuch Magic GmbH
        Kreativstraße 123
        12345 Berlin
        Deutschland
        
        E-Mail: datenschutz@malbuch-magic.de
        Telefon: +49 123 456 789
      `
    },
    {
      title: "2. Erhebung und Speicherung personenbezogener Daten",
      content: `
        Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und ähnliches.
        
        Bei der Nutzung unseres Services erheben wir folgende Daten:
        • Hochgeladene Bilder (temporär für die Verarbeitung)
        • E-Mail-Adresse (bei Registrierung)
        • Name (bei Registrierung)
        • Zahlungsinformationen (bei kostenpflichtigen Services)
      `
    },
    {
      title: "3. Verwendung Ihrer Daten",
      content: `
        Wir verwenden Ihre personenbezogenen Daten ausschließlich für folgende Zwecke:
        
        • Bereitstellung unseres Services (Umwandlung von Fotos in Ausmalbilder)
        • Kommunikation mit Ihnen
        • Abwicklung von Zahlungen
        • Verbesserung unserer Dienstleistungen
        • Erfüllung rechtlicher Verpflichtungen
        
        Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, außer zur Erfüllung vertraglicher Verpflichtungen oder aufgrund gesetzlicher Bestimmungen.
      `
    },
    {
      title: "4. Speicherung und Löschung von Bildern",
      content: `
        Ihre Privatsphäre ist uns besonders wichtig:
        
        • Hochgeladene Bilder werden nur temporär für die Verarbeitung gespeichert
        • Alle Bilder werden automatisch nach 24 Stunden gelöscht
        • Wir erstellen keine Backups Ihrer Bilder
        • Ihre Bilder werden niemals für andere Zwecke verwendet
        • Kein Zugriff durch Mitarbeiter außer für technischen Support
      `
    },
    {
      title: "5. Cookies und Tracking",
      content: `
        Unsere Website verwendet Cookies, um die Benutzerfreundlichkeit zu verbessern:
        
        • Technisch notwendige Cookies für die Funktionalität
        • Session-Cookies für die Anmeldung
        • Keine Tracking-Cookies von Drittanbietern
        • Keine Weitergabe von Cookie-Daten
        
        Sie können Cookies in Ihren Browser-Einstellungen deaktivieren.
      `
    },
    {
      title: "6. Ihre Rechte",
      content: `
        Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
        
        • Recht auf Auskunft über Ihre gespeicherten Daten
        • Recht auf Berichtigung unrichtiger Daten
        • Recht auf Löschung Ihrer Daten
        • Recht auf Einschränkung der Verarbeitung
        • Recht auf Datenübertragbarkeit
        • Widerspruchsrecht gegen die Verarbeitung
        • Recht auf Beschwerde bei einer Aufsichtsbehörde
      `
    },
    {
      title: "7. Datensicherheit",
      content: `
        Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein:
        
        • SSL-Verschlüsselung für alle Datenübertragungen
        • Sichere Server in deutschen Rechenzentren
        • Regelmäßige Sicherheitsupdates
        • Zugriffsbeschränkungen für Mitarbeiter
        • Regelmäßige Sicherheitsaudits
      `
    },
    {
      title: "8. Zahlungsdienstleister",
      content: `
        Für die Abwicklung von Zahlungen nutzen wir externe Dienstleister:
        
        • Stripe (für Kreditkartenzahlungen)
        • PayPal (für PayPal-Zahlungen)
        
        Diese Anbieter verarbeiten Ihre Zahlungsdaten nach ihren eigenen Datenschutzbestimmungen.
      `
    },
    {
      title: "9. Änderungen der Datenschutzerklärung",
      content: `
        Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, um sie an geänderte Rechtslage oder bei Änderungen des Services anzupassen. Für erneute Besuche gilt dann die neue Datenschutzerklärung.
        
        Stand: Januar 2024
      `
    }
  ];

  const highlights = [
    {
      icon: Lock,
      title: "Sichere Verschlüsselung",
      description: "Alle Daten werden mit SSL verschlüsselt übertragen"
    },
    {
      icon: Trash2,
      title: "Automatische Löschung",
      description: "Bilder werden nach 24 Stunden automatisch gelöscht"
    },
    {
      icon: Eye,
      title: "Keine Weitergabe",
      description: "Ihre Daten werden niemals an Dritte weitergegeben"
    },
    {
      icon: Shield,
      title: "DSGVO-konform",
      description: "Vollständige Einhaltung der europäischen Datenschutzverordnung"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Datenschutzerklärung - MalBuch Magic</title>
        <meta name="description" content="Datenschutzerklärung von MalBuch Magic. Erfahre, wie wir deine Daten schützen und verarbeiten. DSGVO-konform und transparent." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="font-playful text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Datenschutz</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Deine Privatsphäre ist uns wichtig. Hier erfährst du transparent, 
                wie wir mit deinen Daten umgehen und sie schützen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <highlight.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <h2 className="font-playful text-2xl font-bold text-gray-800 mb-4">
                      {section.title}
                    </h2>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="font-playful text-3xl md:text-4xl font-bold text-white mb-6">
                Fragen zum Datenschutz?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Bei Fragen zu unserer Datenschutzerklärung oder zur Verarbeitung 
                deiner Daten kontaktiere uns gerne.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span className="text-white font-semibold">
                  📧 datenschutz@malbuch-magic.de
                </span>
                <span className="text-white font-semibold">
                  📞 +49 123 456 789
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Privacy;