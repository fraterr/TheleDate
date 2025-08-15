import React, { useState, useCallback, useRef, useEffect } from 'react';
import { searchCities } from '../services/geo';
import type { CityData } from '../types';

function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
    let timeoutId: number | null = null;
    return (...args: Parameters<F>): void => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => func(...args), waitFor);
    };
}

interface CitySearchProps {
  onCitySelect: (city: CityData) => void;
  initialCityName?: string;
  placeholder: string;
  loadingText: string;
  noResultsText: string;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect, initialCityName, placeholder, loadingText, noResultsText }) => {
    const [query, setQuery] = useState(initialCityName || '');
    const [results, setResults] = useState<CityData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const performSearch = async (searchQuery: string) => {
        if (searchQuery.trim().length < 3) {
            setResults([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const cities = await searchCities(searchQuery);
            setResults(cities);
        } catch (error) {
            console.error("City search failed:", error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedSearch = useCallback(debounce(performSearch, 400), []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setIsDropdownOpen(true);
        debouncedSearch(newQuery);
    };

    const handleCityClick = (city: CityData) => {
        setQuery(`${city.name}, ${city.country}`);
        onCitySelect(city);
        setResults([]);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
      if(initialCityName) {
        setQuery(initialCityName);
      }
    }, [initialCityName])


    return (
        <div className="relative" ref={containerRef}>
            <input
                id="city-search"
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={placeholder}
                autoComplete="off"
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 focus:border-amber-400 p-2 text-gray-200 outline-none focus:ring-0 transition-colors text-lg"
                aria-label="Cerca una città"
            />
            {isDropdownOpen && (query.length >= 3 || results.length > 0 || isLoading) && (
                <ul className="absolute z-10 w-full mt-1 bg-gray-900/80 backdrop-blur-sm border border-amber-500/30 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {isLoading && <li className="px-4 py-2 text-gray-400 text-lg">{loadingText}</li>}
                    {!isLoading && results.length === 0 && query.length >= 3 && <li className="px-4 py-2 text-gray-400 text-lg">{noResultsText}</li>}
                    {results.map((city, index) => (
                        <li 
                            key={`${city.name}-${city.country}-${index}`} 
                            role="option"
                            aria-selected="false"
                            className="px-4 py-2 text-gray-200 hover:bg-amber-500/20 cursor-pointer transition-colors text-lg"
                            onMouseDown={() => handleCityClick(city)}
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CitySearch;