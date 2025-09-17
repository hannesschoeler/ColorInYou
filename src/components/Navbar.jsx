import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogIn, GalleryHorizontal, Palette, Bot, Sparkles, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const navLinks = [
  { href: "/", label: "Start" },
  { href: "/erstellen", label: "Erstellen", icon: Sparkles },
  { href: "/galerie", label: "Galerie", icon: GalleryHorizontal },
  { href: "/preise", label: "Preise" },
  { href: "/faq", label: "FAQ" },
];

const mobileMenuVariants = {
  closed: { opacity: 0, y: "-100%" },
  open: { opacity: 1, y: "0%" },
};

const linkVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.3,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary font-bold' : 'text-foreground/80'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              user ? (
                <Button asChild variant="ghost" className="rounded-full">
                  <Link to="/account">
                    <User className="mr-2 h-4 w-4" /> Account
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" /> Anmelden
                  </Link>
                </Button>
              )
            )}
            <Button asChild className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Link to="/erstellen">Jetzt Gestalten</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Button onClick={toggleMenu} variant="ghost" size="icon" aria-label="Menü öffnen">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-background/95 md:hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-5">
              <div className="flex items-center justify-between">
                <Link to="/">
                  <Logo />
                </Link>
                <Button onClick={toggleMenu} variant="ghost" size="icon" aria-label="Menü schließen">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} custom={i} initial="hidden" animate="visible" variants={linkVariants}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent/50'}`
                      }
                    >
                      {link.icon && <link.icon className="h-5 w-5" />}
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div custom={navLinks.length} initial="hidden" animate="visible" variants={linkVariants}>
                  {!loading && (
                    user ? (
                      <NavLink to="/account" className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent/50'}`}>
                        <User className="h-5 w-5" /> Account
                      </NavLink>
                    ) : (
                      <NavLink to="/login" className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent/50'}`}>
                        <LogIn className="h-5 w-5" /> Anmelden
                      </NavLink>
                    )
                  )}
                </motion.div>
                <motion.div custom={navLinks.length + 1} initial="hidden" animate="visible" variants={linkVariants} className="pt-4">
                  <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <Link to="/erstellen">
                      Jetzt Gestalten
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;