import React from 'react';
import type { Language } from '../i18n';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  return (
    <div className="flex items-center space-x-2 p-2 rounded-full bg-black/30">
      <span className={`text-lg font-bold tracking-wider ${language === 'it' ? 'text-amber-300' : 'text-gray-400'}`}>IT</span>
      <button
        type="button"
        onClick={toggleLanguage}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${language === 'en' ? 'bg-amber-600' : 'bg-gray-700'}`}
        role="switch"
        aria-checked={language === 'en'}
        aria-label="Switch language"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${language === 'en' ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
      <span className={`text-lg font-bold tracking-wider ${language === 'en' ? 'text-amber-300' : 'text-gray-400'}`}>EN</span>
    </div>
  );
};

export default LanguageSwitcher;