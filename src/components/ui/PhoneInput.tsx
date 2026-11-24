import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import countryCodesData from '../../content/country-codes.json';

interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  required?: boolean;
  helperText?: string;
  id?: string;
  name?: string;
}

interface CountryCode {
  code: string;
  name: string;
  dial: string;
  flag: string;
  placeholder: string;
}

interface ParsedPhoneValue {
  isOther: boolean;
  selectedDial: string;
  localNumber: string;
  manualNumber: string;
}

const countries = countryCodesData.countries as CountryCode[];
const defaultDial =
  countries.find((c) => c.code === countryCodesData.defaultCountryCode)?.dial || '+971';

function parsePhoneValue(value: string): ParsedPhoneValue {
  if (!value) {
    return { isOther: false, selectedDial: defaultDial, localNumber: '', manualNumber: '' };
  }

  const match = countries.find((c) => c.dial && value.startsWith(c.dial));
  if (match && match.code !== 'OTHER') {
    return {
      isOther: false,
      selectedDial: match.dial,
      localNumber: value.slice(match.dial.length),
      manualNumber: '',
    };
  }

  return { isOther: true, selectedDial: defaultDial, localNumber: '', manualNumber: value };
}

export function PhoneInput({ value, onChange, required, helperText, id, name }: PhoneInputProps) {
  const generatedId = useId();
  const baseId = id || generatedId;
  const { isOther, selectedDial, localNumber, manualNumber } = parsePhoneValue(value);
  const selectedCountry = countries.find((c) => c.dial === selectedDial);

  const handleCountryChange = (dial: string) => {
    if (dial === '') {
      onChange(localNumber ? `${selectedDial}${localNumber}` : '');
      return;
    }

    const stripped = manualNumber.startsWith('+') ? manualNumber.slice(1) : manualNumber;
    onChange(`${dial}${stripped}`);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        {isOther ? (
          <input
            id={baseId}
            name={name}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-describedby={`${baseId}-help`}
            value={manualNumber}
            onChange={(e) => onChange(e.target.value)}
            placeholder="+1 201 555 0123"
            required={required}
            className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all font-mono"
          />
        ) : (
          <>
            <div className="relative flex-shrink-0">
              <select
                id={`${baseId}-country`}
                aria-label="Country calling code"
                value={selectedDial}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="appearance-none h-full px-3 py-3 pr-8 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm font-mono focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.dial}>
                    {c.flag} {c.code === 'OTHER' ? 'Other' : c.dial}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-teal/50 pointer-events-none" />
            </div>
            <input
              id={baseId}
              name={name}
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              aria-describedby={`${baseId}-help`}
              value={localNumber}
              onChange={(e) => {
                const sanitized = e.target.value.replace(/[^\d\s-]/g, '');
                onChange(sanitized ? `${selectedDial}${sanitized}` : '');
              }}
              placeholder={selectedCountry?.placeholder || ''}
              required={required}
              className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-2 focus:ring-coffee-red/20 focus:border-coffee-red transition-all"
            />
          </>
        )}
      </div>
      <p id={`${baseId}-help`} className="text-xs text-teal/50 font-mono">
        {isOther
          ? 'Include your country code (e.g., +1 for US, +44 for UK)'
          : helperText ||
            (selectedCountry && `e.g., ${selectedDial} ${selectedCountry.placeholder}`)}
      </p>
    </div>
  );
}
