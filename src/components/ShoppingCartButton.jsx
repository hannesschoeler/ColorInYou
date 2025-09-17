import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import ShoppingCartDisplay from './ShoppingCartDisplay';

const ShoppingCartButton = () => {
    const { cart, isLoading, setIsCartOpen } = useCart();
    const totalItems = cart?.lines?.edges?.length || 0;

    return (
        <>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-6 right-6 z-40"
            >
                <Button 
                    onClick={() => setIsCartOpen(true)}
                    size="lg"
                    className="rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white h-16 w-16 relative flex items-center justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="h-7 w-7 animate-spin" /> : <ShoppingCartIcon className="h-7 w-7" />}
                    {!isLoading && totalItems > 0 && (
                        <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
                        >
                            {totalItems}
                        </motion.span>
                    )}
                </Button>
            </motion.div>
            <ShoppingCartDisplay />
        </>
    );
};

export default ShoppingCartButton;