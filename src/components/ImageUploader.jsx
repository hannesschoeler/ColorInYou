import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileImage, Wand2, Download, Printer, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [coloringPage, setColoringPage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isConverting) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsConverting(false);
            setColoringPage('/coloring-page-placeholder.png'); // Placeholder for converted image
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isConverting]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setColoringPage(null);
        setIsConverting(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleReset = () => {
    setImage(null);
    setColoringPage(null);
    setIsConverting(false);
    setProgress(0);
  };
  
  const handleActionClick = () => {
    toast({
      title: "🚧 Diese Funktion ist noch nicht implementiert",
      description: "Aber keine Sorge! Du kannst sie in deinem nächsten Prompt anfordern! 🚀",
    });
  }

  const products = [
    { name: 'Malbuch', description: 'Dein Kunstwerk als echtes Malbuch – direkt nach Hause!', image: '/product-coloring-book.png' },
    { name: 'Leinwand', description: 'Das Meisterwerk deines Kindes auf einer echten Leinwand.', image: '/product-canvas.png' },
    { name: 'Einkaufsbeutel', description: 'Trage die Kunst deines Kindes stolz durch die Stadt.', image: '/product-bag.png' },
    { name: 'Poster', description: 'Einzigartiges Kunstwerk für das Kinderzimmer.', image: '/product-poster.png' },
    { name: 'T-Shirt', description: 'Ein persönliches & tragbares Kunstwerk.', image: '/product-tshirt.png' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/heic"
      />
      
      {!image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-purple-200 rounded-3xl bg-purple-50/50 text-center"
        >
          <div className="w-20 h-20 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileImage className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-playful text-2xl font-bold mb-2 text-gray-800">Lade dein Foto hoch</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Wähle ein JPG, PNG oder HEIC Bild aus, um es in ein magisches Ausmalbild zu verwandeln.
          </p>
          <Button 
            onClick={handleButtonClick}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl"
          >
            <Upload className="h-5 w-5 mr-2" />
            Bild auswählen
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="relative">
                <Card className="overflow-hidden rounded-2xl shadow-lg">
                  <CardContent className="p-0">
                    <img  src={image} alt="Hochgeladene Vorschau" className="w-full h-auto object-cover aspect-square" src="https://images.unsplash.com/photo-1616521409990-f2afa047be1a" />
                  </CardContent>
                </Card>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleReset}
                  className="absolute -top-3 -right-3 rounded-full shadow-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-6">
                {isConverting && (
                   <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <Wand2 className="h-6 w-6 text-purple-600 animate-pulse" />
                       <h3 className="font-playful text-xl font-bold text-gray-800">Magie passiert...</h3>
                    </div>
                     <p className="text-gray-600">Deine Vorlage wird erstellt. Bitte habe einen Moment Geduld.</p>
                     <Progress value={progress} className="w-full" />
                   </div>
                )}
                
                <AnimatePresence>
                {coloringPage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                  <Tabs defaultValue="download" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-purple-100 rounded-xl">
                      <TabsTrigger value="download" className="rounded-lg data-[state=active]:bg-white">
                        <Download className="h-4 w-4 mr-2" /> Download
                      </TabsTrigger>
                      <TabsTrigger value="order" className="rounded-lg data-[state=active]:bg-white">
                        <ShoppingBag className="h-4 w-4 mr-2" /> Produkte
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="download" className="mt-6">
                      <Card className="glass-card rounded-2xl">
                        <CardContent className="p-6 text-center">
                           <h3 className="font-playful text-xl font-bold text-gray-800 mb-4">Dein Ausmalbild ist fertig!</h3>
                           <div className="mb-6 rounded-lg overflow-hidden border-2 border-purple-100">
                             <img  src={coloringPage} alt="Fertiges Ausmalbild" className="w-full h-auto" src="https://images.unsplash.com/photo-1594729503034-7b598a6c041a" />
                           </div>
                           <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <Button onClick={handleActionClick} className="w-full">
                               <Download className="h-4 w-4 mr-2" /> PNG
                             </Button>
                             <Button onClick={handleActionClick} className="w-full">
                               <Printer className="h-4 w-4 mr-2" /> PDF
                             </Button>
                           </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="order" className="mt-6">
                      <div className="space-y-4">
                        <h3 className="font-playful text-xl font-bold text-gray-800 text-center">Bestelle dein Kunstwerk</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {products.map((product) => (
                             <Card key={product.name} className="glass-card rounded-2xl hover:shadow-lg transition-shadow">
                               <CardContent className="p-4 flex flex-col items-center text-center">
                                 <div className="w-full h-24 mb-4 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <img  className="w-full h-full object-contain" alt={`Produktbild von ${product.name}`} src="https://images.unsplash.com/photo-1695561115495-23adc519079d" />
                                 </div>
                                 <h4 className="font-bold text-sm mb-1">{product.name}</h4>
                                 <p className="text-xs text-gray-600 mb-3 h-8">{product.description}</p>
                                 <Button variant="secondary" size="sm" disabled className="w-full text-xs">
                                   Bald verfügbar
                                 </Button>
                               </CardContent>
                             </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                  </Tabs>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;