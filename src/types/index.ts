// Core types for CanhotoLive

export type DeliveryStatus = 
  | 'PENDING' 
  | 'IN_TRANSIT' 
  | 'DELIVERED_OK' 
  | 'DELIVERED_WITH_ISSUE' 
  | 'REFUSED' 
  | 'ABSENT' 
  | 'RESCHEDULED';

export type ReasonCode = 
  | 'AVARIA_VIDRO'
  | 'EMBALAGEM_DANIFICADA'
  | 'DIVERGENCIA_ITEM'
  | 'CLIENTE_AUSENTE'
  | 'ENDERECO_INCORRETO'
  | 'RECUSA_SEM_MOTIVO'
  | 'OUTROS';

export type ActionType = 'REDELIVERY' | 'REPAIR' | 'COLLECT' | 'CALL_CLIENT';
export type ActionStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export type AttachmentType = 'PHOTO' | 'SIGNATURE' | 'DOCUMENT';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

export interface Unit {
  id: string;
  tenantId: string;
  name: string;
  code: string;
}

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  roleId: string;
  isActive: boolean;
  avatarUrl?: string;
}

export interface Role {
  id: string;
  tenantId: string;
  name: string;
  permissions: string[];
}

export interface Client {
  id: string;
  tenantId: string;
  name: string;
  document?: string;
  contacts: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Route {
  id: string;
  tenantId: string;
  unitId: string;
  date: Date;
  driverId?: string;
  vehicle?: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Delivery {
  id: string;
  tenantId: string;
  unitId: string;
  externalId: string;
  clientId: string;
  routeId?: string;
  invoiceNo: string;
  orderNo: string;
  address: Address;
  scheduledAt: Date;
  status: DeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
  // Joined data
  client?: Client;
  route?: Route;
  unit?: Unit;
  receiptEvents?: ReceiptEvent[];
  actions?: Action[];
}

export interface ReceiptEvent {
  id: string;
  tenantId: string;
  deliveryId: string;
  createdByUserId: string;
  status: DeliveryStatus;
  reasonCode?: ReasonCode;
  notes?: string;
  receiverName?: string;
  signedAt?: Date;
  geoLat?: number;
  geoLng?: number;
  createdAt: Date;
  // Joined data
  createdBy?: User;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  tenantId: string;
  receiptEventId: string;
  type: AttachmentType;
  url: string;
  mimeType: string;
  size: number;
  checksum?: string;
  createdAt: Date;
}

export interface Action {
  id: string;
  tenantId: string;
  deliveryId: string;
  receiptEventId?: string;
  type: ActionType;
  priority: Priority;
  status: ActionStatus;
  assignedToUserId?: string;
  dueAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Joined data
  delivery?: Delivery;
  assignedTo?: User;
}

export interface WebhookEndpoint {
  id: string;
  tenantId: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
}

export interface IntegrationLog {
  id: string;
  tenantId: string;
  provider: 'ERP' | 'WEBHOOK';
  eventType: string;
  request: Record<string, unknown>;
  response: Record<string, unknown>;
  statusCode: number;
  success: boolean;
  errorMessage?: string;
  createdAt: Date;
}

export interface ApiKey {
  id: string;
  tenantId: string;
  name: string;
  keyHash: string;
  scopes: string[];
  lastUsedAt?: Date;
}

// Dashboard KPIs
export interface DashboardKPIs {
  totalDeliveries: number;
  deliveredOk: number;
  deliveredWithIssue: number;
  pending: number;
  avgSlaMinutes: number;
  percentOk: number;
  percentIssue: number;
}

// Feed item for real-time updates
export interface FeedItem {
  id: string;
  type: 'RECEIPT_EVENT' | 'ACTION_CREATED' | 'ACTION_UPDATED' | 'DELIVERY_STATUS';
  title: string;
  description: string;
  timestamp: Date;
  priority?: Priority;
  status?: DeliveryStatus | ActionStatus;
  deliveryId?: string;
  actionId?: string;
}

// Reason code labels
export const REASON_CODE_LABELS: Record<ReasonCode, string> = {
  AVARIA_VIDRO: 'Avaria no Vidro',
  EMBALAGEM_DANIFICADA: 'Embalagem Danificada',
  DIVERGENCIA_ITEM: 'Divergência de Item',
  CLIENTE_AUSENTE: 'Cliente Ausente',
  ENDERECO_INCORRETO: 'Endereço Incorreto',
  RECUSA_SEM_MOTIVO: 'Recusa sem Motivo',
  OUTROS: 'Outros',
};

export const STATUS_LABELS: Record<DeliveryStatus, string> = {
  PENDING: 'Pendente',
  IN_TRANSIT: 'Em Trânsito',
  DELIVERED_OK: 'Entregue OK',
  DELIVERED_WITH_ISSUE: 'Entregue com Ressalva',
  REFUSED: 'Recusado',
  ABSENT: 'Cliente Ausente',
  RESCHEDULED: 'Reagendado',
};

export const ACTION_TYPE_LABELS: Record<ActionType, string> = {
  REDELIVERY: 'Reenvio',
  REPAIR: 'Conserto',
  COLLECT: 'Coleta',
  CALL_CLIENT: 'Contato Cliente',
};

export const ACTION_STATUS_LABELS: Record<ActionStatus, string> = {
  OPEN: 'Aberta',
  IN_PROGRESS: 'Em Andamento',
  DONE: 'Concluída',
  CANCELED: 'Cancelada',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
};
