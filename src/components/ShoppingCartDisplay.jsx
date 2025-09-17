import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Trash2, Loader2, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const ShoppingCartDisplay = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, clearCart, isUpdating, checkout, isLoading } = useCart();

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };
  
  const totalAmount = cart?.cost?.totalAmount.amount || '0.0';
  const currencyCode = cart?.cost?.totalAmount.currencyCode || 'EUR';
  const cartLines = cart?.lines?.edges || [];

  const getCustomAttribute = (attributes, key) => {
    const attribute = attributes.find(attr => attr.key === key);
    return attribute ? attribute.value : null;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-playful font-bold gradient-text">Warenkorb</h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon">
                <X />
              </Button>
            </div>
            
            <ScrollArea className="flex-grow">
                <div className="p-6">
                  {isLoading ? (
                     <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
                        <p className="mt-4">Warenkorb wird geladen...</p>
                     </div>
                  ) : cartLines.length === 0 ? (
                    <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center py-20">
                      <ShoppingCartIcon size={48} className="mb-4 text-gray-300" />
                      <p className="font-semibold">Dein Warenkorb ist leer.</p>
                      <p className="text-sm">Füge Produkte hinzu, um sie hier zu sehen.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartLines.map(({ node: line }) => {
                        const mockupImage = getCustomAttribute(line.attributes, '_mockupImage');
                        const productName = getCustomAttribute(line.attributes, '_productName') || line.merchandise.product.title;
                        
                        return (
                          <div key={line.id} className="flex items-start gap-4 p-3 border rounded-lg relative">
                             {isUpdating === line.id && <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg"><Loader2 className="animate-spin" /></div>}
                            <img src={mockupImage || line.merchandise.image?.url || '/placeholder.png'} alt={productName} className="w-24 h-24 object-cover rounded-md bg-gray-100" />
                            <div className="flex-grow">
                              <h3 className="font-semibold text-gray-800">{productName}</h3>
                              <p className="text-sm text-gray-500">{line.quantity} x Personalisiert</p>
                              <p className="font-bold text-lg text-purple-600 mt-1">
                                  {new Intl.NumberFormat('de-DE', { style: 'currency', currency: line.merchandise.price.currencyCode }).format(line.merchandise.price.amount)}
                              </p>
                            </div>
                            <Button onClick={() => removeFromCart(line.id)} size="icon" variant="ghost" className="text-gray-400 hover:text-red-500 w-8 h-8">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
            </ScrollArea>
            
            {cartLines.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                 <div className="flex justify-between items-center mb-4 text-gray-800">
                  <span className="text-lg font-medium">Gesamt</span>
                  <span className="text-2xl font-bold">
                     {new Intl.NumberFormat('de-DE', { style: 'currency', currency: currencyCode }).format(totalAmount)}
                  </span>
                </div>
                <Button onClick={handleCheckout} size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-base" disabled={isUpdating || !cart?.checkoutUrl}>
                   {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><CreditCard className="mr-2 h-4 w-4" /> Zur Kasse</>}
                </Button>
                <Button onClick={clearCart} variant="link" className="w-full mt-2 text-gray-500" disabled={!!isUpdating}>
                    Warenkorb leeren
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCartDisplay;