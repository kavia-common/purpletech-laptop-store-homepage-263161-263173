import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Grid of category cards with icon, title, description and CTA.
 */
export default function Categories() {
  const items = [
    { title: 'Ultrabooks', desc: 'Lightweight performance for productivity.' },
    { title: 'Gaming', desc: 'High FPS machines with dedicated GPUs.' },
    { title: 'Business', desc: 'Enterprise-ready security and durability.' },
    { title: '2-in-1', desc: 'Convertible versatility for work and play.' },
    { title: 'Student', desc: 'Affordable picks for learning and beyond.' },
    { title: 'Accessories', desc: 'Mice, keyboards, docks and more.' },
  ];

  return (
    <div className="grid">
      {items.map((it) => (
        <article key={it.title} className="card cat-card">
          <div className="cat-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 6h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm2-4h12a2 2 0 0 1 2 2v2H4V4a2 2 0 0 1 2-2z" />
            </svg>
          </div>
          <h3 className="cat-title">{it.title}</h3>
          <p className="cat-desc">{it.desc}</p>
          <a className="btn btn-secondary" href="#newsletter" aria-label={`Shop ${it.title}`}>
            Explore
          </a>
        </article>
      ))}
    </div>
  );
}
