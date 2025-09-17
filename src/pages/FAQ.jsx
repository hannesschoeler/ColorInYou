import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqCategories = [
    {
      title: "Allgemeine Fragen",
      questions: [
        {
          question: "Wie funktioniert die Umwandlung von Fotos in Ausmalbilder?",
          answer: "Unsere fortschrittliche KI-Technologie analysiert dein hochgeladenes Foto und erkennt automatisch Konturen, Gesichtszüge und wichtige Details. Anschließend wird das Bild in eine schwarz-weiße Malvorlage umgewandelt, die perfekt zum Ausmalen geeignet ist. Der gesamte Prozess dauert nur wenige Sekunden."
        },
        {
          question: "Welche Bildformate werden unterstützt?",
          answer: "Wir unterstützen die gängigsten Bildformate: JPG, JPEG, PNG, GIF und BMP. Die maximale Dateigröße beträgt 10 MB. Für beste Ergebnisse empfehlen wir hochauflösende Bilder mit guter Beleuchtung."
        },
        {
          question: "Wie lange dauert die Bearbeitung?",
          answer: "Die Umwandlung deines Fotos in ein Ausmalbild dauert normalerweise nur 2-5 Sekunden. Bei sehr hochauflösenden Bildern oder hoher Serverauslastung kann es gelegentlich etwas länger dauern."
        },
        {
          question: "Kann ich die Ausmalbilder kommerziell nutzen?",
          answer: "Mit unserem Pro-Plan darfst du die erstellten Ausmalbilder auch kommerziell nutzen. Die kostenlosen und Familien-Pläne sind nur für den privaten Gebrauch bestimmt."
        }
      ]
    },
    {
      title: "Technische Fragen",
      questions: [
        {
          question: "Welche Bildqualität erhalte ich?",
          answer: "Je nach gewähltem Plan erhältst du unterschiedliche Qualitäten: Starter-Plan bietet Standard-Qualität (1200x1200px), der Familien-Plan HD-Qualität (2400x2400px) und der Pro-Plan Ultra-HD 4K-Qualität (4800x4800px)."
        },
        {
          question: "Funktioniert die Website auf mobilen Geräten?",
          answer: "Ja! Unsere Website ist vollständig mobiloptimiert und funktioniert perfekt auf Smartphones und Tablets. Du kannst Fotos direkt von deinem Handy hochladen und bearbeiten."
        },
        {
          question: "Werden meine Fotos gespeichert?",
          answer: "Deine Privatsphäre ist uns wichtig. Hochgeladene Fotos werden nur temporär für die Bearbeitung gespeichert und nach 24 Stunden automatisch gelöscht. Wir geben deine Bilder niemals an Dritte weiter."
        },
        {
          question: "Was passiert bei schlechter Bildqualität?",
          answer: "Unsere KI funktioniert am besten mit klaren, gut beleuchteten Fotos. Bei unscharfen oder sehr dunklen Bildern kann die Qualität des Ausmalbildes beeinträchtigt sein. In solchen Fällen empfehlen wir, ein besseres Foto zu verwenden."
        }
      ]
    },
    {
      title: "Abonnement & Bezahlung",
      questions: [
        {
          question: "Kann ich mein Abonnement jederzeit kündigen?",
          answer: "Ja, du kannst dein Abonnement jederzeit ohne Kündigungsfrist beenden. Die Kündigung wird zum Ende des aktuellen Abrechnungszeitraums wirksam, und du behältst bis dahin vollen Zugang zu allen Funktionen."
        },
        {
          question: "Gibt es eine Geld-zurück-Garantie?",
          answer: "Wir bieten eine 30-Tage-Geld-zurück-Garantie für alle bezahlten Pläne. Falls du nicht zufrieden bist, erstatten wir dir den vollen Betrag ohne Fragen."
        },
        {
          question: "Welche Zahlungsmethoden akzeptiert ihr?",
          answer: "Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, American Express), PayPal, SEPA-Lastschrift und Sofortüberweisung. Alle Zahlungen werden sicher über verschlüsselte Verbindungen abgewickelt."
        },
        {
          question: "Kann ich zwischen den Plänen wechseln?",
          answer: "Ja, du kannst jederzeit zwischen den Plänen wechseln. Bei einem Upgrade wird der Unterschiedsbetrag anteilig berechnet. Bei einem Downgrade wird die Änderung zum nächsten Abrechnungszeitraum wirksam."
        }
      ]
    },
    {
      title: "Tipps & Tricks",
      questions: [
        {
          question: "Welche Fotos eignen sich am besten?",
          answer: "Am besten funktionieren Porträts mit gutem Kontrast, klaren Gesichtszügen und gleichmäßiger Beleuchtung. Vermeide sehr dunkle oder überbelichtete Bilder. Fotos mit einfachem Hintergrund liefern oft bessere Ergebnisse."
        },
        {
          question: "Kann ich mehrere Personen auf einem Bild haben?",
          answer: "Ja, unsere KI kann auch Gruppenfotos verarbeiten. Für beste Ergebnisse sollten die Personen deutlich erkennbar und nicht zu klein im Bild sein. Bei sehr vielen Personen kann das Ergebnis jedoch unübersichtlich werden."
        },
        {
          question: "Funktioniert es auch mit Haustieren?",
          answer: "Absolut! Haustierfotos funktionieren sehr gut, besonders bei Hunden und Katzen. Achte darauf, dass das Tier scharf abgebildet ist und sich vom Hintergrund abhebt."
        },
        {
          question: "Wie kann ich die besten Ergebnisse erzielen?",
          answer: "Verwende hochauflösende Fotos (mindestens 1000x1000 Pixel), sorge für gute Beleuchtung, wähle einen einfachen Hintergrund und stelle sicher, dass das Hauptmotiv scharf und deutlich erkennbar ist."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <Helmet>
        <title>Häufige Fragen (FAQ) - MalBuch Magic</title>
        <meta name="description" content="Finde Antworten auf alle deine Fragen zu MalBuch Magic. Von der Nutzung bis zur Abrechnung - hier findest du Hilfe zu allen Themen." />
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
                <HelpCircle className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="font-playful text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Häufige Fragen</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Hier findest du Antworten auf die wichtigsten Fragen rund um MalBuch Magic. 
                Falls deine Frage nicht dabei ist, kontaktiere uns gerne!
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Frage suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-600 text-lg">
                  Keine Ergebnisse für "{searchTerm}" gefunden. Versuche es mit anderen Suchbegriffen.
                </p>
              </motion.div>
            ) : (
              filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  className="mb-12"
                >
                  <h2 className="font-playful text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    {category.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const itemKey = `${categoryIndex}-${index}`;
                      const isOpen = openItems[itemKey];
                      
                      return (
                        <div
                          key={index}
                          className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          <button
                            onClick={() => toggleItem(itemKey)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white hover:bg-opacity-50 transition-all duration-300"
                          >
                            <h3 className="font-semibold text-gray-800 pr-4">
                              {faq.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playful text-3xl md:text-4xl font-bold text-white mb-6">
                Noch Fragen?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Unser freundliches Support-Team hilft dir gerne weiter. 
                Kontaktiere uns jederzeit!
              </p>
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Kontakt aufnehmen
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;