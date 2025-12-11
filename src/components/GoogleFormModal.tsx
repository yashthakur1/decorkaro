import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GoogleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleFormModal: React.FC<GoogleFormModalProps> = ({ isOpen, onClose }) => {
  // Direct embed URL from the provided iframe
  const googleFormEmbedUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfFXYQK3TtReir5CIpJ6WP9gTzJ6YjG_dxBdcrn0RZdUAAF5g/viewform?embedded=true';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-6 lg:inset-10 z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-3xl max-h-[95vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-yellow-50 to-slate-50 flex-shrink-0">
                <div>
                  <h2 className="font-title text-xl md:text-2xl font-bold text-slate-900">
                    Get Your Free Estimate
                  </h2>
                  <p className="text-sm text-slate-600 mt-1 font-secondary">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              {/* Form Container */}
              <div className="flex-1 overflow-auto">
                <iframe
                  src={googleFormEmbedUrl}
                  width="100%"
                  height="2252"
                  frameBorder={0}
                  marginHeight={0}
                  marginWidth={0}
                  title="Get Free Estimate Form"
                  className="w-full min-h-full"
                  style={{ minHeight: '2252px' }}
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GoogleFormModal;
