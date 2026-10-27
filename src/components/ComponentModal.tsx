import React from 'react';
import { K8sNodeDetail } from '../data/k8sEcosystem';
import { 
  X, Server, Database, RefreshCw, Cpu, 
  Radio, Globe, HardDrive, Terminal, CheckCircle2, ShieldCheck 
} from 'lucide-react';

interface ComponentModalProps {
  detail: K8sNodeDetail | null;
  onClose: () => void;
}

export const ComponentModal: React.FC<ComponentModalProps> = ({ detail, onClose }) => {
  if (!detail) return null;

  const renderIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server size={24} color="#818cf8" />;
      case 'database': return <Database size={24} color="#c084fc" />;
      case 'refresh': return <RefreshCw size={24} color="#38bdf8" />;
      case 'cpu': return <Cpu size={24} color="#34d399" />;
      case 'radio': return <Radio size={24} color="#f43f5e" />;
      case 'globe': return <Globe size={24} color="#38bdf8" />;
      default: return <HardDrive size={24} color="#fbbf24" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="modal-icon-badge">
              {renderIcon(detail.iconType)}
            </div>
            <div>
              <span className="modal-badge">{detail.badge}</span>
              <h2 className="modal-title">{detail.name}</h2>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-tagline">{detail.tagline}</div>

          <div className="modal-section">
            <h4>¿Qué hace este componente?</h4>
            <p>{detail.summary}</p>
          </div>

          <div className="modal-section highlight-box">
            <h4>
              <ShieldCheck size={18} color="#38bdf8" />
              Rol de Soporte TI & DevOps
            </h4>
            <p>{detail.devopsRole}</p>
          </div>

          <div className="modal-section">
            <h4>Características Clave</h4>
            <ul className="modal-features-list">
              {detail.keyFeatures.map((feat, i) => (
                <li key={i}>
                  <CheckCircle2 size={16} color="#34d399" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {detail.cliSnippet && (
            <div className="modal-section">
              <h4>
                <Terminal size={16} color="#94a3b8" />
                Comando / Verificación CLI
              </h4>
              <div className="modal-cli-code">
                <code>{detail.cliSnippet}</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
