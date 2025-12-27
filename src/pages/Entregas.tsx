import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DEMO_DELIVERIES, 
  DEMO_UNITS 
} from '@/data/mockData';
import { 
  Truck, 
  Search, 
  Filter,
  Eye,
  Calendar,
  MapPin,
  User,
  Package
} from 'lucide-react';
import { STATUS_LABELS, DeliveryStatus } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function Entregas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [unitFilter, setUnitFilter] = useState<string>('all');

  const filteredDeliveries = DEMO_DELIVERIES.filter(delivery => {
    const matchesSearch = 
      delivery.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.externalId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    const matchesUnit = unitFilter === 'all' || delivery.unitId === unitFilter;

    return matchesSearch && matchesStatus && matchesUnit;
  });

  const getStatusBadgeVariant = (status: DeliveryStatus) => {
    switch (status) {
      case 'DELIVERED_OK': return 'delivered';
      case 'DELIVERED_WITH_ISSUE': return 'issue';
      case 'REFUSED': return 'issue';
      case 'IN_TRANSIT': return 'transit';
      default: return 'pending';
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Entregas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as entregas programadas
          </p>
        </div>
        <Link to="/motorista">
          <Button variant="gradient" className="gap-2">
            <Truck className="w-4 h-4" />
            Registrar Canhoto
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card variant="glass" className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por NF, cliente ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="PENDING">Pendente</SelectItem>
                  <SelectItem value="IN_TRANSIT">Em Trânsito</SelectItem>
                  <SelectItem value="DELIVERED_OK">Entregue OK</SelectItem>
                  <SelectItem value="DELIVERED_WITH_ISSUE">Com Ressalva</SelectItem>
                  <SelectItem value="REFUSED">Recusado</SelectItem>
                  <SelectItem value="ABSENT">Cliente Ausente</SelectItem>
                </SelectContent>
              </Select>
              <Select value={unitFilter} onValueChange={setUnitFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas unidades</SelectItem>
                  {DEMO_UNITS.map(unit => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredDeliveries.length} entrega{filteredDeliveries.length !== 1 ? 's' : ''} encontrada{filteredDeliveries.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Deliveries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDeliveries.map((delivery, index) => (
          <Card 
            key={delivery.id}
            variant="elevated"
            className="hover:shadow-glow-sm transition-all duration-300 animate-fade-in cursor-pointer group"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-lg">{delivery.invoiceNo}</p>
                  <p className="text-sm text-muted-foreground">{delivery.externalId}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(delivery.status)}>
                  {STATUS_LABELS[delivery.status]}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{delivery.client?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {delivery.address.city}, {delivery.address.state}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {format(delivery.scheduledAt, "dd 'de' MMM, HH:mm", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {delivery.unit?.name}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Pedido: {delivery.orderNo}
                </span>
                <Button variant="ghost" size="sm" className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                  Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDeliveries.length === 0 && (
        <Card variant="outlined" className="mt-8">
          <CardContent className="py-16 text-center">
            <Truck className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma entrega encontrada</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros para encontrar entregas
            </p>
          </CardContent>
        </Card>
      )}
    </AppLayout>
  );
}
