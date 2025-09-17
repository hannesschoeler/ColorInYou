import React from 'react';
import { Wrench } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Logo from '@/components/Logo';

const MaintenancePage = () => {
  return (
    <>
      <Helmet>
        <title>Wartungsarbeiten - ColorInYou</title>
        <meta name="description" content="Wir sind bald wieder für dich da!" />
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-center p-4">
        <Logo className="h-20 w-auto mb-8" />
        <Wrench className="w-16 h-16 text-blue-500 mb-6 animate-bounce" />
        <h1 className="font-playful text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Wir sind bald wieder da!
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Wir führen gerade einige geplante Wartungsarbeiten durch, um ColorInYou für dich noch besser zu machen. Bitte schau in Kürze wieder vorbei.
        </p>
      </div>
    </>
  );
};

export default MaintenancePage;