import React from 'react';
import { 
  Server, Shield, Globe, Cpu, Database, 
  Layers, HardDrive, RefreshCw, KeyRound, Radio, Info, Activity 
} from 'lucide-react';

interface NativeDiagramProps {
  activeSegment?: string;
  isTransitioning?: boolean;
  sourceSegment?: string;
  targetSegment?: string;
  onSelectComponent: (id: string) => void;
}

export const NativeDiagram: React.FC<NativeDiagramProps> = ({ 
  activeSegment, 
  isTransitioning,
  targetSegment,
  onSelectComponent 
}) => {
  return (
    <div className="diagram-canvas">
      {/* 1. EKS Control Plane (Top Box) */}
      <div className={`arch-block control-plane-box ${activeSegment === 'control-plane' ? 'active-focus' : ''}`}>
        <div className="block-header" style={{ color: '#a5b4fc', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server size={18} />
            <span>Amazon EKS Control Plane (AWS Managed)</span>
          </div>
          <span className="click-hint">Clic en un componente para detalles</span>
        </div>

        <div className="cp-components-grid">
          {/* kube-apiserver */}
          <div 
            className={`node-chip interactive ${activeSegment === 'control-plane' ? 'highlight' : ''}`}
            onClick={() => onSelectComponent('api-server')}
          >
            <Server size={22} color="#818cf8" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>kube-apiserver</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>REST API Gateway</div>
            </div>
            <Info size={14} className="info-icon" />
          </div>

          {/* etcd Cluster */}
          <div 
            className={`node-chip interactive ${activeSegment === 'control-plane' ? 'highlight' : ''}`}
            onClick={() => onSelectComponent('etcd')}
          >
            <Database size={22} color="#c084fc" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>etcd Cluster</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Distributed State</div>
            </div>
            <Info size={14} className="info-icon" />
          </div>

          {/* kube-controller-manager */}
          <div 
            className={`node-chip interactive ${activeSegment === 'control-plane' ? 'highlight' : ''}`}
            onClick={() => onSelectComponent('controller-manager')}
          >
            <RefreshCw size={22} color="#38bdf8" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>kube-controller-manager</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Reconciliation Loops</div>
            </div>
            <Info size={14} className="info-icon" />
          </div>

          {/* kube-scheduler */}
          <div 
            className={`node-chip interactive ${activeSegment === 'control-plane' ? 'highlight' : ''}`}
            onClick={() => onSelectComponent('scheduler')}
          >
            <Cpu size={22} color="#34d399" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>kube-scheduler</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Pod Placement & Affinity</div>
            </div>
            <Info size={14} className="info-icon" />
          </div>
        </div>
      </div>

      {/* 2. Amazon VPC Box */}
      <div className="arch-block vpc-box">
        {/* Public Subnet (Ingress & Networking) */}
        <div className={`arch-block public-subnet ${activeSegment === 'ingress' ? 'active-focus' : ''}`}>
          <div className="block-header" style={{ color: '#34d399', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} />
              <span>Public Subnet (DMZ)</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: '#6ee7b7' }}>10.0.1.0/24</span>
          </div>

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* AWS ALB */}
            <div 
              className={`node-chip interactive ${activeSegment === 'ingress' ? 'highlight' : ''}`}
              onClick={() => onSelectComponent('ingress-alb')}
            >
              <Globe size={22} color="#38bdf8" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>AWS Load Balancer Controller</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>L7 ALB / NLB Ingress</div>
              </div>
              <Info size={14} className="info-icon" />
            </div>

            {/* CoreDNS */}
            <div 
              className={`node-chip interactive ${activeSegment === 'ingress' ? 'highlight' : ''}`}
              onClick={() => onSelectComponent('coredns')}
            >
              <Radio size={22} color="#34d399" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>CoreDNS Discovery</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Internal Cluster DNS</div>
              </div>
              <Info size={14} className="info-icon" />
            </div>

            {/* kube-proxy */}
            <div 
              className={`node-chip interactive ${activeSegment === 'ingress' ? 'highlight' : ''}`}
              onClick={() => onSelectComponent('kube-proxy')}
            >
              <Activity size={22} color="#f59e0b" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>kube-proxy</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>iptables / IPVS Router</div>
              </div>
              <Info size={14} className="info-icon" />
            </div>

            <div className="node-chip">
              <Shield size={20} color="#fbbf24" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>NAT Gateway</div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Egress Internet Only</div>
              </div>
            </div>
          </div>
        </div>

        {/* Private Subnet (Multi-AZ Worker Nodes & Microservices) */}
        <div className={`arch-block private-subnet ${activeSegment === 'workers' || activeSegment === 'storage' ? 'active-focus' : ''}`}>
          <div className="block-header" style={{ color: '#c084fc', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={18} />
              <span>Private Subnets (Workloads, Pods & Persistencia)</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span className="badge-pill" onClick={() => onSelectComponent('hpa-autoscaler')}>
                <RefreshCw size={12} /> HPA Activo
              </span>
              <span className="badge-pill" onClick={() => onSelectComponent('kubelet')}>
                <Cpu size={12} /> kubelet Supervised
              </span>
            </div>
          </div>

          <div className="az-columns">
            {/* AZ 1: Worker Node 1 */}
            <div className="az-col">
              <div className="az-col-title">Worker Node 1 (AZ us-east-1a)</div>
              
              <div 
                className={`pod-card interactive ${activeSegment === 'workers' ? 'active-focus' : ''}`}
                onClick={() => onSelectComponent('kubelet')}
              >
                <Cpu size={16} color="#f43f5e" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Auth Microservice (Go)</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>JWT Verification • 3 Pods</div>
                </div>
              </div>

              <div 
                className={`pod-card interactive ${activeSegment === 'workers' ? 'active-focus' : ''}`}
                onClick={() => onSelectComponent('hpa-autoscaler')}
              >
                <RefreshCw size={16} color="#38bdf8" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Users API (NodeJS)</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>HPA Auto-scaling • Port 3000</div>
                </div>
              </div>

              <div 
                className={`pod-card interactive ${activeSegment === 'storage' ? 'active-focus' : ''}`} 
                style={{ marginTop: 'auto', borderColor: '#38bdf8' }}
                onClick={() => onSelectComponent('container-storage')}
              >
                <HardDrive size={16} color="#38bdf8" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>CSI Driver EBS Volume</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>gp3 Provisioned IOPS</div>
                </div>
              </div>
            </div>

            {/* AZ 2: Worker Node 2 */}
            <div className="az-col">
              <div className="az-col-title">Worker Node 2 (AZ us-east-1b)</div>
              
              <div 
                className={`pod-card interactive ${activeSegment === 'workers' ? 'active-focus' : ''}`}
                onClick={() => onSelectComponent('kubelet')}
              >
                <Cpu size={16} color="#f43f5e" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Orders API (Python)</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Event Driven • 2 Pods</div>
                </div>
              </div>

              <div 
                className={`pod-card interactive ${activeSegment === 'workers' ? 'active-focus' : ''}`}
                onClick={() => onSelectComponent('hpa-autoscaler')}
              >
                <Activity size={16} color="#10b981" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Notification Worker</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>SQS Consumer • Celery</div>
                </div>
              </div>

              <div 
                className={`pod-card interactive ${activeSegment === 'storage' ? 'active-focus' : ''}`} 
                style={{ marginTop: 'auto', borderColor: '#38bdf8' }}
                onClick={() => onSelectComponent('container-storage')}
              >
                <HardDrive size={16} color="#38bdf8" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>AWS EFS Shared Storage</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>ReadWriteMany (RWX)</div>
                </div>
              </div>
            </div>

            {/* AZ 3: Persistence & Secrets */}
            <div className="az-col">
              <div className="az-col-title">Data Layer & Security (Multi-AZ)</div>
              
              <div 
                className={`pod-card interactive ${activeSegment === 'storage' ? 'active-focus' : ''}`} 
                style={{ borderColor: '#a78bfa' }}
                onClick={() => onSelectComponent('container-storage')}
              >
                <Database size={16} color="#a78bfa" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Amazon RDS Aurora</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>PostgreSQL Primary + Replica</div>
                </div>
              </div>

              <div 
                className="pod-card interactive" 
                style={{ borderColor: '#a78bfa' }}
                onClick={() => onSelectComponent('api-server')}
              >
                <KeyRound size={16} color="#a78bfa" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>AWS Secrets Manager</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>CSI Secrets Store Driver</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Dynamic Cable Connections Layer:
             - Líneas fijas estables en reposo
             - Flecha / pulso que viaja SOLO de forma momentánea durante la transición */}
      <svg className="cable-layer" viewBox="0 0 1200 850">
        <defs>
          <linearGradient id="activeEnergyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="neonPulseGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cable 1: Control Plane a Public Subnet ALB */}
        <path
          d="M 600,170 C 600,240 190,230 190,320"
          className="fixed-line"
        />
        {/* Flecha momentánea que viaja sólo al pasar a Ingress */}
        {isTransitioning && targetSegment === 'ingress' && (
          <path
            d="M 600,170 C 600,240 190,230 190,320"
            className="transient-arrow"
            filter="url(#neonPulseGlow)"
          />
        )}

        {/* Cable 2: ALB a Private Subnet Workers */}
        <path
          d="M 330,420 C 390,420 410,440 450,440"
          className="fixed-line"
        />
        {/* Flecha momentánea que viaja sólo al pasar a Workers */}
        {isTransitioning && targetSegment === 'workers' && (
          <path
            d="M 330,420 C 390,420 410,440 450,440"
            className="transient-arrow"
            filter="url(#neonPulseGlow)"
          />
        )}

        {/* Cable 3: Workers a Storage / Database */}
        <path
          d="M 720,620 L 780,620"
          className="fixed-line"
        />
        {isTransitioning && targetSegment === 'storage' && (
          <path
            d="M 720,620 L 780,620"
            className="transient-arrow"
            filter="url(#neonPulseGlow)"
          />
        )}
      </svg>
    </div>
  );
};
