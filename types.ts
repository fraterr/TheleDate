export interface AstrologicalPosition {
  longitude: number;
  degree: number;
  signIndex: number;
  signName: string;
}

export interface AstrologicalData {
  sun: AstrologicalPosition;
  moon: AstrologicalPosition;
}

export interface ThelemicYear {
  yearEV: number;
  docosade: number;
  yearInDocosade: number;
  docosadeRoman: string;
  yearInDocosadeRoman: string;
}

export interface CalculationResult {
  thelemicYear: ThelemicYear;
  astrologicalData: AstrologicalData;
  latinWeekday: string;
}

export interface CityData {
  name: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
}
