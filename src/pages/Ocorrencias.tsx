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
  DEMO_RECEIPT_EVENTS, 
  DEMO_DELIVERIES
} from '@/data/mockData';
import { 
  AlertTriangle, 
  Search, 
  Eye,
  Clock,
  FileText,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { REASON_CODE_LABELS, STATUS_LABELS, DeliveryStatus, ReasonCode } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Ocorrencias() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reasonFilter, setReasonFilter] = useState<string>('all');

  // Filter only events with issues
  const issueEvents = DEMO_RECEIPT_EVENTS.filter(e => 
    e.status === 'DELIVERED_WITH_ISSUE' || 
    e.status === 'REFUSED' || 
    e.status === 'ABSENT'
  );

  const filteredEvents = issueEvents.filter(event => {
    const delivery = DEMO_DELIVERIES.find(d => d.id === event.deliveryId);
    const matchesSearch = 
      delivery?.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery?.client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesReason = reasonFilter === 'all' || event.reasonCode === reasonFilter;

    return matchesSearch && matchesReason;
  });

  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case 'DELIVERED_WITH_ISSUE':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'REFUSED':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'ABSENT':
        return <Clock className="w-5 h-5 text-muted-foreground" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusBadgeVariant = (status: DeliveryStatus) => {
    switch (status) {
      case 'DELIVERED_WITH_ISSUE': return 'warning';
      case 'REFUSED': return 'issue';
      case 'ABSENT': return 'pending';
      default: return 'secondary';
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Ocorrências</h1>
          <p className="text-muted-foreground">
            Gerencie entregas com problemas e ressalvas
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {issueEvents.filter(e => e.status === 'DELIVERED_WITH_ISSUE').length}
              </p>
              <p className="text-xs text-muted-foreground">Com Ressalva</p>
            </div>
          </div>
        </Card>
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {issueEvents.filter(e => e.status === 'REFUSED').length}
              </p>
              <p className="text-xs text-muted-foreground">Recusadas</p>
            </div>
          </div>
        </Card>
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {issueEvents.filter(e => e.status === 'ABSENT').length}
              </p>
              <p className="text-xs text-muted-foreground">Cliente Ausente</p>
            </div>
          </div>
        </Card>
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{issueEvents.length}</p>
              <p className="text-xs text-muted-foreground">Total Hoje</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass" className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por NF, cliente ou observação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os motivos</SelectItem>
                  {Object.entries(REASON_CODE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Occurrences List */}
      <div className="space-y-4">
        {filteredEvents.map((event, index) => {
          const delivery = DEMO_DELIVERIES.find(d => d.id === event.deliveryId);
          
          return (
            <Card 
              key={event.id}
              variant="elevated"
              className="hover:shadow-glow-sm transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Icon and Status */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      event.status === 'REFUSED' ? 'bg-destructive/10' :
                      event.status === 'DELIVERED_WITH_ISSUE' ? 'bg-warning/10' :
                      'bg-muted'
                    }`}>
                      {getStatusIcon(event.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <p className="font-semibold">{delivery?.invoiceNo}</p>
                        <Badge variant={getStatusBadgeVariant(event.status)}>
                          {STATUS_LABELS[event.status]}
                        </Badge>
                        {event.reasonCode && (
                          <Badge variant="outline">
                            {REASON_CODE_LABELS[event.reasonCode]}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {delivery?.client?.name}
                      </p>
                      {event.notes && (
                        <p className="text-sm bg-muted/50 p-3 rounded-lg">
                          "{event.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Meta and Actions */}
                  <div className="flex flex-col lg:items-end gap-2 lg:ml-auto shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(event.createdAt, { addSuffix: true, locale: ptBR })}
                    </span>
                    {event.createdBy && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={event.createdBy.avatarUrl} 
                          alt={event.createdBy.name}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="text-xs text-muted-foreground">{event.createdBy.name}</span>
                      </div>
                    )}
                    <Button variant="default" size="sm" className="gap-1 mt-2">
                      <Eye className="w-4 h-4" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <Card variant="outlined" className="mt-8">
          <CardContent className="py-16 text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma ocorrência encontrada</h3>
            <p className="text-muted-foreground">
              Ótimo! Não há problemas registrados com os filtros atuais
            </p>
          </CardContent>
        </Card>
      )}
    </AppLayout>
  );
}
