import React, { useEffect, useRef, useState } from 'react';
import ImageCard from './ImageCard';

/**
 * PUBLIC_INTERFACE
 * CategoryMegaMenu provides an accessible mega-menu with image tiles for key categories.
 * Keyboard support: Arrow keys to navigate, Esc to close, Tab wraps within when open.
 *
 * @param {Object} props
 * @param {boolean} props.open - Whether the mega-menu is open.
 * @param {() => void} props.onClose - Close handler (e.g., on Esc or outside click).
 * @param {string} [props.label] - Accessible label for the menu region.
 */
export default function CategoryMegaMenu({ open, onClose, label = 'Browse categories' }) {
  const ref = useRef(null);
  const [focusables, setFocusables] = useState([]);

  const cats = [
    {
      key: 'home',
      title: 'Home',
      subtitle: 'Everything you need to get started',
      badge: 'Top',
      href: '#home',
    },
    {
      key: 'desktops',
      title: 'Desktop & Laptop',
      subtitle: 'Powerful machines for work & play',
      badge: 'Hot',
      href: '#categories',
    },
    {
      key: 'security',
      title: 'Security Products',
      subtitle: 'Cameras, access control, alarms',
      badge: 'New',
      href: '#top-deals',
    },
    {
      key: 'networking',
      title: 'Networking Solutions',
      subtitle: 'Routers, switches, Wi‑Fi systems',
      badge: 'Deal',
      href: '#trending',
    },
  ];

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (!el) return;
    const f = el.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    setFocusables(Array.from(f));
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') {
        onClose?.();
      }
      if ((e.key === 'Tab') && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) && focusables.length) {
        e.preventDefault();
        const idx = focusables.indexOf(document.activeElement);
        let next = idx;
        const cols = 2; // mobile default; visually more columns on larger screens but arrow nav still cycles.
        if (e.key === 'ArrowRight') next = Math.min(idx + 1, focusables.length - 1);
        if (e.key === 'ArrowLeft') next = Math.max(idx - 1, 0);
        if (e.key === 'ArrowDown') next = Math.min(idx + cols, focusables.length - 1);
        if (e.key === 'ArrowUp') next = Math.max(idx - cols, 0);
        if (next !== idx) focusables[next].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, focusables, onClose]);

  useEffect(() => {
    const onClickAway = (e) => {
      if (!open) return;
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    };
    document.addEventListener('mousedown', onClickAway);
    return () => document.removeEventListener('mousedown', onClickAway);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className="mega-menu"
      role="dialog"
      aria-modal="false"
      aria-hidden={!open}
      aria-label={label}
      style={{ display: open ? 'block' : 'none' }}
    >
      <div className="container mega-grid">
        {cats.map((c) => (
          <a key={c.key} href={c.href} className="mega-tile" aria-label={`Open ${c.title}`}>
            <ImageCard
              title={c.title}
              subtitle={c.subtitle}
              badge={c.badge}
              ctaLabel="Shop"
              ctaHref={c.href}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
