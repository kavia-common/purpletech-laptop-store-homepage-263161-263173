import { useEffect, useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Navbar renders the top navigation with brand, anchor links, CTA and theme toggle.
 * - Sticky with translucent blur.
 * - Highlights active section based on scroll position.
 * - Collapsible on mobile.
 *
 * @param {Object} props
 * @param {() => void} [props.onToggleTheme] - Optional theme toggle handler.
 * @param {'light'|'dark'} [props.theme] - Current theme for accessible label.
 */
export default function Navbar({ onToggleTheme, theme = 'light' }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  const links = useMemo(
    () => [
      { href: '#home', label: 'Home' },
      { href: '#brands', label: 'Brands' },
      { href: '#categories', label: 'Categories' },
      { href: '#testimonials', label: 'Testimonials' },
      { href: '#newsletter', label: 'Newsletter' },
    ],
    []
  );

  useEffect(() => {
    const handler = () => {
      const sectionIds = ['home', 'brands', 'categories', 'testimonials', 'newsletter'];
      const offset = 90;
      let current = 'home';
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top - offset <= 0) current = id;
        }
      });
      setActiveId(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleMenu = () => setOpen((o) => !o);

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="container nav-inner">
        <a href="#home" className="brand" aria-label="Purpletech Laptops home">
          <span className="brand-icon" aria-hidden="true" />
          <span>Purpletech Laptops</span>
        </a>

        <div className="nav-links" role="navigation" aria-label="In-page">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={activeId === l.href.slice(1) ? 'active' : ''}>
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary nav-cta"
            onClick={() => (window.location.hash = '#categories')}
          >
            Shop Deals
          </button>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={toggleMenu}
          >
            ☰
          </button>
          <button
            className="btn btn-secondary"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      <div className="menu-panel" style={{ display: open ? 'block' : 'none' }}>
        <div className="container" style={{ display: 'grid', gap: 6 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={activeId === l.href.slice(1) ? 'active' : ''}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setOpen(false);
              window.location.hash = '#categories';
            }}
          >
            Shop Deals
          </button>
        </div>
      </div>
    </nav>
  );
}
