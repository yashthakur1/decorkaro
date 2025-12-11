import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GoogleFormModal from '../GoogleFormModal';

type FloorplanType = '1 BHK' | '2 BHK' | '3 BHK' | '3+ BHK' | null;
type PurposeType = 'Move In' | 'Rent Out' | 'Renovate' | null;
type PropertyType = 'Residential' | 'Commercial' | null;
type BudgetType = '5-10 Lakhs' | '10-20 Lakhs' | '20-50 Lakhs' | '50+ Lakhs' | null;

const RequirementsSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFloorplan, setSelectedFloorplan] = useState<FloorplanType>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<PurposeType>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetType>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const totalSteps = 3;

  const floorplanOptions: FloorplanType[] = ['1 BHK', '2 BHK', '3 BHK', '3+ BHK'];
  const purposeOptions: PurposeType[] = ['Move In', 'Rent Out', 'Renovate'];
  const propertyTypeOptions: PropertyType[] = ['Residential', 'Commercial'];
  const budgetOptions: BudgetType[] = ['5-10 Lakhs', '10-20 Lakhs', '20-50 Lakhs', '50+ Lakhs'];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetEstimate = () => {
    setIsFormModalOpen(true);
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return selectedFloorplan !== null && selectedPurpose !== null;
      case 2:
        return selectedPropertyType !== null;
      case 3:
        return selectedBudget !== null;
      default:
        return false;
    }
  };

  const SelectionButton: React.FC<{
    label: string;
    isSelected: boolean;
    onClick: () => void;
  }> = ({ label, isSelected, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-3 rounded-lg border-2 font-semibold font-secondary transition-all duration-200 text-sm ${
        isSelected
          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
          : 'border-slate-300 bg-white text-slate-700 hover:border-yellow-400 hover:bg-yellow-50/50'
      }`}
    >
      {label}
    </motion.button>
  );

  return (
    <section id="quote" className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-xl"
          >
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-title text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                Personalized Interior Design
              </h2>
              <h3 className="font-title text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Quote in 30 Seconds
              </h3>
              <p className="font-secondary text-slate-600">
                <span className="text-slate-400">STEP </span>
                <span className="text-yellow-500 font-bold">{currentStep}</span>
                <span className="text-slate-400"> OF {totalSteps}</span>
              </p>
            </div>

            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Floorplan Selection */}
                  <div>
                    <h4 className="font-title text-lg font-bold text-slate-900 mb-4">
                      Your Floorplan
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {floorplanOptions.map((option) => (
                        <SelectionButton
                          key={option}
                          label={option!}
                          isSelected={selectedFloorplan === option}
                          onClick={() => setSelectedFloorplan(option)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Purpose Selection */}
                  <div>
                    <h4 className="font-title text-lg font-bold text-slate-900 mb-4">
                      Purpose
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {purposeOptions.map((option) => (
                        <SelectionButton
                          key={option}
                          label={option!}
                          isSelected={selectedPurpose === option}
                          onClick={() => setSelectedPurpose(option)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Property Type Selection */}
                  <div>
                    <h4 className="font-title text-lg font-bold text-slate-900 mb-4">
                      Property Type
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {propertyTypeOptions.map((option) => (
                        <SelectionButton
                          key={option}
                          label={option!}
                          isSelected={selectedPropertyType === option}
                          onClick={() => setSelectedPropertyType(option)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-2 font-secondary">Your Selection:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFloorplan && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium font-secondary">
                          {selectedFloorplan}
                        </span>
                      )}
                      {selectedPurpose && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium font-secondary">
                          {selectedPurpose}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Budget Selection */}
                  <div>
                    <h4 className="font-title text-lg font-bold text-slate-900 mb-4">
                      Your Budget
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {budgetOptions.map((option) => (
                        <SelectionButton
                          key={option}
                          label={option!}
                          isSelected={selectedBudget === option}
                          onClick={() => setSelectedBudget(option)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-2 font-secondary">Your Selection:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFloorplan && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium font-secondary">
                          {selectedFloorplan}
                        </span>
                      )}
                      {selectedPurpose && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium font-secondary">
                          {selectedPurpose}
                        </span>
                      )}
                      {selectedPropertyType && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium font-secondary">
                          {selectedPropertyType}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-3">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 py-3 px-6 border-2 border-slate-300 text-slate-700 font-semibold font-secondary rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Previous
                </button>
              )}

              {currentStep < totalSteps ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={!isStepComplete()}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold font-secondary transition-all duration-200 flex items-center justify-center gap-2 ${
                    isStepComplete()
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGetEstimate}
                  disabled={!isStepComplete()}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold font-secondary transition-all duration-200 flex items-center justify-center gap-3 ${
                    isStepComplete()
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Get Free Estimate
                  <span className="text-xs bg-slate-900/10 px-2 py-0.5 rounded font-bold">FREE</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>

            {/* Step Indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    step === currentStep
                      ? 'bg-yellow-500 w-8'
                      : step < currentStep
                      ? 'bg-yellow-300 w-2'
                      : 'bg-slate-300 w-2'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Google Form Modal */}
      <GoogleFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />
    </section>
  );
};

export default RequirementsSection;
