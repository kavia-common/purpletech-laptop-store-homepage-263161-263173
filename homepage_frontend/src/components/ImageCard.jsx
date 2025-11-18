import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ImageCard renders a large visual-first card with optional badge, title, subtitle and CTA.
 * Falls back to an inline SVG placeholder if no image is provided.
 *
 * @param {Object} props
 * @param {string} [props.img] - Image URL; if not provided, an SVG placeholder is shown.
 * @param {string} [props.alt] - Accessible alt text for the image (required if img provided).
 * @param {string} [props.title] - Main title text.
 * @param {string} [props.subtitle] - Subtitle or description.
 * @param {string} [props.ctaLabel] - CTA button label.
 * @param {string} [props.ctaHref] - CTA link href.
 * @param {string} [props.badge] - Optional badge text.
 * @param {('horizontal'|'vertical')} [props.layout='vertical'] - Layout orientation.
 * @param {React.ReactNode} [props.children] - Optional footer/extra content.
 */
export default function ImageCard({
  img,
  alt = '',
  title,
  subtitle,
  ctaLabel,
  ctaHref = '#',
  badge,
  layout = 'vertical',
  children,
}) {
  return (
    <article className={`card image-card ${layout === 'horizontal' ? 'img-horizontal' : 'img-vertical'}`}>
      <div className="image-wrap" role="img" aria-label={img ? undefined : (alt || title || 'Promotional image')}>
        {img ? (
          <img src={img} alt={alt || ''} className="image" />
        ) : (
          // Inline SVG placeholder (royalty-free style)
          <svg className="image" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#93C5FD" stopOpacity="0.35" />
                <stop offset="1" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#g)" />
            <g fill="#2563EB" opacity="0.2">
              <circle cx="140" cy="120" r="60" />
              <circle cx="700" cy="420" r="80" />
            </g>
            <rect x="120" y="340" width="560" height="20" rx="10" fill="#2563EB" opacity="0.3" />
            <rect x="200" y="370" width="400" height="20" rx="10" fill="#2563EB" opacity="0.18" />
          </svg>
        )}
        {badge && <div className="badge badge-on-image" aria-hidden="true">{badge}</div>}
      </div>
      {(title || subtitle || ctaLabel || children) && (
        <div className="content">
          {title && <h3 className="img-title">{title}</h3>}
          {subtitle && <p className="img-subtitle">{subtitle}</p>}
          {(ctaLabel && ctaHref) && (
            <a href={ctaHref} className="btn btn-primary" aria-label={title ? `${ctaLabel}: ${title}` : ctaLabel}>
              {ctaLabel}
            </a>
          )}
          {children}
        </div>
      )}
    </article>
  );
}
