import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Testimonials grid with avatar initials, name, star rating and quote.
 */
export default function Testimonials() {
  const items = [
    { name: 'Alex M.', quote: 'Phenomenal service and blazing fast shipping!', rating: 5 },
    { name: 'Priya S.', quote: 'My gaming laptop is a beast. Smooth checkout too.', rating: 5 },
    { name: 'Carlos R.', quote: 'Great prices and reliable advice. Highly recommended.', rating: 4 },
    { name: 'Jin L.', quote: 'Found the perfect ultrabook for travel!', rating: 5 },
    { name: 'Sara D.', quote: 'Support solved my issue in minutes. Impressive.', rating: 5 },
    { name: 'Noah K.', quote: 'Quality gear and easy returns. Five stars.', rating: 5 },
  ];

  const stars = (n) => '★★★★★'.slice(0, n);

  return (
    <div className="testimonials">
      {items.map((t) => (
        <article key={t.name} className="card t-card">
          <div className="t-header">
            <div className="avatar" aria-hidden="true">{t.name.split(' ').map((s) => s[0]).join('').slice(0, 2)}</div>
            <div>
              <div style={{ fontWeight: 800 }}>{t.name}</div>
              <div className="stars" aria-label={`${t.rating} out of 5 stars`} role="img">
                {stars(t.rating)}
              </div>
            </div>
          </div>
          <p className="quote">“{t.quote}”</p>
        </article>
      ))}
    </div>
  );
}
