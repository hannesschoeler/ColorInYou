import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { Chrome } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (!error) {
      navigate(from, { replace: true });
    } else {
        setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
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
          <h1 className="font-playful text-3xl font-bold text-gray-800">Willkommen zurück!</h1>
          <p className="text-gray-600">Melde dich an, um deine Ausmalbilder zu sehen.</p>
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
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Passwort</Label>
            <Input
              type="password"
              id="password"
              placeholder="Dein sicheres Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
           <div className="text-right text-sm">
            <Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">
              Passwort vergessen?
            </Link>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold">
            {loading ? 'Melde an...' : 'Anmelden'}
          </Button>
        </form>
         <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Oder fahre fort mit
            </span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
          <Chrome className="mr-2 h-4 w-4" />
          Mit Google anmelden
        </Button>
        <p className="mt-6 text-center text-sm text-gray-600">
          Noch kein Konto?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:underline">
            Jetzt registrieren
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;