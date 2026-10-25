import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackTitle,
  className = 'w-full h-full object-cover',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full min-h-48 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-sky-50 via-slate-50 to-amber-50 text-center">
        <Compass className="w-10 h-10 text-sky-700 mb-3" aria-hidden="true" />
        <p className="font-display text-base font-semibold text-slate-800">
          {fallbackTitle}
        </p>
        <p className="text-xs text-slate-500 mt-1">Ilustrasi Budaya Nusantara</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
