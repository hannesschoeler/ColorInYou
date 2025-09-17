import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPasswordForEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await resetPasswordForEmail(email);
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
          <h1 className="font-playful text-3xl font-bold text-gray-800">Passwort vergessen?</h1>
          <p className="text-gray-600">Kein Problem! Gib deine E-Mail ein und wir senden dir einen Link zum Zurücksetzen.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              type="email"
              id="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold">
            {loading ? 'Sende...' : 'Link zum Zurücksetzen senden'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/login" className="font-medium text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Zurück zum Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;