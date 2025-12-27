import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'primary';
}

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue,
  variant = 'default' 
}: KPICardProps) {
  const variantStyles = {
    default: 'border-border',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    destructive: 'border-destructive/30 bg-destructive/5',
    primary: 'border-primary/30 bg-primary/5',
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
    primary: 'bg-primary/10 text-primary',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <Card variant="elevated" className={cn("overflow-hidden", variantStyles[variant])}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {(subtitle || trendValue) && (
              <div className="flex items-center gap-2 text-sm">
                {trendValue && trend && (
                  <span className={cn(
                    "flex items-center gap-1",
                    trend === 'up' && 'text-success',
                    trend === 'down' && 'text-destructive',
                    trend === 'neutral' && 'text-muted-foreground'
                  )}>
                    <TrendIcon className="w-3 h-3" />
                    {trendValue}
                  </span>
                )}
                {subtitle && (
                  <span className="text-muted-foreground">{subtitle}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", iconStyles[variant])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
