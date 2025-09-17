import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Palette } from 'lucide-react';
import ShopCreator from '@/components/ShopCreator';

const CreatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Erstellen | ColorInYou - Dein persönliches Produkt</title>
        <meta name="description" content="Lade deine Fotos hoch, verwandle sie in Ausmalbilder und erstelle einzigartige, persönliche Produkte wie Malbücher, T-Shirts und mehr." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  Dein persönliches Kunstwerk
                </span>
              </div>
              <h1 className="font-playful text-4xl md:text-6xl font-bold mb-4">
                <span className="text-gray-800">Erstelle dein</span>{' '}
                <span className="gradient-text">einzigartiges Produkt</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Lade deine Fotos hoch, sieh zu, wie Magie geschieht, und wähle dein Lieblingsprodukt aus, um es für immer festzuhalten.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Shop Creator Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ShopCreator />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-playful text-xl font-bold mb-2">Unendliche Kreativität</h3>
                <p className="text-gray-600">Jedes Foto wird zu einem neuen, einzigartigen Meisterwerk, das nur darauf wartet, ausgemalt zu werden.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-playful text-xl font-bold mb-2">Hochwertige Produkte</h3>
                <p className="text-gray-600">Wir arbeiten mit den besten Anbietern, um sicherzustellen, dass dein Kunstwerk perfekt gedruckt wird.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-playful text-xl font-bold mb-2">Magisches Geschenk</h3>
                <p className="text-gray-600">Das perfekte, persönliche Geschenk für Geburtstage, Feiertage oder einfach nur so.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreatorPage;