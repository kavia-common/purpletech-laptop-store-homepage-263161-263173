import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Key selling points tiles: Free Shipping, 24/7 Support, Secure Checkout, Easy Returns.
 */
export default function SellingPoints() {
  const points = [
    { title: 'Free Shipping', desc: 'Fast, free shipping on orders over $99.', icon: '🚚' },
    { title: '24/7 Support', desc: 'Real humans ready to help anytime.', icon: '💬' },
    { title: 'Secure Checkout', desc: 'Encrypted payments and buyer protection.', icon: '🔒' },
    { title: 'Easy Returns', desc: 'Hassle-free 30-day returns.', icon: '↩️' },
  ];
  return (
    <div className="points">
      {points.map((p) => (
        <div className="card point" key={p.title}>
          <div className="icon" aria-hidden="true" style={{ fontSize: 18 }}>
            {p.icon}
          </div>
          <div>
            <h3 style={{ margin: 0, fontWeight: 800 }}>{p.title}</h3>
            <p className="quote" style={{ margin: '6px 0 0' }}>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
