import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Wand2, Download, Star, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Home = () => {
  const {
    user
  } = useAuth();
  const getFirstName = fullName => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };
  const steps = [{
    icon: Upload,
    title: "Foto hochladen",
    description: "Lade einfach ein Foto von deinem Kind, Haustier oder Lieblingsbild hoch"
  }, {
    icon: Wand2,
    title: "Automatische Umwandlung",
    description: "Unsere KI verwandelt dein Foto in wenigen Sekunden in eine wunderschöne Malvorlage"
  }, {
    icon: Download,
    title: "Herunterladen & Ausmalen",
    description: "Lade dein personalisiertes Ausmalbild herunter und lass der Kreativität freien Lauf"
  }];
  const testimonials = [{
    name: "Sarah M.",
    text: "Meine Tochter war so begeistert von ihrem eigenen Ausmalbild! Eine wunderbare Idee.",
    rating: 5
  }, {
    name: "Thomas K.",
    text: "Perfekt für Kindergeburtstage. Die Kinder lieben es, sich selbst auszumalen.",
    rating: 5
  }, {
    name: "Lisa W.",
    text: "So einfach zu bedienen und das Ergebnis ist fantastisch. Absolute Empfehlung!",
    rating: 5
  }];
  return <>
      <Helmet>
        <title>ColorInYou - Personalisierte Ausmalbilder aus deinen Fotos</title>
        <meta name="description" content="Verwandle deine Fotos in wunderschöne Ausmalbilder! Einfach hochladen, automatisch umwandeln und kreative Momente mit Kindern genießen." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }}>
              {user ? <div className="mb-6">
                    <h2 className="font-playful text-3xl font-bold text-gray-800">Willkommen</h2>
                    <h1 className="font-playful text-4xl md:text-5xl font-bold gradient-text truncate">
                      {getFirstName(user.user_metadata?.full_name) || user.email}!
                    </h1>
                 </div> : <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    Neu & Magisch
                  </span>
                </div>}
              
              {!user && <h1 className="font-playful text-4xl md:text-6xl font-bold mb-6">
                  <span className="gradient-text">Mach Kindern</span>
                  <br />
                  <span className="text-gray-800">eine Freude mit</span>
                  <br />
                  <span className="gradient-text">ihrem eigenen</span>
                  <br />
                  <span className="text-gray-800">Ausmalbild!</span>
                </h1>}
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Verwandle jedes Foto in wenigen Sekunden in ein wunderschönes, 
                personalisiertes Ausmalbild. Perfekt für kreative Momente mit der ganzen Familie!
              </p>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/erstellen">
                  <Upload className="h-5 w-5 mr-2" />
                  Jetzt Bild hochladen
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              
              <div className="flex items-center mt-8 space-x-4">
                <div className="flex -space-x-2">
                  <img className="w-10 h-10 rounded-full border-2 border-white" alt="Glückliches Kind beim Malen" src="https://images.unsplash.com/photo-1522505449726-e148c41c2a8d" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" alt="Familie beim kreativen Spielen" src="https://images.unsplash.com/photo-1583828883089-49a7ff344649" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" alt="Lächelndes Mädchen mit Buntstiften" src="https://images.unsplash.com/photo-1701561356036-a6e9642244e8" />
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">1000+</span> glückliche Familien
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="relative">
              <div className="floating-animation">
                <img className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl" alt="Kind malt fröhlich ein personalisiertes Ausmalbild" src="https://images.unsplash.com/photo-1594729503034-7b598a6c041a" />
              </div>
              
              <motion.div animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 3,
              repeat: Infinity
            }} className="absolute -top-4 -right-4 bg-yellow-400 p-3 rounded-full shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </motion.div>
              
              <motion.div animate={{
              y: [0, 10, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity
            }} className="absolute -bottom-4 -left-4 bg-pink-400 p-3 rounded-full shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="font-playful text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">So einfach geht's</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In nur 3 einfachen Schritten zu deinem personalisierten Ausmalbild
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: index * 0.2
          }} viewport={{
            once: true
          }} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-playful text-xl font-bold mb-4 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="font-playful text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Sieh dir die Magie an</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Echte Fotos verwandelt in wunderschöne Ausmalbilder
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(item => <motion.div key={item} initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: item * 0.1
          }} viewport={{
            once: true
          }} className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Vorher</p>
                    <img className="w-full h-32 object-cover rounded-lg" alt={`Originalfoto ${item}`} src="https://images.unsplash.com/photo-1538500729779-0720f2174f93" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Nachher</p>
                    <img className="w-full h-32 object-cover rounded-lg" alt={`Ausmalbild ${item}`} src="https://images.unsplash.com/photo-1560128416-d8bf90e0ff08" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Umwandlung in 3 Sek.</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="font-playful text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Was Familien sagen</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Echte Bewertungen von begeisterten Eltern und Kindern
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: index * 0.2
          }} viewport={{
            once: true
          }} className="glass-card rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-800">- {testimonial.name}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }}>
            <h2 className="font-playful text-3xl md:text-5xl font-bold text-white mb-6">
              Bereit für die Magie?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Starte jetzt und verwandle dein erstes Foto in ein wunderschönes Ausmalbild. 
              Deine Kinder werden es lieben!
            </p>
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/erstellen">
                <Upload className="h-5 w-5 mr-2" />
                Jetzt kostenlos ausprobieren
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>;
};
export default Home;