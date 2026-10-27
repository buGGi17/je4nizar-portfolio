import React from 'react';
import { NativeDiagram } from './NativeDiagram';
import { ComponentModal } from './ComponentModal';
import { TOUR_STEPS } from '../data/architectureSteps';
import { K8S_ECOSYSTEM_DETAILS, K8sNodeDetail } from '../data/k8sEcosystem';
import { Layers, ChevronRight, ChevronLeft, ShieldCheck, Compass, X } from 'lucide-react';

interface K8sLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const K8sLabModal: React.FC<K8sLabModalProps> = ({ isOpen, onClose }) => {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [selectedDetail, setSelectedDetail] = React.useState<K8sNodeDetail | null>(null);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });

  const step = TOUR_STEPS[stepIndex];

  React.useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changeStep = (newIndex: number) => {
    if (newIndex === stepIndex) return;
    setIsTransitioning(true);
    setStepIndex(newIndex);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  React.useEffect(() => {
    if (!isOpen) return;
    let timer: number | null = null;
    const handleWheel = (e: WheelEvent) => {
      if (selectedDetail) return;
      e.preventDefault();
      if (timer !== null) return;

      if (e.deltaY > 20) {
        changeStep(Math.min(stepIndex + 1, TOUR_STEPS.length - 1));
        timer = window.setTimeout(() => (timer = null), 650);
      } else if (e.deltaY < -20) {
        changeStep(Math.max(stepIndex - 1, 0));
        timer = window.setTimeout(() => (timer = null), 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timer !== null) clearTimeout(timer);
    };
  }, [isOpen, stepIndex, selectedDetail]);

  if (!isOpen) return null;

  const CANVAS_WIDTH = 1240;
  const CANVAS_HEIGHT = 880;
  const availableHeight = windowSize.h - 100;
  const baseScale = Math.min((windowSize.w * 0.92) / CANVAS_WIDTH, (availableHeight * 0.88) / CANVAS_HEIGHT);
  const targetScale = step.zoom * baseScale;
  const targetX = windowSize.w / 2 - step.focusX * targetScale;
  const targetY = (windowSize.h - 90) / 2 - step.focusY * targetScale;

  return (
    <div className="lab-fullscreen-overlay">
      {/* Blueprint Grid */}
      <div className="blueprint-grid" />

      {/* Close Lab Header */}
      <nav className="hud-nav">
        <div className="hud-pill">
          <Layers size={16} />
          <span>Interactive DevOps Lab • Kubernetes Ecosystem</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', pointerEvents: 'auto' }}>
          <div className="hud-pill" style={{ color: '#94a3b8' }}>
            <ShieldCheck size={16} color="#34d399" />
            <span>Fase {stepIndex + 1} de {TOUR_STEPS.length}</span>
          </div>
          <button className="lab-close-btn" onClick={onClose} aria-label="Volver al Portfolio">
            <X size={18} />
            <span>Volver</span>
          </button>
        </div>
      </nav>

      {/* Canvas */}
      <div
        style={{
          transform: `translate(${targetX}px, ${targetY}px) scale(${targetScale})`
        }}
        className="diagram-canvas"
      >
        <NativeDiagram 
          activeSegment={step.activeSegment}
          isTransitioning={isTransitioning}
          targetSegment={step.targetSegment}
          onSelectComponent={(id) => setSelectedDetail(K8S_ECOSYSTEM_DETAILS[id] || null)}
        />
      </div>

      {/* Scrollytelling Narrative Card */}
      <div className="scrolly-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
            {step.badge}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => changeStep(Math.max(stepIndex - 1, 0))}
              disabled={stepIndex === 0}
              className="nav-arrow-btn"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => changeStep(Math.min(stepIndex + 1, TOUR_STEPS.length - 1))}
              disabled={stepIndex === TOUR_STEPS.length - 1}
              className="nav-arrow-btn primary"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <h3>{step.title}</h3>
        <p>{step.description}</p>

        <div className="step-indicator">
          {TOUR_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`step-dot ${idx === stepIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="scroll-hint">
          <Compass size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Haz clic en cualquier nodo para ver detalles técnicos • Rueda de mouse para avanzar/retroceder
        </div>
      </div>

      {/* Modal de Detalle */}
      <ComponentModal 
        detail={selectedDetail} 
        onClose={() => setSelectedDetail(null)} 
      />
    </div>
  );
};
