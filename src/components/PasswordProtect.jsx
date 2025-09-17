import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';

const PasswordProtect = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'hannes2502') {
      setError('');
      onUnlock();
    } else {
      setError('Falsches Passwort. Bitte versuche es erneut.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl p-8 text-center"
      >
        <div className="mx-auto mb-6">
          <Logo className="h-12 w-auto mx-auto" />
        </div>
        <h1 className="font-playful text-2xl md:text-3xl font-bold mb-3 text-gray-800">
          Diese Seite ist im Aufbau
        </h1>
        <p className="text-gray-600 mb-8">
          Bitte gib das Passwort ein, um die Vorschau anzuzeigen.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              className="pl-10 h-12 text-lg"
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Website entsperren
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default PasswordProtect;