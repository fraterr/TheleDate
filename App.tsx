import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { performCalculations } from './services/thelema';
import { getCityForTimezone } from './services/geo';
import type { CalculationResult, CityData } from './types';
import type { Language } from './i18n';
import { getTranslations } from './i18n';
import ResultDisplay from './components/ResultDisplay';
import CitySearch from './components/CitySearch';
import Icon from './components/Icon';
import LanguageSwitcher from './components/LanguageSwitcher';

// Helper to get user's local IANA timezone
const getLocalTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return 'UTC'; // Fallback
  }
};


const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('it');
  const t = useMemo(() => getTranslations(language), [language]);

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [includeWeekday, setIncludeWeekday] = useState<boolean>(true);

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialCityLoading, setIsInitialCityLoading] = useState<boolean>(true);

  const calculate = useCallback(() => {
    if (!date || !time || !selectedCity) {
      setResult(null);
      setError(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
        try {
            const calculationResult = performCalculations(date, time, selectedCity.timezone);
            setResult(calculationResult);
        } catch (e: any) {
            setError(e.message);
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    }, 50);

  }, [date, time, selectedCity]);

  useEffect(() => {
    // Set initial date and time to user's current local time
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    setDate(`${year}-${month}-${day}`);
    setTime(`${hours}:${minutes}`);

    const localTz = getLocalTimezone();
    getCityForTimezone(localTz)
      .then(city => {
        if (city) {
          setSelectedCity(city);
        } else {
          setSelectedCity({ name: "Greenwich", country: "UK", timezone: "Europe/London", latitude: 51.4826, longitude: 0.0077 });
        }
      })
      .catch(() => {
        // Fallback on error
         setSelectedCity({ name: "Greenwich", country: "UK", timezone: "Europe/London", latitude: 51.4826, longitude: 0.0077 });
      })
      .finally(() => {
        setIsInitialCityLoading(false);
      });

  }, []);
  
  useEffect(() => {
    if(!isInitialCityLoading) {
        calculate();
    }
  }, [calculate, isInitialCityLoading]);

  return (
    <div className="min-h-screen font-inter p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto relative">
         <div className="absolute top-0 right-0 z-20 -mt-2 -mr-2 sm:mt-0 sm:mr-0">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>

        <header className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-amber-300 tracking-widest font-cinzel">{t.appName}</h1>
          <p className="text-gray-300 mt-4 max-w-lg mx-auto text-lg">{t.appDescription}</p>
        </header>

        <main className="bg-black/40 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-amber-500/10 border border-amber-500/30 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Date Input */}
            <div className="space-y-2">
              <label htmlFor="date" className="flex items-center gap-2 text-lg font-semibold text-amber-400">
                <Icon name="calendar" className="w-4 h-4"/> {t.civilDateLabel}
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 focus:border-amber-400 p-2 text-gray-200 outline-none focus:ring-0 transition-colors text-lg"
                aria-label={t.civilDateLabel}
              />
            </div>
            
            {/* Time Input */}
            <div className="space-y-2">
              <label htmlFor="time" className="flex items-center gap-2 text-lg font-semibold text-amber-400">
                <Icon name="clock" className="w-4 h-4"/> {t.timeLabel}
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 focus:border-amber-400 p-2 text-gray-200 outline-none focus:ring-0 transition-colors text-lg"
                aria-label={t.timeLabel}
              />
            </div>

            {/* City Search Input */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="city-search" className="flex items-center gap-2 text-lg font-semibold text-amber-400">
                <Icon name="globe" className="w-4 h-4"/> {t.cityLabel}
              </label>
              {isInitialCityLoading ? (
                <div className="w-full border-0 border-b-2 border-gray-600 p-2 h-[44px] flex items-center text-gray-400 animate-pulse text-lg" aria-busy="true">
                  {t.loadingLocalCity}
                </div>
              ) : (
                <CitySearch
                  key={selectedCity ? selectedCity.name : 'empty'}
                  onCitySelect={setSelectedCity}
                  initialCityName={selectedCity ? `${selectedCity.name}, ${selectedCity.country}`: ''}
                  placeholder={t.citySearchPlaceholder}
                  loadingText={t.citySearchLoading}
                  noResultsText={t.citySearchNoResults}
                />
              )}
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center">
             <label htmlFor="include-weekday" className="flex items-center cursor-pointer text-lg text-gray-300">
               <input
                type="checkbox"
                id="include-weekday"
                checked={includeWeekday}
                onChange={(e) => setIncludeWeekday(e.target.checked)}
                className="custom-checkbox"
              />
              <span className="ml-3">
                {t.includeWeekdayLabel}
              </span>
            </label>
          </div>


          <ResultDisplay
            result={result}
            error={error}
            isLoading={isLoading || isInitialCityLoading}
            includeWeekday={includeWeekday}
            translations={t}
          />
        </main>
        
        <footer className="text-center mt-10 space-y-2 text-sm text-gray-500 tracking-wide">
            <p>{t.appSlogan}</p>
            <p>{t.appFooter}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;