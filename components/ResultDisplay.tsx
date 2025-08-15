
import React, { useState } from 'react';
import type { CalculationResult } from '../types';
import { publicFormatDate } from '../services/thelema';
import Icon from './Icon';
import type { translations } from '../i18n';

type TranslationKeys = typeof translations.it;

interface ResultDisplayProps {
  result: CalculationResult | null;
  error: string | null;
  isLoading: boolean;
  includeWeekday: boolean;
  translations: TranslationKeys;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error, isLoading, includeWeekday, translations: t }) => {
  const [isCopied, setIsCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center items-center h-48">
        <div className="w-10 h-10 bg-amber-400 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 text-center text-red-300 bg-red-900/40 border border-red-500/50 rounded-lg">
        <p className="font-bold font-cinzel text-lg">{t.resultErrorTitle}</p>
        <p className="mt-2 text-lg">{error}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const { thelemicYear, astrologicalData } = result;
  const formattedDate = publicFormatDate(result, includeWeekday);

  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(formattedDate).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="mt-8 p-6">
      <div className="relative flex justify-center items-center gap-3">
        <h2 className="text-center text-3xl sm:text-4xl font-cinzel text-amber-300 tracking-wider">
          {formattedDate}
        </h2>
        <button
          onClick={handleCopy}
          aria-label={isCopied ? t.copiedLabel : t.copyDateLabel}
          title={isCopied ? t.copiedLabel : t.copyDateLabel}
          className="p-2 rounded-full text-amber-400 hover:bg-amber-400/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black/40"
        >
          {isCopied ? (
            <Icon name="check" className="w-6 h-6 text-green-400" />
          ) : (
            <Icon name="copy" className="w-6 h-6" />
          )}
        </button>
      </div>
      
      <hr className="my-6 border-t border-amber-500/20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {/* Thelemic Year Breakdown */}
        <div>
          <h3 className="font-semibold text-xl text-amber-400 tracking-wide mb-4">{t.resultThelemicYearTitle}</h3>
          <div className="grid grid-cols-[max-content_1fr] items-baseline text-lg gap-x-4 gap-y-3">
            <span className="text-gray-300 whitespace-nowrap">{t.resultVulgarYear}:</span>
            <span className="font-mono text-amber-200">{thelemicYear.yearEV}</span>
            
            <span className="text-gray-300 whitespace-nowrap">{t.resultDocosade}:</span>
            <span className="font-mono text-amber-200">{thelemicYear.docosade} ({thelemicYear.docosadeRoman})</span>
            
            <span className="text-gray-300 whitespace-nowrap">{t.resultYearInDocosade}:</span>
            <span className="font-mono text-amber-200">{thelemicYear.yearInDocosade} ({thelemicYear.yearInDocosadeRoman || '0'})</span>
          </div>
        </div>
        
        {/* Astrological Data */}
        <div>
          <h3 className="font-semibold text-xl text-amber-400 tracking-wide mb-4">{t.resultAstrologicalPositionsTitle}</h3>
           <div className="grid grid-cols-[max-content_1fr] items-center text-lg gap-x-4 gap-y-3">
            <span className="flex items-center gap-2 text-gray-300 whitespace-nowrap">
              <Icon name="sun" className="w-5 h-5 text-amber-400"/> {t.resultSun}:
            </span> 
            <span className="font-mono text-amber-200">{astrologicalData.sun.degree}° {astrologicalData.sun.signName}</span>
          
            <span className="flex items-center gap-2 text-gray-300 whitespace-nowrap">
              <Icon name="moon" className="w-5 h-5 text-slate-400"/> {t.resultMoon}:
            </span>
            <span className="font-mono text-amber-200">{astrologicalData.moon.degree}° {astrologicalData.moon.signName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
