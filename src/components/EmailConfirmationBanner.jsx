import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailWarning, X } from 'lucide-react';

const EmailConfirmationBanner = ({ show, onDismiss }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-yellow-400 text-yellow-900 text-sm font-medium p-3 flex items-center justify-center relative z-50"
        >
          <MailWarning className="h-5 w-5 mr-3 flex-shrink-0" />
          <span>
            Bitte bestätige deine E-Mail-Adresse, um dein Konto vollständig zu aktivieren. Überprüfe dein Postfach.
          </span>
          <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-yellow-500/50 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailConfirmationBanner;