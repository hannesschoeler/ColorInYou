import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Gallery = () => {
  const handleDownload = () => {
    toast({
      title: "🚧 Diese Funktion ist noch nicht implementiert",
      description: "Aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀",
    });
  };

  const categories = [
    { name: 'Kinder', count: 24 },
    { name: 'Haustiere', count: 18 },
    { name: 'Familie', count: 15 },
    { name: 'Babys', count: 12 },
    { name: 'Freunde', count: 9 }
  ];

  const galleryItems = [
    { id: 1, category: 'Kinder', likes: 45, downloads: 123 },
    { id: 2, category: 'Haustiere', likes: 38, downloads: 89 },
    { id: 3, category: 'Familie', likes: 52, downloads: 156 },
    { id: 4, category: 'Kinder', likes: 41, downloads: 98 },
    { id: 5, category: 'Babys', likes: 67, downloads: 201 },
    { id: 6, category: 'Haustiere', likes: 33, downloads: 76 },
    { id: 7, category: 'Familie', likes: 49, downloads: 134 },
    { id: 8, category: 'Freunde', likes: 28, downloads: 65 },
    { id: 9, category: 'Kinder', likes: 55, downloads: 167 },
    { id: 10, category: 'Babys', likes: 71, downloads: 223 },
    { id: 11, category: 'Haustiere', likes: 42, downloads: 112 },
    { id: 12, category: 'Familie', likes: 36, downloads: 87 }
  ];

  return (
    <>
      <Helmet>
        <title>Galerie - Beispiel Ausmalbilder | MalBuch Magic</title>
        <meta name="description" content="Entdecke unsere Galerie mit wunderschönen Beispiel-Ausmalbildern. Lass dich inspirieren von personalisierten Malvorlagen für Kinder und Familien." />
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
                <span className="gradient-text">Unsere Galerie</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Entdecke wunderschöne Beispiele von personalisierten Ausmalbildern, 
                die andere Familien bereits erstellt haben
              </p>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300 px-6 py-3 rounded-full font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img  
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                      alt={`Ausmalbild ${item.category} ${item.id}`}
                     src="https://images.unsplash.com/photo-1521277597028-6da47ed15014" />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Button
                        onClick={handleDownload}
                        className="opacity-0 group-hover:opacity-100 bg-white text-purple-600 hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Herunterladen
                      </Button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white bg-opacity-90 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-600">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-sm">{item.likes}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Download className="h-4 w-4 mr-1 text-blue-500" />
                          <span className="text-sm">{item.downloads}</span>
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-12"
            >
              <Button
                onClick={() => toast({
                  title: "🚧 Diese Funktion ist noch nicht implementiert",
                  description: "Aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀",
                })}
                variant="outline"
                size="lg"
                className="border-2 border-purple-200 hover:border-purple-300 text-purple-700 font-semibold px-8 py-3 rounded-xl"
              >
                Mehr Beispiele laden
              </Button>
            </motion.div>
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
                Erstelle dein eigenes Ausmalbild
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Lass dich von unserer Galerie inspirieren und erstelle jetzt dein ganz 
                persönliches Ausmalbild!
              </p>
              <Button 
                onClick={() => toast({
                  title: "🚧 Diese Funktion ist noch nicht implementiert",
                  description: "Aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀",
                })}
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Jetzt starten
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Gallery;