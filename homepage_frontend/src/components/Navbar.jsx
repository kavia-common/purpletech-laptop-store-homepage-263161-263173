import { useEffect, useMemo, useRef, useState } from 'react';
import CategoryMegaMenu from './CategoryMegaMenu';

/**
 * PUBLIC_INTERFACE
 * Navbar renders the top navigation with brand, anchor links, CTA and theme toggle.
 * - Sticky with translucent blur.
 * - Highlights active section based on scroll position.
 * - Collapsible on mobile.
 * - Applies background blur+shadow on scroll, and smooth anchor scrolling with reduced-motion support.
 *
 * @param {Object} props
 * @param {() => void} [props.onToggleTheme] - Optional theme toggle handler.
 * @param {'light'|'dark'} [props.theme] - Current theme for accessible label.
 */
export default function Navbar({ onToggleTheme, theme = 'light' }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [scrolled, setScrolled] = useState(false);

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

  // Mega menu state
  const [megaOpen, setMegaOpen] = useState(false);
  const catBtnRef = useRef(null);

  const toggleMega = () => setMegaOpen((v) => !v);
  const closeMega = () => setMegaOpen(false);

  useEffect(() => {
    const onScroll = () => {
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
      setScrolled(window.scrollY > 4);
      if (window.scrollY > 4 && megaOpen) setMegaOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setOpen((o) => !o);

  // Smooth scroll with offset for in-page anchors
  const handleAnchorClick = (e, href) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navOffset = 70;
    const top = window.scrollY + el.getBoundingClientRect().top - navOffset;
    window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    // Update hash after scroll (non-blocking)
    window.history.replaceState(null, '', href);
    setOpen(false);
    setMegaOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Primary">
      <div className="container nav-inner">
        <a href="#home" className="brand" aria-label="Purpletech Laptops home" onClick={(e) => handleAnchorClick(e, '#home')}>
          <span className="brand-icon" aria-hidden="true" />
          <span>Purpletech Laptops</span>
        </a>

        <div className="nav-links" role="navigation" aria-label="In-page">
          <div className="nav-group" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              ref={catBtnRef}
              className={`btn btn-secondary`}
              aria-haspopup="dialog"
              aria-expanded={megaOpen}
              aria-controls="mega-menu"
              onClick={() => setMegaOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') setMegaOpen(true);
                if (e.key === 'Escape') setMegaOpen(false);
              }}
              type="button"
            >
              Browse Categories ▾
            </button>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={activeId === l.href.slice(1) ? 'active' : ''}
                onClick={(e) => handleAnchorClick(e, l.href)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary nav-cta"
            onClick={(e) => handleAnchorClick(e, '#categories')}
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

      <CategoryMegaMenu
        open={megaOpen}
        onClose={closeMega}
        label="Browse categories menu"
      />
      <div className="menu-panel" style={{ display: open ? 'block' : 'none' }}>
        <div className="container" style={{ display: 'grid', gap: 6 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleAnchorClick(e, l.href)}
              className={activeId === l.href.slice(1) ? 'active' : ''}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => handleAnchorClick(e, '#categories')}
          >
            Shop Deals
          </button>
        </div>
      </div>
    </nav>
  );
}
