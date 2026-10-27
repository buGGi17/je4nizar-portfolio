export interface WalkthroughStep {
  id: string;
  badge: string;
  title: string;
  description: string;
  focusX: number;
  focusY: number;
  zoom: number;
  activeSegment?: 'control-plane' | 'ingress' | 'workers' | 'storage';
  sourceSegment?: string;
  targetSegment?: string;
}

export const TOUR_STEPS: WalkthroughStep[] = [
  {
    id: 'overview',
    badge: 'Arquitectura Global',
    title: 'Ecosistema Completo de Kubernetes en AWS',
    description: 'Diagrama interactivo de microservicios. Puedes hacer clic en cualquiera de los componentes para ver su ficha técnica detallada (kube-apiserver, etcd, CoreDNS, Pods, ALB).',
    focusX: 620,
    focusY: 440,
    zoom: 0.95
  },
  {
    id: 'control-plane',
    badge: 'Fase 1: Control Plane',
    title: 'EKS Control Plane (AWS Managed)',
    description: 'El cerebro de orquestación. El API Server recibe despliegues, etcd guarda la base de datos de estado, y Scheduler asigna los Pods según disponibilidad de hardware.',
    focusX: 620,
    focusY: 100,
    zoom: 1.85,
    activeSegment: 'control-plane'
  },
  {
    id: 'ingress',
    badge: 'Fase 2: Red & Entrada a VPC',
    title: 'Internet Gateway a Public Subnet',
    description: 'Ingreso del tráfico externo. Las peticiones HTTPS llegan por Internet Gateway hacia el AWS Application Load Balancer y CoreDNS resuelve las peticiones entre pods.',
    focusX: 200,
    focusY: 510,
    zoom: 2.1,
    activeSegment: 'ingress',
    sourceSegment: 'control-plane',
    targetSegment: 'ingress'
  },
  {
    id: 'workers',
    badge: 'Fase 3: Cargas de Trabajo',
    title: 'Private Subnets & Multi-AZ Worker Nodes',
    description: 'Subredes privadas sin IP pública. En cada Worker Node corre un kubelet supervisando los Pods de microservicios, asistido por HPA para escalado automático.',
    focusX: 780,
    focusY: 500,
    zoom: 1.8,
    activeSegment: 'workers',
    sourceSegment: 'ingress',
    targetSegment: 'workers'
  },
  {
    id: 'storage',
    badge: 'Fase 4: Almacenamiento & Datos',
    title: 'Persistencia con CSI Driver (EBS & EFS)',
    description: 'Volúmenes elásticos atados a bases de datos (RDS Aurora) y almacenamiento compartido EFS para microservicios con persistencia stateful.',
    focusX: 780,
    focusY: 670,
    zoom: 2.1,
    activeSegment: 'storage',
    sourceSegment: 'workers',
    targetSegment: 'storage'
  }
];
