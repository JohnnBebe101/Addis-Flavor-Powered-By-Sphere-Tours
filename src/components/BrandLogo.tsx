import React from 'react';

type BrandLogoVariant = 'mark' | 'full';
type BrandLogoSize = 'xs' | 'sm' | 'md' | 'lg';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  className?: string;
  alt?: string;
}

const sizeMap: Record<BrandLogoSize, { mark: string; full: string }> = {
  xs: { mark: 'w-6 h-6', full: 'h-4 w-auto' },
  sm: { mark: 'w-8 h-8', full: 'h-5 w-auto' },
  md: { mark: 'w-10 h-10', full: 'h-6 w-auto' },
  lg: { mark: 'w-12 h-12', full: 'h-8 w-auto' },
};

const srcMap: Record<BrandLogoVariant, string> = {
  mark: '/logo-mark.svg',
  full: '/logo-full.svg',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'mark',
  size = 'md',
  className = '',
  alt = 'Addis Ababa by Locals — Powered by Sphere Tour & Travel',
}) => {
  const sizeClass = sizeMap[size][variant];
  const src = srcMap[variant];

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} object-contain ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
};
