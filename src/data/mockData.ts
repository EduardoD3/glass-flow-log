import { 
  Delivery, 
  DeliveryStatus, 
  ReceiptEvent, 
  Action, 
  FeedItem,
  DashboardKPIs,
  Client,
  Unit,
  User,
  Route
} from '@/types';

// Demo tenant
export const DEMO_TENANT = {
  id: 'tenant-1',
  name: 'VitralGlass Brasil',
  slug: 'vitralglass',
  createdAt: new Date('2024-01-01'),
};

// Demo units
export const DEMO_UNITS: Unit[] = [
  { id: 'unit-1', tenantId: 'tenant-1', name: 'Unidade Brasília', code: 'BSB' },
  { id: 'unit-2', tenantId: 'tenant-1', name: 'Unidade Goiânia', code: 'GYN' },
  { id: 'unit-3', tenantId: 'tenant-1', name: 'Unidade Uberlândia', code: 'UDI' },
];

// Demo users
export const DEMO_USERS: User[] = [
  { 
    id: 'user-1', 
    tenantId: 'tenant-1', 
    name: 'Carlos Admin', 
    email: 'carlos@vitralglass.com.br', 
    roleId: 'role-admin',
    isActive: true,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
  },
  { 
    id: 'user-2', 
    tenantId: 'tenant-1', 
    name: 'Ana Supervisora', 
    email: 'ana@vitralglass.com.br', 
    roleId: 'role-supervisor',
    isActive: true,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
  },
  { 
    id: 'user-3', 
    tenantId: 'tenant-1', 
    name: 'João Motorista', 
    email: 'joao@vitralglass.com.br', 
    roleId: 'role-driver',
    isActive: true,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao'
  },
  { 
    id: 'user-4', 
    tenantId: 'tenant-1', 
    name: 'Pedro Motorista', 
    email: 'pedro@vitralglass.com.br', 
    roleId: 'role-driver',
    isActive: true,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro'
  },
];

// Demo clients
export const DEMO_CLIENTS: Client[] = [
  { id: 'client-1', tenantId: 'tenant-1', name: 'Construtora Horizonte', document: '12.345.678/0001-90', contacts: { phone: '(61) 3333-1111', email: 'compras@horizonte.com.br' } },
  { id: 'client-2', tenantId: 'tenant-1', name: 'Vidraçaria Central', document: '23.456.789/0001-01', contacts: { phone: '(61) 3333-2222', whatsapp: '(61) 99999-2222' } },
  { id: 'client-3', tenantId: 'tenant-1', name: 'Arquitetura & Design Ltda', document: '34.567.890/0001-12', contacts: { phone: '(62) 3333-3333', email: 'projetos@arqdesign.com.br' } },
  { id: 'client-4', tenantId: 'tenant-1', name: 'Residencial Park Tower', document: '45.678.901/0001-23', contacts: { phone: '(62) 3333-4444' } },
  { id: 'client-5', tenantId: 'tenant-1', name: 'Shopping Center Goiânia', document: '56.789.012/0001-34', contacts: { phone: '(62) 3333-5555', email: 'facilities@shoppinggyn.com.br' } },
  { id: 'client-6', tenantId: 'tenant-1', name: 'Hotel Executive', document: '67.890.123/0001-45', contacts: { phone: '(34) 3333-6666' } },
  { id: 'client-7', tenantId: 'tenant-1', name: 'Clínica São Lucas', document: '78.901.234/0001-56', contacts: { phone: '(34) 3333-7777', email: 'administracao@saolucas.med.br' } },
  { id: 'client-8', tenantId: 'tenant-1', name: 'Supermercado Família', document: '89.012.345/0001-67', contacts: { phone: '(61) 3333-8888' } },
];

// Demo routes
export const DEMO_ROUTES: Route[] = [
  { id: 'route-1', tenantId: 'tenant-1', unitId: 'unit-1', date: new Date(), driverId: 'user-3', vehicle: 'VW Delivery ABC-1234', status: 'IN_PROGRESS' },
  { id: 'route-2', tenantId: 'tenant-1', unitId: 'unit-1', date: new Date(), driverId: 'user-4', vehicle: 'Mercedes Sprinter DEF-5678', status: 'IN_PROGRESS' },
  { id: 'route-3', tenantId: 'tenant-1', unitId: 'unit-2', date: new Date(), driverId: 'user-3', vehicle: 'Iveco Daily GHI-9012', status: 'PLANNED' },
];

// Generate demo deliveries
const generateDeliveries = (): Delivery[] => {
  const today = new Date();
  const statuses: DeliveryStatus[] = ['PENDING', 'IN_TRANSIT', 'DELIVERED_OK', 'DELIVERED_WITH_ISSUE', 'REFUSED', 'ABSENT'];
  
  const deliveries: Delivery[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const clientIndex = (i - 1) % DEMO_CLIENTS.length;
    const unitIndex = (i - 1) % DEMO_UNITS.length;
    const routeIndex = (i - 1) % DEMO_ROUTES.length;
    
    deliveries.push({
      id: `delivery-${i}`,
      tenantId: 'tenant-1',
      unitId: DEMO_UNITS[unitIndex].id,
      externalId: `ERP-2024-${String(i).padStart(5, '0')}`,
      clientId: DEMO_CLIENTS[clientIndex].id,
      routeId: DEMO_ROUTES[routeIndex].id,
      invoiceNo: `NF-${String(100000 + i)}`,
      orderNo: `PED-${String(50000 + i)}`,
      address: {
        street: `Rua das Flores`,
        number: String(100 + i * 10),
        complement: i % 3 === 0 ? 'Bloco A' : undefined,
        neighborhood: 'Centro',
        city: unitIndex === 0 ? 'Brasília' : unitIndex === 1 ? 'Goiânia' : 'Uberlândia',
        state: unitIndex === 0 ? 'DF' : unitIndex === 1 ? 'GO' : 'MG',
        zipCode: `${70000 + i * 100}-000`,
      },
      scheduledAt: today,
      status,
      createdAt: new Date(today.getTime() - i * 3600000),
      updatedAt: new Date(),
      client: DEMO_CLIENTS[clientIndex],
      unit: DEMO_UNITS[unitIndex],
      route: DEMO_ROUTES[routeIndex],
    });
  }
  
  return deliveries;
};

export const DEMO_DELIVERIES = generateDeliveries();

// Demo receipt events
export const DEMO_RECEIPT_EVENTS: ReceiptEvent[] = [
  {
    id: 'event-1',
    tenantId: 'tenant-1',
    deliveryId: 'delivery-3',
    createdByUserId: 'user-3',
    status: 'DELIVERED_OK',
    receiverName: 'Maria Silva',
    signedAt: new Date(),
    createdAt: new Date(Date.now() - 1800000),
    createdBy: DEMO_USERS[2],
  },
  {
    id: 'event-2',
    tenantId: 'tenant-1',
    deliveryId: 'delivery-5',
    createdByUserId: 'user-3',
    status: 'DELIVERED_WITH_ISSUE',
    reasonCode: 'AVARIA_VIDRO',
    notes: 'Vidro com trinco na lateral direita. Cliente aceitou com ressalva.',
    receiverName: 'José Santos',
    signedAt: new Date(),
    createdAt: new Date(Date.now() - 3600000),
    createdBy: DEMO_USERS[2],
  },
  {
    id: 'event-3',
    tenantId: 'tenant-1',
    deliveryId: 'delivery-7',
    createdByUserId: 'user-4',
    status: 'REFUSED',
    reasonCode: 'DIVERGENCIA_ITEM',
    notes: 'Cliente alega que pediu vidro temperado, mas recebeu comum.',
    createdAt: new Date(Date.now() - 7200000),
    createdBy: DEMO_USERS[3],
  },
];

// Demo actions
export const DEMO_ACTIONS: Action[] = [
  {
    id: 'action-1',
    tenantId: 'tenant-1',
    deliveryId: 'delivery-5',
    receiptEventId: 'event-2',
    type: 'REPAIR',
    priority: 'HIGH',
    status: 'OPEN',
    dueAt: new Date(Date.now() + 86400000),
    createdAt: new Date(Date.now() - 3500000),
    updatedAt: new Date(),
  },
  {
    id: 'action-2',
    tenantId: 'tenant-1',
    deliveryId: 'delivery-7',
    receiptEventId: 'event-3',
    type: 'REDELIVERY',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedToUserId: 'user-2',
    dueAt: new Date(Date.now() + 172800000),
    createdAt: new Date(Date.now() - 7000000),
    updatedAt: new Date(),
    assignedTo: DEMO_USERS[1],
  },
  {
    id: 'action-3',
    tenantId: 'tenant-1',
    deliveryId: 'delivery-10',
    type: 'CALL_CLIENT',
    priority: 'MEDIUM',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 14400000),
    updatedAt: new Date(),
  },
];

// Demo feed items
export const DEMO_FEED_ITEMS: FeedItem[] = [
  {
    id: 'feed-1',
    type: 'RECEIPT_EVENT',
    title: 'Canhoto registrado',
    description: 'Entrega NF-100003 confirmada por Maria Silva',
    timestamp: new Date(Date.now() - 1800000),
    status: 'DELIVERED_OK',
    deliveryId: 'delivery-3',
  },
  {
    id: 'feed-2',
    type: 'RECEIPT_EVENT',
    title: 'Ocorrência registrada',
    description: 'Entrega NF-100005 com avaria no vidro',
    timestamp: new Date(Date.now() - 3600000),
    priority: 'HIGH',
    status: 'DELIVERED_WITH_ISSUE',
    deliveryId: 'delivery-5',
  },
  {
    id: 'feed-3',
    type: 'ACTION_CREATED',
    title: 'Ação criada automaticamente',
    description: 'Conserto necessário para entrega NF-100005',
    timestamp: new Date(Date.now() - 3500000),
    priority: 'HIGH',
    actionId: 'action-1',
  },
  {
    id: 'feed-4',
    type: 'RECEIPT_EVENT',
    title: 'Entrega recusada',
    description: 'Cliente recusou NF-100007 - divergência de item',
    timestamp: new Date(Date.now() - 7200000),
    priority: 'HIGH',
    status: 'REFUSED',
    deliveryId: 'delivery-7',
  },
  {
    id: 'feed-5',
    type: 'ACTION_UPDATED',
    title: 'Ação atribuída',
    description: 'Ana Supervisora assumiu reenvio da NF-100007',
    timestamp: new Date(Date.now() - 6800000),
    actionId: 'action-2',
  },
];

// Dashboard KPIs
export const DEMO_KPIS: DashboardKPIs = {
  totalDeliveries: 20,
  deliveredOk: 12,
  deliveredWithIssue: 3,
  pending: 5,
  avgSlaMinutes: 45,
  percentOk: 60,
  percentIssue: 15,
};

// Find helpers
export const findDeliveryById = (id: string) => DEMO_DELIVERIES.find(d => d.id === id);
export const findClientById = (id: string) => DEMO_CLIENTS.find(c => c.id === id);
export const findUserById = (id: string) => DEMO_USERS.find(u => u.id === id);
export const findUnitById = (id: string) => DEMO_UNITS.find(u => u.id === id);
