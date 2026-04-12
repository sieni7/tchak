import React, { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import { fetchGenerateZip } from './api/generateZip';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    artType: 'Peinture',
    bio: '',
    signature: null
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleComplete = async () => {
    setIsGenerating(true);
    try {
      const zipBlob = await fetchGenerateZip(formData);
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'TCHAK-FREE-ArtistApp.zip');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('ZIP generation failed:', error);
      alert('Erreur lors de la génération du ZIP. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1: return <Step1 data={formData} update={setFormData} next={nextStep} />;
      case 2: return <Step2 data={formData} update={setFormData} next={nextStep} prev={prevStep} />;
      case 3: return <Step3 data={formData} update={setFormData} next={nextStep} prev={prevStep} />;
      case 4: return <Step4 data={formData} update={setFormData} next={nextStep} prev={prevStep} />;
      case 5: return <Step5 data={formData} onComplete={handleComplete} prev={prevStep} isGenerating={isGenerating} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-10 px-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= i ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-500'}`}>
              {i}
            </div>
            {i < 5 && <div className={`w-12 h-0.5 mx-2 ${step > i ? 'bg-indigo-500' : 'bg-slate-700'}`} />}
          </div>
        ))}
      </div>
      {renderStep()}
    </div>
  );
};

export default Onboarding;
