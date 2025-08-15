
export const translations = {
  it: {
    appName: "Theledate",
    appDescription: "Calcola la data Thelemica per ogni giorno, ora e luogo. La data Thelemica si basa sulla posizione astrologica del Sole e della Luna.",
    appSlogan: "Do what thou wilt shall be the whole of the Law.",
    appFooter: "Love is the law, love under will.",
    civilDateLabel: "Data Civile",
    timeLabel: "Ora",
    cityLabel: "Città",
    loadingLocalCity: "Caricamento città locale...",
    citySearchPlaceholder: "Cerca una città...",
    citySearchLoading: "Ricerca in corso...",
    citySearchNoResults: "Nessun risultato trovato.",
    includeWeekdayLabel: "Includi giorno della settimana (Dies)",
    copyDateLabel: "Copia data",
    copiedLabel: "Copiato!",
    resultErrorTitle: "Errore",
    resultThelemicYearTitle: "Anno Thelemico",
    resultAstrologicalPositionsTitle: "Posizioni Astrologiche",
    resultVulgarYear: "Anno Vulgari (e.v.)",
    resultDocosade: "Docosade",
    resultYearInDocosade: "Anno in Docosade",
    resultSun: "Sol",
    resultMoon: "Luna",
  },
  en: {
    appName: "Theledate",
    appDescription: "Calculate the Thelemic date for any day, time, and location. The Thelemic date is based on the astrological positions of the Sun and Moon.",
    appSlogan: "Do what thou wilt shall be the whole of the Law.",
    appFooter: "Love is the law, love under will.",
    civilDateLabel: "Civil Date",
    timeLabel: "Time",
    cityLabel: "City",
    loadingLocalCity: "Loading local city...",
    citySearchPlaceholder: "Search for a city...",
    citySearchLoading: "Searching...",
    citySearchNoResults: "No results found.",
    includeWeekdayLabel: "Include day of the week (Dies)",
    copyDateLabel: "Copy date",
    copiedLabel: "Copied!",
    resultErrorTitle: "Error",
    resultThelemicYearTitle: "Thelemic Year",
    resultAstrologicalPositionsTitle: "Astrological Positions",
    resultVulgarYear: "Vulgar Year (e.v.)",
    resultDocosade: "Docosade",
    resultYearInDocosade: "Year in Docosade",
    resultSun: "Sun",
    resultMoon: "Moon",
  },
};

export type Language = keyof typeof translations;

export const getTranslations = (lang: Language) => {
  return translations[lang];
};
