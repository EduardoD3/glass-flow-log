import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Webhook, 
  Plus,
  Settings,
  Key,
  ExternalLink,
  CheckCircle,
  XCircle,
  RefreshCw,
  Code,
  FileText
} from 'lucide-react';

export default function Integracoes() {
  const webhooks = [
    { 
      id: '1', 
      name: 'ERP Principal', 
      url: 'https://api.erp.exemplo.com/webhooks/canhotolive',
      events: ['receipt_event.created', 'action.created'],
      isActive: true,
      lastStatus: 'success'
    },
    { 
      id: '2', 
      name: 'Sistema de Notificações', 
      url: 'https://notify.exemplo.com/webhook',
      events: ['receipt_event.created'],
      isActive: true,
      lastStatus: 'success'
    },
    { 
      id: '3', 
      name: 'BI Analytics', 
      url: 'https://bi.exemplo.com/ingest',
      events: ['delivery.status_changed'],
      isActive: false,
      lastStatus: 'error'
    },
  ];

  const apiKeys = [
    { id: '1', name: 'Produção', keyPreview: 'ck_live_****...8f2a', lastUsed: '2 min atrás', scopes: ['read', 'write'] },
    { id: '2', name: 'Desenvolvimento', keyPreview: 'ck_test_****...9b3c', lastUsed: '1 hora atrás', scopes: ['read'] },
  ];

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Integrações</h1>
          <p className="text-muted-foreground">
            Configure webhooks, APIs e conexões externas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Webhooks */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="w-5 h-5 text-primary" />
                  Webhooks
                </CardTitle>
                <CardDescription>
                  Receba notificações em tempo real
                </CardDescription>
              </div>
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Novo
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {webhooks.map((webhook) => (
              <div 
                key={webhook.id}
                className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      webhook.isActive ? 'bg-success' : 'bg-muted-foreground'
                    }`} />
                    <span className="font-medium">{webhook.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {webhook.lastStatus === 'success' ? (
                      <Badge variant="success" className="text-[10px]">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        OK
                      </Badge>
                    ) : (
                      <Badge variant="issue" className="text-[10px]">
                        <XCircle className="w-3 h-3 mr-1" />
                        Erro
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono truncate mb-2">
                  {webhook.url}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="outline" className="text-[10px]">
                      {event}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Settings className="w-3 h-3 mr-1" />
                    Configurar
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Testar
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Chaves para integração via API
                </CardDescription>
              </div>
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Nova
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {apiKeys.map((key) => (
              <div 
                key={key.id}
                className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium">{key.name}</span>
                  <div className="flex gap-1">
                    {key.scopes.map((scope) => (
                      <Badge key={scope} variant="secondary" className="text-[10px]">
                        {scope}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  {key.keyPreview}
                </p>
                <p className="text-xs text-muted-foreground">
                  Último uso: {key.lastUsed}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Documentação da API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Acesse nossa documentação completa para integrar com o CanhotoLive.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Guia de Início Rápido
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Code className="w-4 h-4" />
                Referência da API
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Link */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Logs de Integração
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Visualize o histórico de chamadas e erros das integrações.
            </p>
            <Button variant="default" className="w-full gap-2">
              <FileText className="w-4 h-4" />
              Ver Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
