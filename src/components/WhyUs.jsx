import React, { useEffect } from 'react';

const WhyUs = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.why-feature').forEach(el => observer.observe(el));
    document.querySelectorAll('.why-feature, .why-visual, .section-label, .section-title').forEach(el => {
      if (el.classList.contains('reveal')) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why">
      <div className="container">
        <p className="section-label reveal">Why Tut Wonders</p>
        <h2 className="section-title reveal">Crafted With Purpose,<br/>Delivered With Pride</h2>
        <div className="why-grid">
          <div className="why-visual reveal">
            <div className="why-card-main">
              <div className="big-stat">5+</div>
              <div className="big-stat-label">Years Building Digital Excellence</div>
              <div className="stat-row">
                <div className="stat-item">
                  <div className="stat-val">80+</div>
                  <div className="stat-lbl">Projects Delivered</div>
                </div>
                <div className="stat-item">
                  <div className="stat-val">40+</div>
                  <div className="stat-lbl">Happy Clients</div>
                </div>
                <div className="stat-item">
                  <div className="stat-val">98%</div>
                  <div className="stat-lbl">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
          <div className="why-features">
            <div className="why-feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div>
                <h3 className="feature-title">Quality Without Compromise</h3>
                <p className="feature-desc">Every project goes through rigorous review. We don't ship until it's excellent — tested across devices, optimized for speed, and ready to impress.</p>
              </div>
            </div>
            <div className="why-feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <h3 className="feature-title">On-Time Delivery</h3>
                <p className="feature-desc">We respect your timeline. Clear milestones, transparent communication, and a team that delivers on its commitments — every time.</p>
              </div>
            </div>
            <div className="why-feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <h3 className="feature-title">Dedicated Partnership</h3>
                <p className="feature-desc">You get a team invested in your success, not just a vendor completing tickets. We think about your goals, your users, and your long-term growth.</p>
              </div>
            </div>
            <div className="why-feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div>
                <h3 className="feature-title">Performance-First Approach</h3>
                <p className="feature-desc">Speed, accessibility, and search visibility built in from day one. Your digital presence is your first impression — we make it count.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;