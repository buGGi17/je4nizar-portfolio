export interface PortfolioSlide {
  id: string;
  tag: string;
  headlineMain: string;
  headlineSub: string;
  roleTitle: string;
  description: string;
  highlights: string[];
  // Transformaciones 3D del prisma/artefacto central
  artifactTransform: {
    x: number;       // px
    y: number;       // px
    rotateX: number; // deg
    rotateY: number; // deg
    rotateZ: number; // deg
    scale: number;
  };
  accentColor: string;
  glowColor: string;
}

export const PORTFOLIO_SLIDES: PortfolioSlide[] = [
  {
    id: 'intro',
    tag: 'IT ANALYST & SYSTEMS',
    headlineMain: 'JEAN PIERRE',
    headlineSub: 'IZARRA',
    roleTitle: 'Analista de Sistemas & Soporte de TI',
    description: 'Diagnóstico profundo, alta disponibilidad y resolución metódica de incidentes en infraestructura tecnológica y redes corporativas.',
    highlights: ['Troubleshooting de Sistemas & OS', 'Networking & Firewalls', 'SLA de Alta Disponibilidad'],
    artifactTransform: {
      x: 0,
      y: 0,
      rotateX: 12,
      rotateY: -22,
      rotateZ: 0,
      scale: 1.05
    },
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)'
  },
  {
    id: 'ai-automation',
    tag: 'INTELLIGENT WORKFLOWS',
    headlineMain: 'AUTOMATIZACIÓN',
    headlineSub: 'CON IA & CHATBOTS',
    roleTitle: 'Desarrollador de Bots & Integraciones',
    description: 'Diseño e implementación de asistentes conversacionales con IA conectados a WhatsApp Business API, webhook pipelines y bases de datos.',
    highlights: ['WhatsApp Cloud API & Webhooks', 'Agentes IA & Prompt Engineering', 'Automatización n8n / Python'],
    artifactTransform: {
      x: 140,
      y: -20,
      rotateX: -15,
      rotateY: 35,
      rotateZ: 6,
      scale: 1.15
    },
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.45)'
  },
  {
    id: 'devops-cloud',
    tag: 'MODERN INFRASTRUCTURE',
    headlineMain: 'DEVOPS & CLOUD',
    headlineSub: 'ARCHITECTURE',
    roleTitle: 'DevOps Explorer & Kubernetes Practitioner',
    description: 'Contenedores Docker, manifiestos K8s multi-AZ, microservicios resilientes y CI/CD. Creador del laboratorio interactivo de arquitectura en la nube.',
    highlights: ['Kubernetes Multi-AZ & EKS', 'Docker & Container Runtimes', 'CI/CD Pipelines & Observabilidad'],
    artifactTransform: {
      x: -160,
      y: 30,
      rotateX: 20,
      rotateY: -45,
      rotateZ: -10,
      scale: 1.2
    },
    accentColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.5)'
  }
];
