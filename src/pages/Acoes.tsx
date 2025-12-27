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
  DEMO_ACTIONS, 
  DEMO_DELIVERIES,
  DEMO_USERS
} from '@/data/mockData';
import { 
  Zap, 
  Search, 
  UserPlus,
  Clock,
  AlertTriangle,
  CheckCircle,
  Truck,
  Wrench,
  Phone,
  Package
} from 'lucide-react';
import { ACTION_TYPE_LABELS, ACTION_STATUS_LABELS, PRIORITY_LABELS, ActionType, ActionStatus, Priority } from '@/types';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Acoes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredActions = DEMO_ACTIONS.filter(action => {
    const delivery = DEMO_DELIVERIES.find(d => d.id === action.deliveryId);
    const matchesSearch = 
      delivery?.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery?.client?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || action.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || action.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getTypeIcon = (type: ActionType) => {
    switch (type) {
      case 'REDELIVERY': return <Truck className="w-5 h-5" />;
      case 'REPAIR': return <Wrench className="w-5 h-5" />;
      case 'COLLECT': return <Package className="w-5 h-5" />;
      case 'CALL_CLIENT': return <Phone className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: ActionStatus) => {
    switch (status) {
      case 'OPEN': return <Clock className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Zap className="w-4 h-4" />;
      case 'DONE': return <CheckCircle className="w-4 h-4" />;
      case 'CANCELED': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityBadgeVariant = (priority: Priority) => {
    switch (priority) {
      case 'HIGH': return 'priority-high';
      case 'MEDIUM': return 'priority-medium';
      case 'LOW': return 'priority-low';
    }
  };

  const getStatusBadgeVariant = (status: ActionStatus) => {
    switch (status) {
      case 'OPEN': return 'pending';
      case 'IN_PROGRESS': return 'info';
      case 'DONE': return 'delivered';
      case 'CANCELED': return 'issue';
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Ações</h1>
          <p className="text-muted-foreground">
            Gerencie ações de reenvio, conserto e coleta
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Zap className="w-4 h-4" />
          Nova Ação
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{DEMO_ACTIONS.filter(a => a.status === 'OPEN').length}</p>
              <p className="text-xs text-muted-foreground">Abertas</p>
            </div>
          </div>
        </Card>
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{DEMO_ACTIONS.filter(a => a.status === 'IN_PROGRESS').length}</p>
              <p className="text-xs text-muted-foreground">Em Andamento</p>
            </div>
          </div>
        </Card>
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{DEMO_ACTIONS.filter(a => a.priority === 'HIGH').length}</p>
              <p className="text-xs text-muted-foreground">Alta Prioridade</p>
            </div>
          </div>
        </Card>
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{DEMO_ACTIONS.filter(a => a.status === 'DONE').length}</p>
              <p className="text-xs text-muted-foreground">Concluídas</p>
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
                placeholder="Buscar por NF ou cliente..."
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
                  <SelectItem value="OPEN">Aberta</SelectItem>
                  <SelectItem value="IN_PROGRESS">Em Andamento</SelectItem>
                  <SelectItem value="DONE">Concluída</SelectItem>
                  <SelectItem value="CANCELED">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="HIGH">Alta</SelectItem>
                  <SelectItem value="MEDIUM">Média</SelectItem>
                  <SelectItem value="LOW">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions List */}
      <div className="space-y-4">
        {filteredActions.map((action, index) => {
          const delivery = DEMO_DELIVERIES.find(d => d.id === action.deliveryId);
          
          return (
            <Card 
              key={action.id}
              variant="elevated"
              className="hover:shadow-glow-sm transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Icon and Type */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      action.priority === 'HIGH' ? 'bg-destructive/10 text-destructive' :
                      action.priority === 'MEDIUM' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {getTypeIcon(action.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{ACTION_TYPE_LABELS[action.type]}</p>
                        <Badge variant={getPriorityBadgeVariant(action.priority)}>
                          {PRIORITY_LABELS[action.priority]}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(action.status)}>
                          {getStatusIcon(action.status)}
                          <span className="ml-1">{ACTION_STATUS_LABELS[action.status]}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {delivery?.invoiceNo} • {delivery?.client?.name}
                      </p>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex-1 flex flex-wrap items-center gap-4 lg:justify-end">
                    {action.assignedTo && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={action.assignedTo.avatarUrl} 
                          alt={action.assignedTo.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm">{action.assignedTo.name}</span>
                      </div>
                    )}
                    {action.dueAt && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Prazo: {format(action.dueAt, "dd/MM", { locale: ptBR })}</span>
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Criada {formatDistanceToNow(action.createdAt, { addSuffix: true, locale: ptBR })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!action.assignedToUserId && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <UserPlus className="w-4 h-4" />
                        Assumir
                      </Button>
                    )}
                    <Button variant="default" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredActions.length === 0 && (
        <Card variant="outlined" className="mt-8">
          <CardContent className="py-16 text-center">
            <Zap className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma ação encontrada</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros para encontrar ações
            </p>
          </CardContent>
        </Card>
      )}
    </AppLayout>
  );
}
