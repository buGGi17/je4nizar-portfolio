import { useState, useEffect } from 'react';
import { PORTFOLIO_SLIDES } from './data/portfolioData';
import { HeroArtifact } from './components/HeroArtifact';
import { K8sLabModal } from './components/K8sLabModal';
import { 
  ChevronRight, ChevronLeft, 
  MessageSquare, Terminal, Layers, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isLabOpen, setIsLabOpen] = useState(false);

  const currentSlide = PORTFOLIO_SLIDES[slideIndex];

  // Navegación por rueda del mouse / trackpad
  useEffect(() => {
    if (isLabOpen) return;

    let timer: number | null = null;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (timer !== null) return;

      if (e.deltaY > 25) {
        setSlideIndex((prev) => Math.min(prev + 1, PORTFOLIO_SLIDES.length - 1));
        timer = window.setTimeout(() => (timer = null), 650);
      } else if (e.deltaY < -25) {
        setSlideIndex((prev) => Math.max(prev - 1, 0));
        timer = window.setTimeout(() => (timer = null), 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timer !== null) clearTimeout(timer);
    };
  }, [isLabOpen]);

  return (
    <div className="portfolio-viewport">
      {/* Background Ambience */}
      <div 
        className="portfolio-glow-bg" 
        style={{
          background: `radial-gradient(circle at 60% 40%, ${currentSlide.glowColor} 0%, transparent 60%)`
        }} 
      />

      {/* Top Navbar */}
      <header className="portfolio-navbar">
        <div className="brand-logo">
          <Terminal size={18} color="#38bdf8" />
          <span className="brand-name">je4nizar</span>
          <span className="brand-dot">/&gt;</span>
        </div>

        <nav className="nav-links">
          <button 
            className="lab-trigger-btn"
            onClick={() => setIsLabOpen(true)}
          >
            <Layers size={16} />
            <span>K8s Architecture Lab</span>
            <span className="live-badge">INTERACTIVO</span>
          </button>

          <a 
            href="https://github.com/je4nizar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            aria-label="GitHub"
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>GH</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/je4nizar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            aria-label="LinkedIn"
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>IN</span>
          </a>
        </nav>
      </header>

      {/* Main Split Section: Typography + Central 3D Transforming Artifact */}
      <main className="portfolio-hero-container">
        {/* Left Column: Huge Editorial Kinetic Typography */}
        <div className="hero-text-pane">
          <div className="hero-category-tag" style={{ color: currentSlide.accentColor }}>
            <span className="tag-dot" style={{ background: currentSlide.accentColor }} />
            {currentSlide.tag}
          </div>

          <div className="headline-wrapper">
            <h1 className="hero-headline-main">{currentSlide.headlineMain}</h1>
            <h2 className="hero-headline-sub" style={{ WebkitTextStroke: `1px ${currentSlide.accentColor}` }}>
              {currentSlide.headlineSub}
            </h2>
          </div>

          <div className="hero-role-title">
            {currentSlide.roleTitle}
          </div>

          <p className="hero-description">
            {currentSlide.description}
          </p>

          <div className="hero-highlights-list">
            {currentSlide.highlights.map((item, idx) => (
              <div key={idx} className="highlight-item">
                <CheckCircle2 size={16} color={currentSlide.accentColor} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions-row">
            <button 
              className="primary-action-btn"
              style={{ background: currentSlide.accentColor }}
              onClick={() => setIsLabOpen(true)}
            >
              <span>Explorar Demo K8s</span>
              <ArrowUpRight size={18} />
            </button>

            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="secondary-action-btn"
            >
              <MessageSquare size={16} />
              <span>Contactar WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Isometric Transforming Core */}
        <div className="hero-visual-pane">
          <HeroArtifact 
            transform={currentSlide.artifactTransform}
            accentColor={currentSlide.accentColor}
            glowColor={currentSlide.glowColor}
            activeId={currentSlide.id}
          />
        </div>
      </main>

      {/* Bottom Floating Scrolly Indicator */}
      <footer className="portfolio-footer-nav">
        <div className="footer-dots-group">
          {PORTFOLIO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setSlideIndex(idx)}
              className={`footer-dot-pill ${idx === slideIndex ? 'active' : ''}`}
            >
              <span className="dot-number">0{idx + 1}</span>
              <span className="dot-name">{slide.tag.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="footer-arrow-controls">
          <button
            onClick={() => setSlideIndex((prev) => Math.max(prev - 1, 0))}
            disabled={slideIndex === 0}
            className="footer-nav-btn"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setSlideIndex((prev) => Math.min(prev + 1, PORTFOLIO_SLIDES.length - 1))}
            disabled={slideIndex === PORTFOLIO_SLIDES.length - 1}
            className="footer-nav-btn primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>

      {/* Laboratorio Completo de K8s Modal */}
      <K8sLabModal 
        isOpen={isLabOpen} 
        onClose={() => setIsLabOpen(false)} 
      />
    </div>
  );
}
