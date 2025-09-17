import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Pricing = () => {
  const handlePurchase = (plan) => {
    toast({
      title: "🚧 Diese Funktion ist noch nicht implementiert",
      description: "Aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀",
    });
  };

  const plans = [
    {
      name: "Starter",
      price: "0",
      period: "kostenlos",
      description: "Perfekt zum Ausprobieren",
      icon: Gift,
      color: "from-green-400 to-blue-500",
      features: [
        "1 kostenloses Ausmalbild",
        "Standard Qualität",
        "Sofortiger Download",
        "Grundlegende Bearbeitung"
      ],
      popular: false
    },
    {
      name: "Familie",
      price: "9.99",
      period: "pro Monat",
      description: "Ideal für Familien",
      icon: Star,
      color: "from-purple-400 to-pink-500",
      features: [
        "20 Ausmalbilder pro Monat",
        "HD Qualität",
        "Prioritäts-Support",
        "Erweiterte Bearbeitung",
        "Verschiedene Stile",
        "Familien-Galerie"
      ],
      popular: true
    },
    {
      name: "Pro",
      price: "19.99",
      period: "pro Monat",
      description: "Für Erzieher & Profis",
      icon: Crown,
      color: "from-yellow-400 to-orange-500",
      features: [
        "Unbegrenzte Ausmalbilder",
        "4K Ultra HD Qualität",
        "24/7 Premium Support",
        "Alle Bearbeitungstools",
        "Kommerzielle Nutzung",
        "Batch-Verarbeitung",
        "API Zugang",
        "White-Label Option"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Kann ich jederzeit kündigen?",
      answer: "Ja, du kannst dein Abonnement jederzeit ohne Kündigungsfrist beenden."
    },
    {
      question: "Gibt es eine Geld-zurück-Garantie?",
      answer: "Wir bieten eine 30-Tage-Geld-zurück-Garantie für alle bezahlten Pläne."
    },
    {
      question: "Welche Zahlungsmethoden akzeptiert ihr?",
      answer: "Wir akzeptieren alle gängigen Kreditkarten, PayPal und SEPA-Lastschrift."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Preise & Pakete - MalBuch Magic</title>
        <meta name="description" content="Wähle das perfekte Paket für deine Familie. Von kostenlos bis Pro - finde den idealen Plan für personalisierte Ausmalbilder." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="font-playful text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Preise & Pakete</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wähle das perfekte Paket für deine Familie. Starte kostenlos und 
                upgrade jederzeit für mehr Funktionen.
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-purple-400 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Beliebteste Wahl
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <plan.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="font-playful text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-800">€{plan.price}</span>
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(plan.name)}
                    className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-600'
                    }`}
                  >
                    {plan.price === "0" ? "Kostenlos starten" : "Jetzt wählen"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playful text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Alle Funktionen im Überblick</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Blitzschnell",
                  description: "Umwandlung in unter 3 Sekunden"
                },
                {
                  icon: Star,
                  title: "HD Qualität",
                  description: "Gestochen scharfe Ausmalbilder"
                },
                {
                  icon: Check,
                  title: "Einfach zu bedienen",
                  description: "Kinderleichte Handhabung"
                },
                {
                  icon: Crown,
                  title: "Premium Support",
                  description: "Hilfe wann immer du sie brauchst"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playful text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Häufige Fragen</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playful text-3xl md:text-4xl font-bold text-white mb-6">
                Bereit loszulegen?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Starte noch heute kostenlos und entdecke die Magie personalisierter Ausmalbilder!
              </p>
              <Button 
                onClick={() => handlePurchase("Starter")}
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Kostenlos starten
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pricing;