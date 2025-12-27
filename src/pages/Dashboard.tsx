import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { LiveFeed } from '@/components/dashboard/LiveFeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DEMO_KPIS, 
  DEMO_FEED_ITEMS, 
  DEMO_DELIVERIES,
  DEMO_ACTIONS
} from '@/data/mockData';
import { 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  ClipboardCheck,
  Plus,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { STATUS_LABELS, ACTION_STATUS_LABELS, PRIORITY_LABELS, DeliveryStatus, ActionStatus, Priority } from '@/types';

export default function Dashboard() {
  const { currentUnit } = useAppStore();

  const pendingDeliveries = DEMO_DELIVERIES.filter(d => 
    d.status === 'PENDING' || d.status === 'IN_TRANSIT'
  ).slice(0, 5);

  const openActions = DEMO_ACTIONS.filter(a => 
    a.status === 'OPEN' || a.status === 'IN_PROGRESS'
  );

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das entregas de hoje{currentUnit && ` - ${currentUnit.name}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/motorista">
            <Button variant="gradient" className="gap-2">
              <Plus className="w-4 h-4" />
              Registrar Canhoto
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger-children">
        <KPICard
          title="Total de Entregas"
          value={DEMO_KPIS.totalDeliveries}
          subtitle="programadas hoje"
          icon={<Truck className="w-6 h-6" />}
          variant="primary"
        />
        <KPICard
          title="Entregas OK"
          value={DEMO_KPIS.deliveredOk}
          trendValue={`${DEMO_KPIS.percentOk}%`}
          trend="up"
          icon={<CheckCircle className="w-6 h-6" />}
          variant="success"
        />
        <KPICard
          title="Ocorrências"
          value={DEMO_KPIS.deliveredWithIssue}
          trendValue={`${DEMO_KPIS.percentIssue}%`}
          trend="down"
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="warning"
        />
        <KPICard
          title="Pendentes"
          value={DEMO_KPIS.pending}
          subtitle={`SLA médio: ${DEMO_KPIS.avgSlaMinutes}min`}
          icon={<Clock className="w-6 h-6" />}
          variant="default"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Feed */}
        <div className="lg:col-span-1">
          <LiveFeed items={DEMO_FEED_ITEMS} />
        </div>

        {/* Right column - Tables */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Deliveries */}
          <Card variant="elevated">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Entregas Pendentes
                </CardTitle>
                <Link to="/entregas">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Ver todas
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingDeliveries.map((delivery, index) => (
                  <div 
                    key={delivery.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{delivery.invoiceNo}</p>
                        <p className="text-xs text-muted-foreground">{delivery.client?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={delivery.status === 'IN_TRANSIT' ? 'transit' : 'pending'}
                      >
                        {STATUS_LABELS[delivery.status]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Open Actions */}
          <Card variant="elevated">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  Ações Pendentes
                </CardTitle>
                <Link to="/acoes">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Ver todas
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {openActions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma ação pendente</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {openActions.map((action, index) => {
                    const delivery = DEMO_DELIVERIES.find(d => d.id === action.deliveryId);
                    return (
                      <div 
                        key={action.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            action.priority === 'HIGH' ? 'bg-destructive/10' : 
                            action.priority === 'MEDIUM' ? 'bg-warning/10' : 'bg-muted'
                          }`}>
                            <AlertTriangle className={`w-5 h-5 ${
                              action.priority === 'HIGH' ? 'text-destructive' : 
                              action.priority === 'MEDIUM' ? 'text-warning' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{delivery?.invoiceNo || 'Entrega'}</p>
                            <p className="text-xs text-muted-foreground">
                              {action.type === 'REDELIVERY' ? 'Reenvio' : 
                               action.type === 'REPAIR' ? 'Conserto' : 
                               action.type === 'COLLECT' ? 'Coleta' : 'Contato'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={
                              action.priority === 'HIGH' ? 'priority-high' :
                              action.priority === 'MEDIUM' ? 'priority-medium' : 'priority-low'
                            }
                          >
                            {PRIORITY_LABELS[action.priority]}
                          </Badge>
                          <Badge variant={action.status === 'IN_PROGRESS' ? 'info' : 'pending'}>
                            {ACTION_STATUS_LABELS[action.status]}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
