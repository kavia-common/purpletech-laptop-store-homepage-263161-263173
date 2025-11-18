import React from 'react';
import ImageCard from './ImageCard';

/**
 * PUBLIC_INTERFACE
 * CategoryTiles renders a responsive grid of large, image-first tiles.
 *
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array} props.items - Array of { title, subtitle, href, badge, img, alt }
 * @param {string} [props.sectionId] - Optional id for anchoring
 */
export default function CategoryTiles({ title, items = [], sectionId }) {
  return (
    <section id={sectionId} className="section">
      <div className="container">
        <div className="section-header">
          <div className="badge" aria-hidden="true">{title.includes('Deal') ? 'Limited Time' : 'Categories'}</div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">Hand-picked selections for you</p>
        </div>
        <div className="tiles-grid">
          {items.map((it) => (
            <ImageCard
              key={it.title}
              img={it.img}
              alt={it.alt || it.title}
              title={it.title}
              subtitle={it.subtitle}
              badge={it.badge}
              ctaLabel="Explore"
              ctaHref={it.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
