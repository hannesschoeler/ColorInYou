import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building, Mail, Phone, MapPin, FileText, User, Gavel } from 'lucide-react';

const Impressum = () => {
  const companyInfo = [
    {
      icon: Building,
      title: "Firmenname",
      content: "MalBuch Magic GmbH"
    },
    {
      icon: MapPin,
      title: "Anschrift",
      content: "Kreativstraße 123\n12345 Berlin\nDeutschland"
    },
    {
      icon: Mail,
      title: "E-Mail",
      content: "info@malbuch-magic.de"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+49 123 456 789"
    }
  ];

  const legalInfo = [
    {
      title: "Handelsregister",
      content: "Amtsgericht Berlin, HRB 123456"
    },
    {
      title: "Umsatzsteuer-ID",
      content: "DE123456789"
    },
    {
      title: "Geschäftsführer",
      content: "Max Mustermann, Lisa Musterfrau"
    },
    {
      title: "Aufsichtsbehörde",
      content: "Gewerbeaufsichtsamt Berlin"
    }
  ];

  const sections = [
    {
      title: "Haftung für Inhalte",
      content: `
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      `
    },
    {
      title: "Haftung für Links",
      content: `
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.

        Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      `
    },
    {
      title: "Urheberrecht",
      content: `
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.

        Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
      `
    },
    {
      title: "Streitschlichtung",
      content: `
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/

        Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      `
    }
  ];

  return (
    <>
      <Helmet>
        <title>Impressum - MalBuch Magic</title>
        <meta name="description" content="Impressum und rechtliche Informationen zu MalBuch Magic. Kontaktdaten, Geschäftsführung und rechtliche Hinweise." />
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
                <FileText className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="font-playful text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Impressum</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Rechtliche Informationen und Kontaktdaten gemäß § 5 TMG
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Information */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="font-playful text-3xl font-bold text-center mb-12">
                <span className="gradient-text">Angaben gemäß § 5 TMG</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {companyInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">{info.title}</h3>
                        <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Legal Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="font-playful text-3xl font-bold text-center mb-12">
                <span className="gradient-text">Rechtliche Angaben</span>
              </h2>
              
              <div className="glass-card rounded-3xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {legalInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                        <Gavel className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">{info.title}</h3>
                        <p className="text-gray-600">{info.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Legal Sections */}
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
                <User className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="font-playful text-3xl md:text-4xl font-bold text-white mb-6">
                Rechtliche Fragen?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Bei rechtlichen Fragen oder Anmerkungen zu diesem Impressum 
                kontaktiere uns gerne direkt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span className="text-white font-semibold">
                  📧 legal@malbuch-magic.de
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

export default Impressum;