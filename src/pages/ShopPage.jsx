import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProducts } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product, index }) => {
    const { toast } = useToast();
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const imageUrl = product.images.edges[0]?.node.url;
    const variantId = product.variants.edges[0]?.node.id;

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!variantId) {
            toast({
                variant: "destructive",
                title: "Produkt nicht verfügbar",
                description: "Dieses Produkt hat keine auswählbare Variante.",
            });
            return;
        }

        setIsAdding(true);
        try {
            await addToCart(variantId, 1);
            toast({
                title: "Produkt hinzugefügt!",
                description: `${product.title} wurde zum Warenkorb hinzugefügt.`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Fehler",
                description: "Produkt konnte nicht zum Warenkorb hinzugefügt werden.",
            });
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group"
        >
            <Link to={`/product/${product.handle}`} className="block">
                <div className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 glass-card border-none">
                    <div className="aspect-square overflow-hidden">
                        <img
                            src={imageUrl || '/placeholder.png'}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-bold truncate text-white">{product.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xl font-semibold gradient-text">
                                {new Intl.NumberFormat('de-DE', { style: 'currency', currency: product.priceRange.minVariantPrice.currencyCode }).format(product.priceRange.minVariantPrice.amount)}
                            </p>
                            <Button onClick={handleAddToCart} size="sm" disabled={isAdding}>
                                {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};


const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (e) {
                setError('Die Produkte konnten nicht geladen werden.');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Helmet>
                <title>Shop | ColorInYou</title>
                <meta name="description" content="Entdecke einzigartige, personalisierbare Produkte in unserem Shop." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-playful tracking-tight mb-4">
                        <span className="gradient-text">Unser Shop</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                        Stöbere durch unsere Kollektion und finde dein nächstes Lieblingsstück.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loader" exit={{ opacity: 0 }} className="flex justify-center items-center h-64">
                            <Loader2 className="h-16 w-16 text-primary animate-spin" />
                        </motion.div>
                    ) : error ? (
                        <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-destructive p-8 glass-card rounded-2xl">
                            <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                            <p className="text-lg">{error}</p>
                        </motion.div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {products.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    ) : (
                         <motion.div key="no-products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-muted-foreground p-8 glass-card rounded-2xl">
                             <ShoppingBag className="mx-auto h-12 w-12 mb-4" />
                             <p className="text-lg">Im Moment sind keine Produkte verfügbar. Schau bald wieder vorbei!</p>
                         </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default ShopPage;