import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import BrandShowcase from './components/BrandShowcase';
import Categories from './components/Categories';
import SellingPoints from './components/SellingPoints';
import Testimonials from './components/Testimonials';
import NewsletterSignup from './components/NewsletterSignup';
import Footer from './components/Footer';
import env from './utils/env';

/**
 * Root single-page layout for Purpletech Laptops homepage.
 * Renders a sticky Navbar and sections: Hero, Brands, Categories, Selling Points,
 * Testimonials, Newsletter, Footer. Includes an optional theme toggle.
 */
function App() {
  const prefersDark = useMemo(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches, []);
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    // Log environment snapshot once
    // Do not leak secrets; only general URLs/flags
    // eslint-disable-next-line no-console
    console.info('[env]', { API_BASE: env.API_BASE, NODE_ENV: env.NODE_ENV, FEATURE_FLAGS: env.FEATURE_FLAGS });
  }, []);

  return (
    <>
      <Navbar onToggleTheme={toggleTheme} theme={theme} />
      <main>
        <header id="home" className="hero section">
          <div className="container">
            <HeroCarousel />
          </div>
        </header>

        <section id="brands" className="section">
          <div className="container">
            <div className="section-header">
              <div className="badge" aria-hidden="true">Trusted Brands</div>
              <h2 className="section-title">Top Laptop Makers We Carry</h2>
              <p className="section-subtitle">Explore our selection from global leaders</p>
            </div>
            <BrandShowcase />
          </div>
        </section>

        <section id="categories" className="section">
          <div className="container">
            <div className="section-header">
              <div className="badge" aria-hidden="true">Shop by Need</div>
              <h2 className="section-title">Browse Categories</h2>
              <p className="section-subtitle">Find the perfect device for work, play, or study</p>
            </div>
            <Categories />
          </div>
        </section>

        <section className="section" aria-label="Why shop with us">
          <div className="container">
            <SellingPoints />
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <div className="section-header">
              <div className="badge" aria-hidden="true">Reviews</div>
              <h2 className="section-title">What Our Customers Say</h2>
              <p className="section-subtitle">Real stories from real shoppers</p>
            </div>
            <Testimonials />
          </div>
        </section>

        <section id="newsletter" className="section">
          <div className="container">
            <div className="section-header">
              <div className="badge" aria-hidden="true">Stay Updated</div>
              <h2 className="section-title">Get Exclusive Deals</h2>
              <p className="section-subtitle">Subscribe to our newsletter for the latest drops</p>
            </div>
            <NewsletterSignup />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
