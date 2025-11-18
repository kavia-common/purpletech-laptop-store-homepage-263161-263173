import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Displays a list of placeholder brand logos; scrollable on mobile, grid on larger screens.
 */
export default function BrandShowcase() {
  const brands = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div>
      <div className="brand-row" aria-label="Brand logos">
        {brands.map((b) => (
          <div key={b} className="brand-logo" role="img" aria-label={`Brand ${b}`}>
            <svg width="80" height="24" viewBox="0 0 80 24" aria-hidden="true">
              <rect x="1" y="5" width="18" height="14" rx="3" fill="currentColor" />
              <rect x="23" y="5" width="18" height="14" rx="3" fill="currentColor" opacity="0.6" />
              <rect x="45" y="5" width="18" height="14" rx="3" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
        ))}
      </div>

      <div className="grid" style={{ marginTop: 12 }}>
        {brands.map((b, i) => (
          <div key={`${b}-${i}`} className="brand-logo" role="img" aria-label={`Brand ${b} variant`}>
            <svg width="80" height="24" viewBox="0 0 80 24" aria-hidden="true">
              <rect x="1" y="5" width="18" height="14" rx="3" fill="currentColor" />
              <rect x="23" y="5" width="18" height="14" rx="3" fill="currentColor" opacity="0.6" />
              <rect x="45" y="5" width="18" height="14" rx="3" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
