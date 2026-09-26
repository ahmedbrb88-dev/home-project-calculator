import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../i18n';

import type { SiteContent } from '../content/types';
import { getContent } from '../content';

type SettingsContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  unitSystem: 'metric' | 'imperial';
  setUnitSystem: (system: 'metric' | 'imperial') => void;
  currency: string;
  setCurrency: (currency: string) => void;
  country: string;
  setCountry: (country: string) => void;
  content: SiteContent;
  t: (key: string, variablesOrFallback?: string | Record<string, any>) => string;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const CURRENCIES = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
  { value: 'NZD', label: 'New Zealand Dollar (NZD)' },
  { value: 'CHF', label: 'Swiss Franc (CHF)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
  { value: 'CNY', label: 'Chinese Yuan (CNY)' },
  { value: 'INR', label: 'Indian Rupee (INR)' },
  { value: 'BRL', label: 'Brazilian Real (BRL)' },
  { value: 'MXN', label: 'Mexican Peso (MXN)' },
  { value: 'ZAR', label: 'South African Rand (ZAR)' },
  { value: 'SEK', label: 'Swedish Krona (SEK)' },
  { value: 'NOK', label: 'Norwegian Krone (NOK)' },
  { value: 'DKK', label: 'Danish Krone (DKK)' },
  { value: 'PLN', label: 'Polish Zloty (PLN)' },
  { value: 'CZK', label: 'Czech Koruna (CZK)' },
  { value: 'HUF', label: 'Hungarian Forint (HUF)' },
  { value: 'RON', label: 'Romanian Leu (RON)' },
  { value: 'TRY', label: 'Turkish Lira (TRY)' },
  { value: 'AED', label: 'UAE Dirham (AED)' },
  { value: 'SAR', label: 'Saudi Riyal (SAR)' },
  { value: 'QAR', label: 'Qatari Riyal (QAR)' },
  { value: 'KWD', label: 'Kuwaiti Dinar (KWD)' },
  { value: 'ILS', label: 'Israeli New Shekel (ILS)' },
  { value: 'DZD', label: 'Algerian Dinar (DZD)' },
  { value: 'MAD', label: 'Moroccan Dirham (MAD)' },
  { value: 'TND', label: 'Tunisian Dinar (TND)' },
  { value: 'EGP', label: 'Egyptian Pound (EGP)' },
  { value: 'SGD', label: 'Singapore Dollar (SGD)' },
  { value: 'HKD', label: 'Hong Kong Dollar (HKD)' },
  { value: 'KRW', label: 'South Korean Won (KRW)' },
  { value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
  { value: 'THB', label: 'Thai Baht (THB)' },
  { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
  { value: 'PHP', label: 'Philippine Peso (PHP)' }
];

export const COUNTRIES = [
  { value: 'US', label: 'United States', currency: 'USD' },
  { value: 'GB', label: 'United Kingdom', currency: 'GBP' },
  { value: 'CA', label: 'Canada', currency: 'CAD' },
  { value: 'AU', label: 'Australia', currency: 'AUD' },
  { value: 'NZ', label: 'New Zealand', currency: 'NZD' },
  { value: 'FR', label: 'France', currency: 'EUR' },
  { value: 'DE', label: 'Germany', currency: 'EUR' },
  { value: 'ES', label: 'Spain', currency: 'EUR' },
  { value: 'IT', label: 'Italy', currency: 'EUR' },
  { value: 'PT', label: 'Portugal', currency: 'EUR' },
  { value: 'BE', label: 'Belgium', currency: 'EUR' },
  { value: 'CH', label: 'Switzerland', currency: 'CHF' },
  { value: 'JP', label: 'Japan', currency: 'JPY' },
  { value: 'CN', label: 'China', currency: 'CNY' },
  { value: 'IN', label: 'India', currency: 'INR' },
  { value: 'BR', label: 'Brazil', currency: 'BRL' },
  { value: 'MX', label: 'Mexico', currency: 'MXN' },
  { value: 'ZA', label: 'South Africa', currency: 'ZAR' },
  { value: 'SE', label: 'Sweden', currency: 'SEK' },
  { value: 'NO', label: 'Norway', currency: 'NOK' },
  { value: 'DK', label: 'Denmark', currency: 'DKK' },
  { value: 'PL', label: 'Poland', currency: 'PLN' },
  { value: 'AE', label: 'UAE', currency: 'AED' },
  { value: 'SA', label: 'Saudi Arabia', currency: 'SAR' },
  { value: 'QA', label: 'Qatar', currency: 'QAR' },
  { value: 'KW', label: 'Kuwait', currency: 'KWD' },
  { value: 'DZ', label: 'Algeria', currency: 'DZD' },
  { value: 'MA', label: 'Morocco', currency: 'MAD' },
  { value: 'TN', label: 'Tunisia', currency: 'TND' },
  { value: 'EG', label: 'Egypt', currency: 'EGP' }
];

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('calc_lang') || 'en');
  const [unitSystem, setUnitSystem] = useState<'metric'|'imperial'>(() => (localStorage.getItem('calc_unit') as any) || 'metric');
  const [currency, setCurrency] = useState(() => localStorage.getItem('calc_currency') || 'USD');
  const [country, setCountry] = useState(() => localStorage.getItem('calc_country') || 'US');

  useEffect(() => {
    localStorage.setItem('calc_lang', language);
    localStorage.setItem('calc_unit', unitSystem);
    localStorage.setItem('calc_currency', currency);
    localStorage.setItem('calc_country', country);
    
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language, unitSystem, currency, country]);

  const handleSetCountry = (c: string) => {
    setCountry(c);
    const countryData = COUNTRIES.find(x => x.value === c);
    // Don't forcefully overwrite if user specifically chose another currency before, but for simplicity here we default it.
    if(countryData && !localStorage.getItem('calc_currency_manual')) {
      setCurrency(countryData.currency);
    }
  };

  const handleSetCurrency = (c: string) => {
    setCurrency(c);
    localStorage.setItem('calc_currency_manual', 'true');
  };

  const t = (key: string, variablesOrFallback?: string | Record<string, any>) => {
    let str = getTranslation(language, key);
    
    // Fallback if missing
    if (str === key && typeof variablesOrFallback === 'string') {
      return variablesOrFallback;
    }
    
    // Variables replacement
    if (variablesOrFallback && typeof variablesOrFallback === 'object') {
      Object.entries(variablesOrFallback).forEach(([k, v]) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    return str;
  };

  const content = getContent(language);

  return (
    <SettingsContext.Provider value={{ language, setLanguage, unitSystem, setUnitSystem, currency, setCurrency: handleSetCurrency, country, setCountry: handleSetCountry, content, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
