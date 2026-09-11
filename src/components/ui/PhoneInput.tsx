import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import countryCodesData from '../../content/country-codes.json';

interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  required?: boolean;
  helperText?: string;
  id?: string;
}

export function PhoneInput({ value, onChange, required, helperText, id }: PhoneInputProps) {
  const countries = countryCodesData.countries;
  const defaultDial = countries.find(c => c.code === countryCodesData.defaultCountryCode)?.dial || '+971';

  const [isOther, setIsOther] = useState(false);
  const [selectedDial, setSelectedDial] = useState(defaultDial);
  const [localNumber, setLocalNumber] = useState('');
  const [manualNumber, setManualNumber] = useState('');

  const stableOnChange = useCallback((val: string) => {
    onChange(val);
  }, [onChange]);

  useEffect(() => {
    if (!value) return;
    const match = countries.find(c => c.dial && value.startsWith(c.dial));
    if (match && match.code !== 'OTHER') {
      setIsOther(false);
      setSelectedDial(match.dial);
      setLocalNumber(value.slice(match.dial.length));
    } else {
      setIsOther(true);
      setManualNumber(value);
    }
  }, [value]);

  useEffect(() => {
    if (isOther) {
      stableOnChange(manualNumber);
    } else {
      stableOnChange(localNumber ? `${selectedDial}${localNumber}` : '');
    }
  }, [isOther, selectedDial, localNumber, manualNumber, stableOnChange]);

  const handleCountryChange = (dial: string) => {
    if (dial === '') {
      setIsOther(true);
      setManualNumber(localNumber ? `${selectedDial}${localNumber}` : '');
    } else {
      setIsOther(false);
      setSelectedDial(dial);
      if (manualNumber) {
        const stripped = manualNumber.startsWith('+') ? manualNumber.slice(1) : manualNumber;
        setLocalNumber(stripped);
        setManualNumber('');
      }
    }
  };

  const selectedCountry = countries.find(c => c.dial === selectedDial);

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        {isOther ? (
          <input
            id={id}
            type="tel"
            inputMode="tel"
            value={manualNumber}
            onChange={(e) => setManualNumber(e.target.value)}
            placeholder="+1 201 555 0123"
            required={required}
            className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all font-mono"
          />
        ) : (
          <>
            <div className="relative flex-shrink-0">
              <select
                value={selectedDial}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="appearance-none h-full px-3 py-3 pr-8 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm font-mono focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red cursor-pointer"
              >
                {countries.map(c => (
                  <option key={c.code} value={c.dial}>
                    {c.flag} {c.code === 'OTHER' ? 'Other' : c.dial}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-teal/50 pointer-events-none" />
            </div>
            <input
              id={id}
              type="tel"
              inputMode="numeric"
              value={localNumber}
              onChange={(e) => setLocalNumber(e.target.value.replace(/[^\d\s-]/g, ''))}
              placeholder={selectedCountry?.placeholder || ''}
              required={required}
              className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all"
            />
          </>
        )}
      </div>
      <p className="text-[11px] text-teal/50 font-mono">
        {isOther
          ? 'Include your country code (e.g., +1 for US, +44 for UK)'
          : helperText || (selectedCountry && `e.g., ${selectedDial} ${selectedCountry.placeholder}`)}
      </p>
    </div>
  );
}
