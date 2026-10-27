export interface K8sNodeDetail {
  id: string;
  name: string;
  category: 'control-plane' | 'worker-nodes' | 'networking' | 'storage' | 'observability' | 'security';
  badge: string;
  tagline: string;
  summary: string;
  devopsRole: string; // Qué hace el analista/DevOps aquí
  keyFeatures: string[];
  cliSnippet?: string;
  iconType: string;
}

export const K8S_ECOSYSTEM_DETAILS: Record<string, K8sNodeDetail> = {
  'api-server': {
    id: 'api-server',
    name: 'kube-apiserver',
    category: 'control-plane',
    badge: 'Core Gateway',
    tagline: 'La puerta principal y único punto de contacto del cluster',
    summary: 'Expone la API REST de Kubernetes. Valida y configura datos para pods, servicios, replication controllers y otros objetos. Es el único componente que interactúa directamente con etcd.',
    devopsRole: 'Configuración de RBAC, Webhooks de admisión (Opa/Kyverno) y autenticación IAM en AWS.',
    keyFeatures: ['Validación y mutación de manifests', 'Autenticación con OIDC / AWS IAM', 'Rate limiting y API scaling'],
    cliSnippet: 'kubectl get --raw /livez',
    iconType: 'server'
  },
  'etcd': {
    id: 'etcd',
    name: 'etcd Cluster',
    category: 'control-plane',
    badge: 'Consensus Store',
    tagline: 'Base de datos clave-valor distribuida y consistente',
    summary: 'Almacena el estado completo del cluster, configuración y secretos. Utiliza el algoritmo Raft para consenso distribuido y tolerancia a fallos.',
    devopsRole: 'Respaldos automatizados (etcd snapshots en S3) y cifrado de secretos en reposo (AWS KMS).',
    keyFeatures: ['Consenso Raft', 'Watch API para cambios de estado', 'Cifrado en reposo con KMS'],
    cliSnippet: 'etcdctl snapshot save backup.db',
    iconType: 'database'
  },
  'controller-manager': {
    id: 'controller-manager',
    name: 'kube-controller-manager',
    category: 'control-plane',
    badge: 'Reconciliation Loop',
    tagline: 'Mantiene el estado deseado frente al estado actual',
    summary: 'Ejecuta procesos de control que regulan el estado del cluster: Node Controller, ReplicaSet Controller, EndpointSlice Controller y ServiceAccount Controller.',
    devopsRole: 'Asegurar que si un Pod muere, se cree uno nuevo de inmediato sin intervención manual.',
    keyFeatures: ['Bucle continuo de reconciliación', 'Gestión de ciclo de vida de Pods y Nodos', 'Garbage collection'],
    cliSnippet: 'kubectl get deployments -w',
    iconType: 'refresh'
  },
  'scheduler': {
    id: 'scheduler',
    name: 'kube-scheduler',
    category: 'control-plane',
    badge: 'Placement Engine',
    tagline: 'Decide en qué nodo debe ejecutarse cada Pod',
    summary: 'Observa los Pods recién creados sin nodo asignado y selecciona el mejor Worker Node según requisitos de CPU, memoria, afinidad, tolerations y topología multi-AZ.',
    devopsRole: 'Configurar NodeAffinity, Taints/Tolerations y PodTopologySpreadConstraints para alta disponibilidad.',
    keyFeatures: ['Filtrado de nodos (Predicates)', 'Priorización de nodos (Priorities)', 'Evacuación de zonas de riesgo'],
    cliSnippet: 'kubectl describe pod -l app=users-api',
    iconType: 'cpu'
  },
  'kubelet': {
    id: 'kubelet',
    name: 'kubelet Agent',
    category: 'worker-nodes',
    badge: 'Node Supervisor',
    tagline: 'El agente principal que corre en cada Worker Node',
    summary: 'Se comunica con el API Server y se asegura de que los contenedores descritos en los PodSpecs estén corriendo y saludables a través del Container Runtime (containerd).',
    devopsRole: 'Monitorear la salud de los nodos, rotación de certificados y recolección de logs.',
    keyFeatures: ['CRI (Container Runtime Interface)', 'Liveness & Readiness Probes', 'Control de cgroups/recursos'],
    cliSnippet: 'systemctl status kubelet',
    iconType: 'cpu'
  },
  'kube-proxy': {
    id: 'kube-proxy',
    name: 'kube-proxy (iptables/IPVS)',
    category: 'networking',
    badge: 'Network Proxy',
    tagline: 'Enrutamiento de red y balanceo de carga interno',
    summary: 'Mantiene las reglas de red en los nodos para permitir la comunicación entre Pods y Services (ClusterIP/NodePort) mediante iptables o IPVS.',
    devopsRole: 'Optimizar latencia de red de microservicios usando AWS VPC CNI e IPVS en lugar de iptables masivos.',
    keyFeatures: ['Mapeo de ClusterIP a Pod IPs', 'Balanceo de carga TCP/UDP nivel 4', 'Soporte IPv4/IPv6 dual-stack'],
    cliSnippet: 'kubectl get daemonset kube-proxy -n kube-system',
    iconType: 'radio'
  },
  'ingress-alb': {
    id: 'ingress-alb',
    name: 'AWS Load Balancer Controller',
    category: 'networking',
    badge: 'Layer 7 Ingress',
    tagline: 'Ingreso externo con AWS ALB / NLB',
    summary: 'Aprovisiona y configura Application Load Balancers de AWS automáticamente cuando se crea un recurso Ingress en Kubernetes.',
    devopsRole: 'Enrutamiento basado en rutas (/api, /auth), terminación SSL con AWS Certificate Manager y WAF.',
    keyFeatures: ['Enrutamiento HTTP/HTTPS avanzado', 'Integración nativa con AWS ACM', 'Target binding por IP directa con VPC CNI'],
    cliSnippet: 'kubectl get ingress -A',
    iconType: 'globe'
  },
  'coredns': {
    id: 'coredns',
    name: 'CoreDNS Service',
    category: 'networking',
    badge: 'Service Discovery',
    tagline: 'Resolución de nombres interna para microservicios',
    summary: 'Servidor DNS interno escalable que resuelve nombres como `auth-service.default.svc.cluster.local` a las IPs activas de los pods.',
    devopsRole: 'Garantizar que microservicios se comuniquen por nombre sin IPs estáticas.',
    keyFeatures: ['DNS auto-registrado por servicio', 'Escalado horizontal con autoscaler', 'Autocaché de consultas'],
    cliSnippet: 'kubectl get pods -n kube-system -l k8s-app=kube-dns',
    iconType: 'radio'
  },
  'hpa-autoscaler': {
    id: 'hpa-autoscaler',
    name: 'Horizontal Pod Autoscaler (HPA)',
    category: 'observability',
    badge: 'Auto-Scaling',
    tagline: 'Escalado dinámico de réplicas en tiempo real',
    summary: 'Ajusta automáticamente el número de Pods según el consumo de CPU/RAM o métricas personalizadas (mensajes en cola SQS, peticiones por segundo).',
    devopsRole: 'Prevenir caídas por picos de tráfico y reducir costos en horas valle.',
    keyFeatures: ['Métricas CPU/RAM mediante metrics-server', 'KEDA para escalado por colas WhatsApp/RabbitMQ', 'Scale-to-zero'],
    cliSnippet: 'kubectl get hpa',
    iconType: 'refresh'
  },
  'container-storage': {
    id: 'container-storage',
    name: 'CSI Drivers (EBS & EFS)',
    category: 'storage',
    badge: 'Persistent Storage',
    tagline: 'Almacenamiento persistente en la nube',
    summary: 'Interfaz estándar de almacenamiento que permite conectar volúmenes de bloque AWS EBS o sistemas de archivos compartidos AWS EFS a los Pods.',
    devopsRole: 'Gestión de StorageClasses, aprovisionamiento dinámico de PVCs y retención de datos en bases de datos.',
    keyFeatures: ['ReadWriteOnce (EBS) y ReadWriteMany (EFS)', 'Snapshots automáticos', 'Encriptación por defecto'],
    cliSnippet: 'kubectl get pvc -A',
    iconType: 'hard-drive'
  }
};
