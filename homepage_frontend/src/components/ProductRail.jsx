import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ProductRail displays a horizontal scroll row of product cards with images and pricing.
 *
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array} props.products - Array of { name, price, img, alt, href, badge }
 * @param {string} [props.sectionId] - Optional id
 */
export default function ProductRail({ title, products = [], sectionId }) {
  return (
    <section id={sectionId} className="section rail">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left' }}>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">Popular right now</p>
        </div>
        <div className="rail-row" role="list" aria-label={`${title} product list`}>
          {products.map((p) => (
            <a key={p.name} role="listitem" className="rail-card card" href={p.href || '#'} aria-label={`${p.name} - ${p.price}`}>
              <div className="rail-img-wrap">
                {p.img ? (
                  <img src={p.img} alt={p.alt || p.name} className="rail-img" />
                ) : (
                  <svg className="rail-img" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                      <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#93C5FD" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#E5E7EB" />
                      </linearGradient>
                    </defs>
                    <rect width="600" height="400" fill="url(#rg)" />
                    <rect x="120" y="300" width="360" height="24" rx="12" fill="#2563EB" opacity="0.22" />
                  </svg>
                )}
                {p.badge && <div className="badge badge-on-image">{p.badge}</div>}
              </div>
              <div className="rail-meta">
                <div className="rail-name">{p.name}</div>
                <div className="rail-price">{p.price}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
