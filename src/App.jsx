import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Pricing from '@/pages/Pricing';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Impressum from '@/pages/Impressum';
import PasswordProtect from '@/components/PasswordProtect';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Account from '@/pages/Account';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import ForgotPassword from '@/pages/ForgotPassword';
import UpdatePassword from '@/pages/UpdatePassword';
import EmailConfirmationBanner from '@/components/EmailConfirmationBanner';
import { supabase } from '@/lib/supabaseClient';
import MaintenancePage from '@/pages/MaintenancePage';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUserManagement from '@/pages/admin/UserManagement';
import AdminSettings from '@/pages/admin/Settings';
import AdminRoute from '@/components/AdminRoute';
import CreatorPage from '@/pages/CreatorPage';
import { CartProvider } from '@/contexts/CartContext';
import ShoppingCartButton from '@/components/ShoppingCartButton';
import ShopifyTestPage from '@/pages/ShopifyTestPage';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const [showConfirmationBanner, setShowConfirmationBanner] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    const unlocked = sessionStorage.getItem('colorinyou_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
    }

    const checkMaintenanceMode = async () => {
      const { data } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'maintenance_mode')
        .single();
      if (data && data.value.enabled) {
        setMaintenanceMode(true);
      }
    };
    checkMaintenanceMode();
  }, []);

  useEffect(() => {
    const bannerDismissed = sessionStorage.getItem('email_banner_dismissed') === 'true';
    if (user && !user.email_confirmed_at && !bannerDismissed) {
      setShowConfirmationBanner(true);
    } else {
      setShowConfirmationBanner(false);
    }
  }, [user]);

  const handleUnlock = () => {
    sessionStorage.setItem('colorinyou_unlocked', 'true');
    setIsUnlocked(true);
  };

  const dismissConfirmationBanner = () => {
    sessionStorage.setItem('email_banner_dismissed', 'true');
    setShowConfirmationBanner(false);
  };

  const showPasswordProtect = !isUnlocked && !['/login', '/signup', '/account', '/forgot-password', '/update-password', '/erstellen', '/shopify-test'].includes(location.pathname) && !location.pathname.startsWith('/admin');

  if (maintenanceMode && !isAdmin) {
    return <MaintenancePage />;
  }
  
  const AppContent = () => (
    <>
      <EmailConfirmationBanner show={showConfirmationBanner} onDismiss={dismissConfirmationBanner} />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/erstellen" element={<CreatorPage />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/preise" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/datenschutz" element={<Privacy />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/shopify-test" element={<ShopifyTestPage />} />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <ShoppingCartButton />
      <Toaster />
    </>
  );

  if (location.pathname.startsWith('/admin')) {
    return (
      <AdminRoute>
        <CartProvider>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUserManagement />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
          <Toaster />
        </CartProvider>
      </AdminRoute>
    )
  }

  if (showPasswordProtect) {
    return <PasswordProtect onUnlock={handleUnlock} />;
  }

  if (loading && isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="font-playful text-2xl gradient-text">Lade Magie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CartProvider>
        <AppContent />
      </CartProvider>
    </div>
  );
}

export default App;