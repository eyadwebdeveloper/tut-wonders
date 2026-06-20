import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./App.css";

// Import Components
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brand from "./components/brand";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import TechStack from "./components/TechStack";
import Testimonials from "./components/Testimonials";
import CtaBand from "./components/CtaBand";
import Apply from "./components/Apply";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectBot from "./components/ProjectBot";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>TUT WONDERS – Digital Excellence</title>
        <meta
          name="description"
          content="Tut Wonders – Turning Ideas into Digital Reality. We specialize in mobile application development, website design and development, UI/UX design, and AI-powered solutions that help businesses innovate, grow, and succeed in the digital world."
        />
        <meta
          name="keywords"
          content="web development, mobile apps, UI/UX design, digital strategy, e-commerce, Egypt"
        />
        <meta name="author" content="Eyad Ashraf" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:title" content="TUT WONDERS – Digital Excellence" />
        <meta
          property="og:description"
          content="Digital solutions built with the precision of ancient craftsmen and the power of modern technology."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="TUT WONDERS" />
        <meta
          property="og:description"
          content="Tut Wonders – Turning Ideas into Digital Reality. We specialize in mobile application development, website design and development, UI/UX design, and AI-powered solutions that help businesses innovate, grow, and succeed in the digital world."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://tutwonders.com/src/images/tutwonders-logo.jpg"
        />
        <meta property="og:url" content="https://tutwonders.com" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TUT WONDERS" />
        <meta
          name="twitter:description"
          content="Tut Wonders – Turning Ideas into Digital Reality. We specialize in mobile application development, website design and development, UI/UX design, and AI-powered solutions that help businesses innovate, grow, and succeed in the digital world."
        />
        <meta
          name="twitter:image"
          content="https://tutwonders.com/src/images/tutwonders-logo.jpg"
        />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TUT WONDERS",
            url: "https://tutwonders.com",
            logo: "https://tutwonders.com/src/images/tutwonders-logo.jpg",
            sameAs: [
              "https://www.facebook.com/TutWonders",
              "https://twitter.com/TutWonders",
              "https://www.linkedin.com/company/tutwonders",
            ],
          })}
        </script>
        <html lang="en" />
      </Helmet>

      <Loader loading={loading} />

      <div
        className="app"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.6s ease" }}
      >
        <Navbar />
        <Hero />
        <Brand />
        <Services />
        <div className="divider"></div>
        <WhyUs />
        <div className="divider"></div>
        <Process />
        <div className="divider"></div>
        <TechStack />
        <Testimonials />
        <CtaBand />
        <Apply />
        <Contact />
        <Footer />
      </div>

      {/* AI Project Assistant — always mounted, floats above everything */}
      <ProjectBot />
    </>
  );
}

export default App;