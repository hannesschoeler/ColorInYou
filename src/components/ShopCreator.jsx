import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import { Upload, FileImage, Wand2, ShoppingBag, CheckCircle, Loader2, GripVertical, Trash2, AlertCircle, RefreshCw, ServerCrash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { getProducts } from '@/lib/shopify';

const STEPS = {
  UPLOAD: 1,
  MANAGE: 2,
  CONVERTING: 3,
  SELECT_ART: 4,
};

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} className="relative">
      <div {...listeners} className="absolute top-1 left-1 z-10 p-1 cursor-grab bg-black/20 rounded-full text-white">
        <GripVertical size={16} />
      </div>
      {children}
    </div>
  );
};

const ShopCreator = () => {
  const [step, setStep] = useState(STEPS.UPLOAD);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selectedArt, setSelectedArt] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mockupImage, setMockupImage] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [shopifyProducts, setShopifyProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const { toast } = useToast();
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const products = await getProducts();
      setShopifyProducts(products);
      if (products.length === 0) {
        setProductsError("Shopify-Produkte sind derzeit deaktiviert.");
      }
    } catch (err) {
      setProductsError("Produkte konnten nicht geladen werden.");
      console.error(err);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
    setStep(STEPS.MANAGE);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.heic'] },
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setUploadedImages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(image => image.id !== id));
  };
  
  const handleStartConversion = () => {
    setStep(STEPS.CONVERTING);
    setProgress(0);
  
    const totalImages = uploadedImages.length;
    let imagesProcessed = 0;
  
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 100 / (totalImages * 2); 
        if (newProgress >= (imagesProcessed + 1) * (100 / totalImages)) {
          imagesProcessed++;
        }
        return newProgress;
      });
    }, 200);
  
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setProcessedImages(uploadedImages.map(img => ({ ...img, processedUrl: img.preview })));
      setTimeout(() => setStep(STEPS.SELECT_ART), 500);
    }, totalImages * 2000 + 500);
  };

  const handleArtSelection = (art) => {
    if (!selectedProduct) {
      toast({ variant: "destructive", title: "Bitte wähle zuerst ein Produkt." });
      return;
    }

    const isSelected = selectedArt.some(item => item.id === art.id);
    const multiSelect = selectedProduct.title.toLowerCase().includes('buch');
    
    if (multiSelect) {
      if (isSelected) {
        setSelectedArt(prev => prev.filter(item => item.id !== art.id));
      } else {
        setSelectedArt(prev => [...prev, art]);
      }
    } else {
      if (isSelected) {
        setSelectedArt([]);
      } else {
        setSelectedArt([art]);
      }
    }
  };

  useEffect(() => {
    if (selectedProduct) {
        const multiSelect = selectedProduct.title.toLowerCase().includes('buch');
        if (!multiSelect && selectedArt.length > 1) {
            setSelectedArt(prev => [prev[0]]);
        }
    }
  }, [selectedProduct, selectedArt]);

  useEffect(() => {
    let timer;
    if (selectedProduct && selectedArt.length > 0) {
      setMockupImage(null);
      timer = setTimeout(() => {
        setMockupImage(selectedProduct.images.edges[0]?.node.url || '/placeholder.png');
      }, 500);
    } else {
      setMockupImage(null);
    }
    return () => clearTimeout(timer);
  }, [selectedProduct, selectedArt]);
  
  const resetProductSelection = () => {
    setSelectedArt([]);
    setSelectedProduct(null);
    setMockupImage(null);
  };

  const handleAddToCart = async () => {
    if (!selectedProduct || selectedArt.length === 0) return;
    
    const multiSelect = selectedProduct.title.toLowerCase().includes('buch');
    const minItems = multiSelect ? 5 : 1;

    if (multiSelect && selectedArt.length < minItems) {
        toast({ variant: "destructive", title: `Mindestens ${minItems} Bilder erforderlich.` });
        return;
    }

    setIsAddingToCart(true);

    try {
        const customAttributes = selectedArt.map((art, index) => ({
            key: `Image ${index + 1}`,
            value: art.processedUrl
        }));
        
        customAttributes.push({ key: '_mockupImage', value: mockupImage || '' });
        customAttributes.push({ key: '_productType', value: 'Custom' });

        const variantId = selectedProduct.variants.edges[0]?.node.id;
        if (!variantId) throw new Error("Produktvariante nicht gefunden.");

        await addToCart(variantId, 1, customAttributes);
        
        toast({ title: "Produkt hinzugefügt!", description: `${selectedProduct.title} wurde zum Warenkorb hinzugefügt.` });
        resetProductSelection();

    } catch (error) {
        console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
        toast({
            variant: "destructive",
            title: "Fehler",
            description: "Produkt konnte nicht zum Warenkorb hinzugefügt werden. " + error.message,
        });
    } finally {
        setIsAddingToCart(false);
    }
  };


  const handleFullReset = () => {
    setStep(STEPS.UPLOAD);
    setUploadedImages([]);
    setProcessedImages([]);
    resetProductSelection();
  };

  const isAddToCartDisabled = useMemo(() => {
    if (isAddingToCart || !selectedProduct || selectedArt.length === 0) return true;
    const multiSelect = selectedProduct.title.toLowerCase().includes('buch');
    const minItems = multiSelect ? 5 : 1;
    if (multiSelect && selectedArt.length < minItems) return true;
    return false;
  }, [isAddingToCart, selectedProduct, selectedArt]);

  return (
    <div className="w-full p-4 md:p-6 rounded-3xl glass-card border-none shadow-2xl">
      <AnimatePresence mode="wait">
        {step === STEPS.UPLOAD && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-lg mx-auto">
            <Card {...getRootProps()} className={cn("border-2 border-dashed border-purple-200 rounded-3xl bg-purple-50/50 text-center cursor-pointer hover:border-purple-400 transition-all", isDragActive && "border-purple-400 bg-purple-100/50")}>
              <CardContent className="p-8 flex flex-col items-center justify-center">
                <input {...getInputProps()} />
                <div className="w-20 h-20 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"><Upload className="h-10 w-10 text-white" /></div>
                <h2 className="font-playful text-2xl font-bold mb-2 text-gray-800">{isDragActive ? "Hier ablegen!" : "Lade deine Fotos hoch"}</h2>
                <p className="text-gray-600 mb-6 max-w-md">Wähle JPG, PNG oder HEIC Bilder aus, um die Magie zu starten.</p>
                <Button type="button" size="lg" className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl shadow-md border border-purple-200"><FileImage className="h-5 w-5 mr-2" />Bilder auswählen</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === STEPS.MANAGE && (
          <motion.div key="manage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-8">
              <h2 className="font-playful text-3xl font-bold text-gray-800">Deine Bildergalerie</h2>
              <p className="text-lg text-gray-600">Sortiere deine Bilder oder füge weitere hinzu.</p>
            </div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={uploadedImages.map(i => i.id)} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {uploadedImages.map(image => (
                    <SortableItem key={image.id} id={image.id}>
                      <Card className="overflow-hidden group">
                        <CardContent className="p-0 relative">
                          <img src={image.preview} alt="Vorschau" className="aspect-square object-cover" />
                          <Button onClick={() => removeImage(image.id)} variant="destructive" size="icon" className="absolute top-1 right-1 z-10 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></Button>
                        </CardContent>
                      </Card>
                    </SortableItem>
                  ))}
                  <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center aspect-square cursor-pointer hover:border-purple-400 transition-colors">
                    <input {...getInputProps()} />
                    <div className="text-center text-gray-500"><Upload size={32} className="mx-auto mb-2" /><p className="text-sm">Weitere hinzufügen</p></div>
                  </div>
                </div>
              </SortableContext>
            </DndContext>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={handleFullReset}>Abbrechen</Button>
              <Button onClick={handleStartConversion} disabled={uploadedImages.length === 0} size="lg">
                <Wand2 className="mr-2" /> {uploadedImages.length} Bilder umwandeln
              </Button>
            </div>
          </motion.div>
        )}

        {step === STEPS.CONVERTING && (
          <motion.div key="converting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4"><Wand2 className="h-8 w-8 text-purple-600 animate-pulse" /><h3 className="font-playful text-2xl font-bold text-gray-800">Magie passiert...</h3></div>
            <p className="text-gray-600 mb-6">Deine Vorlagen werden erstellt. Bitte habe einen Moment Geduld.</p>
            <Progress value={progress} className="w-full" />
          </motion.div>
        )}

        {step === STEPS.SELECT_ART && (
          <motion.div key="select_art" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-8">
              <h2 className="font-playful text-3xl font-bold text-gray-800">Wähle dein Kunstwerk</h2>
              <p className="text-lg text-gray-600">Wähle ein Produkt und dann die Bilder, die du verwenden möchtest.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="font-semibold mb-4 text-center text-lg text-gray-700">1. Wähle deine Kunstwerke aus</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {processedImages.map(art => (
                    <Card key={art.id} onClick={() => handleArtSelection(art)} className={cn("cursor-pointer transition-all", selectedArt.some(i => i.id === art.id) && "ring-2 ring-purple-500")}>
                      <CardContent className="p-0 relative">
                        <img alt="Verarbeitetes Ausmalbild" className="aspect-square object-cover rounded-lg" src={art.processedUrl} />
                        {selectedArt.some(i => i.id === art.id) && <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"><CheckCircle className="text-white" size={32} /></div>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1">
                <h3 className="font-semibold mb-4 text-center text-lg text-gray-700">2. Wähle ein Produkt</h3>
                {productsLoading ? <div className="flex justify-center items-center h-48"><Loader2 className="w-8 h-8 animate-spin text-purple-500" /></div> :
                 productsError ? <div className="text-center text-yellow-600 p-4 bg-yellow-100 rounded-lg"><ServerCrash className="mx-auto mb-2" />{productsError}</div> :
                <div className="space-y-4">
                  {shopifyProducts.map(product => (
                    <Card key={product.id} onClick={() => { setSelectedProduct(product); setSelectedArt([]); }} className={cn("cursor-pointer transition-all", selectedProduct?.id === product.id && "ring-2 ring-purple-500")}>
                      <CardContent className="p-3 flex items-center gap-4">
                        <img src={product.images.edges[0]?.node.url || '/placeholder.png'} alt={product.title} className="w-12 h-12 object-cover rounded-md bg-gray-100" />
                        <div>
                          <h4 className="font-bold text-gray-800">{product.title}</h4>
                          <p className="text-sm text-purple-600 font-semibold">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: product.priceRange.minVariantPrice.currencyCode }).format(product.priceRange.minVariantPrice.amount)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                }
                <AnimatePresence>
                  {selectedProduct && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                      <Card className="bg-white shadow-xl rounded-2xl">
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2">{selectedProduct.title} Vorschau</h3>
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            {mockupImage ? <img src={mockupImage} alt={`Mockup von ${selectedProduct.title}`} className="w-full h-full object-contain" /> : <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />}
                          </div>
                          {selectedProduct.title.toLowerCase().includes('buch') && (
                            <div className={cn("text-sm p-2 rounded-md mb-2 flex items-center gap-2", selectedArt.length >= 5 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800")}>
                              <AlertCircle size={16} />
                              <span>{selectedArt.length} / 5 Bilder ausgewählt</span>
                            </div>
                          )}
                          <p className="text-2xl font-bold gradient-text mb-4">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: selectedProduct.priceRange.minVariantPrice.currencyCode }).format(selectedProduct.priceRange.minVariantPrice.amount)}</p>
                          <Button onClick={handleAddToCart} className="w-full" disabled={isAddToCartDisabled}>
                            {isAddingToCart ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> wird hinzugefügt</> : <><ShoppingBag className="mr-2 h-4 w-4" /> In den Warenkorb</>}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" onClick={handleFullReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Von vorne beginnen
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopCreator;