import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FeedItem, STATUS_LABELS, PRIORITY_LABELS, DeliveryStatus, Priority } from '@/types';
import { cn } from '@/lib/utils';
import { 
  ClipboardCheck, 
  AlertTriangle, 
  Truck, 
  CheckCircle,
  XCircle,
  Clock,
  Zap
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LiveFeedProps {
  items: FeedItem[];
  className?: string;
}

function getStatusIcon(status?: DeliveryStatus | string) {
  switch (status) {
    case 'DELIVERED_OK':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'DELIVERED_WITH_ISSUE':
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case 'REFUSED':
      return <XCircle className="w-4 h-4 text-destructive" />;
    case 'IN_TRANSIT':
      return <Truck className="w-4 h-4 text-primary" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
}

function getTypeIcon(type: FeedItem['type']) {
  switch (type) {
    case 'RECEIPT_EVENT':
      return <ClipboardCheck className="w-4 h-4" />;
    case 'ACTION_CREATED':
    case 'ACTION_UPDATED':
      return <Zap className="w-4 h-4" />;
    case 'DELIVERY_STATUS':
      return <Truck className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
}

function getPriorityBadge(priority?: Priority) {
  if (!priority) return null;
  
  const variants: Record<Priority, "priority-high" | "priority-medium" | "priority-low"> = {
    HIGH: "priority-high",
    MEDIUM: "priority-medium",
    LOW: "priority-low",
  };

  return (
    <Badge variant={variants[priority]} className="text-[10px] px-1.5">
      {PRIORITY_LABELS[priority]}
    </Badge>
  );
}

function getStatusBadge(status?: DeliveryStatus | string) {
  if (!status || !STATUS_LABELS[status as DeliveryStatus]) return null;

  const variants: Record<DeliveryStatus, "delivered" | "pending" | "issue" | "transit"> = {
    DELIVERED_OK: "delivered",
    DELIVERED_WITH_ISSUE: "issue",
    REFUSED: "issue",
    ABSENT: "pending",
    PENDING: "pending",
    IN_TRANSIT: "transit",
    RESCHEDULED: "pending",
  };

  return (
    <Badge variant={variants[status as DeliveryStatus]} className="text-[10px] px-1.5">
      {STATUS_LABELS[status as DeliveryStatus]}
    </Badge>
  );
}

export function LiveFeed({ items, className }: LiveFeedProps) {
  return (
    <Card variant="elevated" className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Feed ao Vivo
          </CardTitle>
          <Badge variant="live" className="gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Ao vivo
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4 pb-6">
            {items.map((item, index) => (
              <div 
                key={item.id}
                className={cn(
                  "relative pl-6 pb-4 border-l-2 border-border last:border-l-0",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-card border-2 border-primary" />
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-muted-foreground">
                      {getTypeIcon(item.type)}
                    </span>
                    <span className="font-medium text-sm">{item.title}</span>
                    {getPriorityBadge(item.priority)}
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="text-xs text-muted-foreground/70">
                    {formatDistanceToNow(item.timestamp, { addSuffix: true, locale: ptBR })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
