import { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * A lightweight, accessible carousel with 3 slides using CSS transitions.
 * Includes auto-rotation, pause on hover, keyboard navigation, and live region updates.
 */
export default function HeroCarousel() {
  const slides = [
    {
      title: 'Power your ambition.',
      subtitle: 'Premium laptops for work, creativity, and play.',
      ctas: [{ label: 'Shop Now', href: '#categories' }, { label: 'View Deals', href: '#categories' }],
    },
    {
      title: 'Gaming unleashed.',
      subtitle: 'High refresh, high performance rigs that go anywhere.',
      ctas: [{ label: 'Explore Gaming', href: '#categories' }],
    },
    {
      title: 'Ultra-portable, ultra-capable.',
      subtitle: 'Featherweight ultrabooks with all-day battery.',
      ctas: [{ label: 'See Ultrabooks', href: '#categories' }],
    },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const liveRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || prefersReduced) return undefined;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slides.length, paused]);

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Slide ${index + 1} of ${slides.length}: ${slides[index].title}`;
    }
  }, [index, slides]);

  const go = (dir) => {
    setIndex((i) => {
      const next = (i + dir + slides.length) % slides.length;
      return next;
    });
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <div className="hero-inner" aria-live="off">
        <div
          className="card hero-slide"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}`}
        >
          <div>
            <div className="badge" aria-hidden="true">Purpletech Laptops</div>
            <h1 className="hero-title">{slides[index].title}</h1>
            <p className="hero-subtitle">{slides[index].subtitle}</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {slides[index].ctas.map((c) => (
                <a key={c.label} href={c.href} className="btn btn-primary">
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-controls" aria-label="Carousel controls">
        <button className="ctrl" aria-label="Previous slide" onClick={() => go(-1)}>
          ‹
        </button>
        <button className="ctrl" aria-label="Next slide" onClick={() => go(1)}>
          ›
        </button>
      </div>
      <div className="dots" role="tablist" aria-label="Select slide">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            style={{ border: 'none', background: 'transparent', padding: 4 }}
          >
            <span className={`dot ${i === index ? 'active' : ''}`} />
          </button>
        ))}
      </div>

      {/* Live region for polite announcements */}
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
    </div>
  );
}
