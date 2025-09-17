import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductByHandle } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Loader2, ArrowLeft, XCircle, Minus, Plus } from 'lucide-react';

const ProductDetailPage = () => {
    const { handle } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { toast } = useToast();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const fetchedProduct = await getProductByHandle(handle);
                if (!fetchedProduct) {
                    throw new Error("Produkt nicht gefunden.");
                }
                setProduct(fetchedProduct);
                if (fetchedProduct.variants.edges.length > 0) {
                    setSelectedVariant(fetchedProduct.variants.edges[0].node);
                }
            } catch (e) {
                setError(e.message || "Fehler beim Laden des Produkts.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [handle]);

    const handleAddToCart = useCallback(async () => {
        if (!selectedVariant) {
            toast({
                variant: "destructive",
                title: "Bitte wähle eine Variante.",
            });
            return;
        }
        try {
            await addToCart(selectedVariant.id, quantity);
            toast({
                title: "Produkt hinzugefügt! 🛒",
                description: `${quantity} x ${product.title} wurde hinzugefügt.`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Hoppla! Etwas ist schiefgegangen.",
                description: error.message,
            });
        }
    }, [product, selectedVariant, quantity, addToCart, toast]);
    
    const handleQuantityChange = useCallback((amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center text-destructive p-8 glass-card rounded-2xl max-w-lg mx-auto">
                    <XCircle className="mx-auto h-16 w-16 mb-4" />
                    <p className="mb-6 text-lg">{error || "Produkt nicht gefunden."}</p>
                    <Button asChild>
                        <Link to="/shop">
                            <ArrowLeft size={16} className="mr-2" />
                            Zurück zum Shop
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const price = selectedVariant?.price;
    const mainImage = product.images.edges[0]?.node;

    return (
        <>
            <Helmet>
                <title>{product.title} | ColorInYou</title>
                <meta name="description" content={product.descriptionHtml?.substring(0, 160).replace(/<[^>]+>/g, '') || product.title} />
            </Helmet>
            <div className="container mx-auto px-4 py-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="mb-8">
                        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft size={16} />
                            Zurück zum Shop
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 glass-card p-8 rounded-2xl">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                            <div className="aspect-square bg-card-foreground/10 rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src={mainImage?.url || '/placeholder.png'}
                                    alt={mainImage?.altText || product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
                            <h1 className="text-3xl lg:text-4xl font-bold font-playful mb-3 gradient-text">{product.title}</h1>
                            
                            {price && (
                                <p className="text-3xl font-bold text-white mb-6">
                                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: price.currencyCode }).format(price.amount)}
                                </p>
                            )}

                            <div className="prose prose-invert text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

                            {product.variants.edges.length > 1 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-white mb-2">Variante</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.edges.map(({ node: variant }) => (
                                            <Button
                                                key={variant.id}
                                                variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`transition-all ${selectedVariant?.id === variant.id ? 'bg-purple-500 border-purple-500' : 'border-white/20 text-white hover:bg-white/10'}`}
                                            >
                                                {variant.title}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                <p className="text-sm font-medium text-white">Menge</p>
                                <div className="flex items-center border border-white/20 rounded-full p-1">
                                    <Button onClick={() => handleQuantityChange(-1)} variant="ghost" size="icon" className="rounded-full h-8 w-8 text-white hover:bg-white/10"><Minus size={16} /></Button>
                                    <span className="w-10 text-center text-white font-bold">{quantity}</span>
                                    <Button onClick={() => handleQuantityChange(1)} variant="ghost" size="icon" className="rounded-full h-8 w-8 text-white hover:bg-white/10"><Plus size={16} /></Button>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <Button onClick={handleAddToCart} size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                    <ShoppingCart className="mr-2 h-5 w-5" /> In den Warenkorb
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default ProductDetailPage;