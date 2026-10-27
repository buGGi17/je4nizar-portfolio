import React from 'react';
import { Cpu, Terminal, Shield, Sparkles, Network } from 'lucide-react';

interface HeroArtifactProps {
  transform: {
    x: number;
    y: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
  };
  accentColor: string;
  glowColor: string;
  activeId: string;
}

export const HeroArtifact: React.FC<HeroArtifactProps> = ({
  transform,
  accentColor,
  glowColor
}) => {
  return (
    <div className="artifact-stage">
      {/* Sombra proyectada volumétrica */}
      <div 
        className="artifact-shadow"
        style={{
          boxShadow: `0 40px 90px ${glowColor}`
        }}
      />

      {/* Prisma 3D con caras activas */}
      <div
        className="prism-cube"
        style={{
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) rotateZ(${transform.rotateZ}deg) scale3d(${transform.scale}, ${transform.scale}, ${transform.scale})`,
          transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Cara Frontal */}
        <div className="cube-face face-front" style={{ borderColor: accentColor }}>
          <div className="face-header">
            <Cpu size={24} color={accentColor} />
            <span className="face-code-tag">SYSTEM_CORE // v2.0</span>
          </div>

          <div className="face-center-visual">
            <div className="radial-core" style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }} />
            <Terminal size={48} color={accentColor} />
            <div className="face-handle">je4nizar</div>
          </div>

          <div className="face-footer">
            <div className="chip-led" style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
            <span>ACTIVE STATUS: ONLINE</span>
          </div>
        </div>

        {/* Cara Trasera */}
        <div className="cube-face face-back">
          <Network size={40} color="#64748b" />
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>EKS • CLOUD ENGINE</div>
        </div>

        {/* Cara Derecha */}
        <div className="cube-face face-right" style={{ borderColor: `${accentColor}66` }}>
          <Sparkles size={32} color={accentColor} />
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '8px' }}>AI AGENTS & APIS</div>
        </div>

        {/* Cara Izquierda */}
        <div className="cube-face face-left">
          <Shield size={32} color="#34d399" />
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '8px' }}>RESILIENCE & SEC</div>
        </div>

        {/* Cara Superior */}
        <div className="cube-face face-top" style={{ background: `rgba(15, 23, 42, 0.95)` }}>
          <div className="top-grid-lines" />
        </div>

        {/* Cara Inferior */}
        <div className="cube-face face-bottom" />
      </div>
    </div>
  );
};
