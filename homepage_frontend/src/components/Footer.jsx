import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer with basic links and copyright.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>&copy; {year} Purpletech Laptops</div>
        <nav aria-label="Footer">
          <div className="footer-links" style={{ gridAutoFlow: 'column' }}>
            <a href="#home">Home</a>
            <a href="#brands">Brands</a>
            <a href="#categories">Categories</a>
            <a href="#newsletter">Newsletter</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
