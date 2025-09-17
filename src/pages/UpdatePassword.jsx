import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // If user is already fully logged in and tries to access this page, redirect them.
    // This page should only be accessible via the magic link.
    if(session && session.user.user_metadata.full_name) {
        navigate('/account');
    }
  }, [session, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Passwort konnte nicht aktualisiert werden. ' + error.message
      });
    } else {
      toast({
        title: 'Erfolg!',
        description: 'Dein Passwort wurde erfolgreich geändert. Du wirst nun weitergeleitet.'
      });
      setTimeout(() => navigate('/account'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <Logo className="h-12 w-auto mx-auto mb-4" />
          <h1 className="font-playful text-3xl font-bold text-gray-800">Neues Passwort festlegen</h1>
          <p className="text-gray-600">Bitte wähle ein neues, sicheres Passwort für dein Konto.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Neues Passwort</Label>
            <Input
              type="password"
              id="password"
              placeholder="Mindestens 6 Zeichen"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold">
            {loading ? 'Aktualisiere...' : 'Passwort speichern'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;