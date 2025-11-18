import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import BrandShowcase from './components/BrandShowcase';
import Categories from './components/Categories';
import CategoryTiles from './components/CategoryTiles';
import ProductRail from './components/ProductRail';
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

        <section id="top-deals" className="section">
          <div className="container">
            <div className="section-header">
              <div className="badge" aria-hidden="true">Hot Right Now</div>
              <h2 className="section-title">Top Deals</h2>
              <p className="section-subtitle">Biggest savings across bestsellers</p>
            </div>
            <div className="tiles-grid">
              {/* Inline large promotional tiles */}
              <div className="card image-card">
                <div className="image-wrap">
                  <svg className="image" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                      <linearGradient id="td1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#F59E0B" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#FFE9C2" />
                      </linearGradient>
                    </defs>
                    <rect width="800" height="500" fill="url(#td1)" />
                    <circle cx="680" cy="120" r="80" fill="#2563EB" opacity="0.25" />
                  </svg>
                  <div className="badge badge-on-image">Save 35%</div>
                </div>
                <div className="content">
                  <h3 className="img-title">Doorbuster: Gaming Laptops</h3>
                  <p className="img-subtitle">RTX graphics, high-refresh panels, epic deals</p>
                  <a href="#categories" className="btn btn-primary">Shop Gaming</a>
                </div>
              </div>

              <div className="card image-card">
                <div className="image-wrap">
                  <svg className="image" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                      <linearGradient id="td2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#93C5FD" stopOpacity="0.45" />
                        <stop offset="1" stopColor="#E5E7EB" />
                      </linearGradient>
                    </defs>
                    <rect width="800" height="500" fill="url(#td2)" />
                    <circle cx="140" cy="420" r="70" fill="#2563EB" opacity="0.25" />
                  </svg>
                  <div className="badge badge-on-image">Bundle</div>
                </div>
                <div className="content">
                  <h3 className="img-title">Remote Work Starter Pack</h3>
                  <p className="img-subtitle">Ultrabook + Dock + 27" Monitor</p>
                  <a href="#categories" className="btn btn-primary">Build Your Setup</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategoryTiles
          sectionId="trending"
          title="Trending Categories"
          items={[
            { title: 'Desktop & Laptop', subtitle: 'Workstations, gaming rigs, ultrabooks', href: '#categories', badge: 'Trending' },
            { title: 'Security Products', subtitle: 'CCTV, NVR, smart locks', href: '#categories', badge: 'New' },
            { title: 'Networking Solutions', subtitle: 'Routers, switches, mesh', href: '#categories', badge: 'Popular' },
          ]}
        />

        <ProductRail
          sectionId="featured-rail"
          title="Featured Products"
          products={[
            { name: 'Purpletech UltraBook 14"', price: '$999', href: '#', badge: 'Deal' },
            { name: 'Purpletech Gaming 15"', price: '$1,399', href: '#', badge: 'Hot' },
            { name: 'Wi‑Fi 6 Mesh Router', price: '$199', href: '#', badge: 'New' },
            { name: '4K Security Camera', price: '$129', href: '#', badge: 'Save' },
            { name: 'USB‑C Dock Pro', price: '$149', href: '#', badge: 'Top' },
          ]}
        />

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
