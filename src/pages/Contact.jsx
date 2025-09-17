import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Diese Funktion ist noch nicht implementiert",
      description: "Aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "E-Mail",
      content: "info@malbuch-magic.de",
      description: "Schreib uns eine E-Mail"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+49 123 456 789",
      description: "Mo-Fr 9:00-18:00 Uhr"
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "Kreativstraße 123, 12345 Berlin",
      description: "Deutschland"
    }
  ];

  const supportFeatures = [
    {
      icon: Clock,
      title: "Schnelle Antwort",
      description: "Wir antworten innerhalb von 24 Stunden"
    },
    {
      icon: MessageCircle,
      title: "Freundlicher Support",
      description: "Unser Team hilft gerne bei allen Fragen"
    },
    {
      icon: Star,
      title: "Persönliche Betreuung",
      description: "Individuelle Lösungen für deine Bedürfnisse"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Kontakt - MalBuch Magic</title>
        <meta name="description" content="Kontaktiere das MalBuch Magic Team. Wir helfen dir gerne bei Fragen zu personalisierten Ausmalbildern und unserem Service." />
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
                <span className="gradient-text">Kontakt</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hast du Fragen, Feedback oder brauchst Hilfe? Wir sind für dich da! 
                Kontaktiere uns über das Formular oder direkt per E-Mail oder Telefon.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="glass-card rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{info.title}</h3>
                  <p className="text-purple-600 font-semibold mb-1">{info.content}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glass-card rounded-3xl p-8"
              >
                <h2 className="font-playful text-2xl font-bold text-gray-800 mb-6">
                  Schreib uns eine Nachricht
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Dein Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="deine@email.de"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Betreff *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                    >
                      <option value="">Wähle ein Thema</option>
                      <option value="support">Technischer Support</option>
                      <option value="billing">Abrechnung & Bezahlung</option>
                      <option value="feature">Feature-Anfrage</option>
                      <option value="feedback">Feedback & Vorschläge</option>
                      <option value="other">Sonstiges</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 resize-none"
                      placeholder="Beschreibe dein Anliegen..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Nachricht senden
                  </Button>
                </form>
              </motion.div>

              {/* Support Features & FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-8"
              >
                {/* Support Features */}
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="font-playful text-2xl font-bold text-gray-800 mb-6">
                    Unser Support
                  </h2>
                  
                  <div className="space-y-6">
                    {supportFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Help */}
                <div className="glass-card rounded-3xl p-8">
                  <h3 className="font-playful text-xl font-bold text-gray-800 mb-4">
                    Schnelle Hilfe
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Viele Antworten findest du bereits in unseren häufig gestellten Fragen.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-purple-200 hover:border-purple-300 text-purple-700 font-semibold rounded-xl"
                  >
                    FAQ besuchen
                  </Button>
                </div>

                {/* Business Hours */}
                <div className="glass-card rounded-3xl p-8">
                  <h3 className="font-playful text-xl font-bold text-gray-800 mb-4">
                    Öffnungszeiten
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montag - Freitag:</span>
                      <span className="font-semibold text-gray-800">9:00 - 18:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Samstag:</span>
                      <span className="font-semibold text-gray-800">10:00 - 16:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sonntag:</span>
                      <span className="font-semibold text-gray-800">Geschlossen</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    E-Mails werden auch außerhalb der Öffnungszeiten bearbeitet.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;