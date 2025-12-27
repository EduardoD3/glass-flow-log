import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DEMO_DELIVERIES
} from '@/data/mockData';
import { 
  Truck, 
  Search, 
  Camera,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  MapPin,
  ArrowLeft,
  Send,
  Eraser,
  Building2,
  QrCode
} from 'lucide-react';
import { STATUS_LABELS, REASON_CODE_LABELS, DeliveryStatus, ReasonCode, Delivery } from '@/types';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type Step = 'list' | 'select' | 'form' | 'signature' | 'success';

export default function Motorista() {
  const [step, setStep] = useState<Step>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DeliveryStatus | ''>('');
  const [reasonCode, setReasonCode] = useState<ReasonCode | ''>('');
  const [receiverName, setReceiverName] = useState('');
  const [notes, setNotes] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasSignature, setHasSignature] = useState(false);

  // Filter pending deliveries
  const pendingDeliveries = DEMO_DELIVERIES.filter(d => 
    d.status === 'PENDING' || d.status === 'IN_TRANSIT'
  ).filter(d => 
    d.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.externalId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requiresReason = selectedStatus === 'DELIVERED_WITH_ISSUE' || 
                          selectedStatus === 'REFUSED';

  const handleSelectDelivery = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setStep('select');
  };

  const handleSelectStatus = (status: DeliveryStatus) => {
    setSelectedStatus(status);
    setStep('form');
  };

  const handleContinueToSignature = () => {
    if (requiresReason && !reasonCode) {
      toast.error('Selecione o motivo da ocorrência');
      return;
    }
    setStep('signature');
  };

  const handleSubmit = () => {
    if (!hasSignature && !receiverName) {
      toast.error('Obtenha a assinatura ou nome do recebedor');
      return;
    }
    // Simulate submission
    toast.success('Canhoto registrado com sucesso!');
    setStep('success');
  };

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#1e3a5f';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [step]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const resetForm = () => {
    setStep('list');
    setSelectedDelivery(null);
    setSelectedStatus('');
    setReasonCode('');
    setReceiverName('');
    setNotes('');
    setHasSignature(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-sidebar text-sidebar-foreground p-4 shadow-lg">
        <div className="flex items-center gap-3">
          {step !== 'list' && step !== 'success' && (
            <Button 
              variant="ghost" 
              size="icon-sm"
              className="text-sidebar-foreground"
              onClick={() => {
                if (step === 'select') setStep('list');
                else if (step === 'form') setStep('select');
                else if (step === 'signature') setStep('form');
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            <div>
              <h1 className="font-bold">CanhotoLive</h1>
              <p className="text-xs text-sidebar-foreground/70">Motorista</p>
            </div>
          </div>
          <Link to="/" className="ml-auto">
            <Button variant="ghost" size="sm" className="text-sidebar-foreground/70 text-xs">
              Painel
            </Button>
          </Link>
        </div>
      </header>

      <main className="p-4 pb-20 max-w-lg mx-auto">
        {/* Step: List */}
        {step === 'list' && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">Minhas Entregas</h2>
              <p className="text-sm text-muted-foreground">Selecione uma entrega para registrar</p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar NF, cliente ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Scan button */}
            <Button variant="outline" className="w-full gap-2">
              <QrCode className="w-5 h-5" />
              Escanear QR Code
            </Button>

            {/* Deliveries list */}
            <div className="space-y-3">
              {pendingDeliveries.map((delivery) => (
                <Card 
                  key={delivery.id}
                  variant="elevated"
                  className="cursor-pointer hover:shadow-glow-sm transition-all active:scale-[0.98]"
                  onClick={() => handleSelectDelivery(delivery)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{delivery.invoiceNo}</span>
                      <Badge variant={delivery.status === 'IN_TRANSIT' ? 'transit' : 'pending'}>
                        {STATUS_LABELS[delivery.status]}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{delivery.client?.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {delivery.address.neighborhood}, {delivery.address.city}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {pendingDeliveries.length === 0 && (
              <Card variant="outlined" className="text-center py-12">
                <Truck className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-muted-foreground">Nenhuma entrega pendente</p>
              </Card>
            )}
          </div>
        )}

        {/* Step: Select Status */}
        {step === 'select' && selectedDelivery && (
          <div className="space-y-4 animate-fade-in">
            <Card variant="glass" className="mb-6">
              <CardContent className="p-4">
                <p className="font-semibold">{selectedDelivery.invoiceNo}</p>
                <p className="text-sm">{selectedDelivery.client?.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedDelivery.address.street}, {selectedDelivery.address.number}
                </p>
              </CardContent>
            </Card>

            <h3 className="text-lg font-semibold text-center">Qual o status da entrega?</h3>

            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="glass"
                className="h-auto py-4 justify-start gap-4"
                onClick={() => handleSelectStatus('DELIVERED_OK')}
              >
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Entregue OK</p>
                  <p className="text-xs text-muted-foreground">Sem problemas</p>
                </div>
              </Button>

              <Button
                variant="glass"
                className="h-auto py-4 justify-start gap-4"
                onClick={() => handleSelectStatus('DELIVERED_WITH_ISSUE')}
              >
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Entregue com Ressalva</p>
                  <p className="text-xs text-muted-foreground">Avaria ou problema</p>
                </div>
              </Button>

              <Button
                variant="glass"
                className="h-auto py-4 justify-start gap-4"
                onClick={() => handleSelectStatus('REFUSED')}
              >
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Recusado</p>
                  <p className="text-xs text-muted-foreground">Cliente recusou</p>
                </div>
              </Button>

              <Button
                variant="glass"
                className="h-auto py-4 justify-start gap-4"
                onClick={() => handleSelectStatus('ABSENT')}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Cliente Ausente</p>
                  <p className="text-xs text-muted-foreground">Não havia ninguém</p>
                </div>
              </Button>
            </div>
          </div>
        )}

        {/* Step: Form */}
        {step === 'form' && selectedDelivery && (
          <div className="space-y-4 animate-fade-in">
            <Card variant="glass" className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{selectedDelivery.invoiceNo}</p>
                    <p className="text-sm text-muted-foreground">{selectedDelivery.client?.name}</p>
                  </div>
                  <Badge 
                    variant={
                      selectedStatus === 'DELIVERED_OK' ? 'delivered' :
                      selectedStatus === 'DELIVERED_WITH_ISSUE' ? 'warning' :
                      selectedStatus === 'REFUSED' ? 'issue' : 'pending'
                    }
                  >
                    {selectedStatus && STATUS_LABELS[selectedStatus]}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {requiresReason && (
              <div className="space-y-2">
                <Label>Motivo da ocorrência *</Label>
                <Select value={reasonCode} onValueChange={(v) => setReasonCode(v as ReasonCode)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(REASON_CODE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea
                placeholder="Descreva detalhes relevantes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {requiresReason && (
              <div className="space-y-2">
                <Label>Fotos (opcional)</Label>
                <Button variant="outline" className="w-full gap-2">
                  <Camera className="w-5 h-5" />
                  Tirar Foto
                </Button>
              </div>
            )}

            <Button 
              variant="gradient" 
              className="w-full mt-6"
              onClick={handleContinueToSignature}
            >
              Continuar
            </Button>
          </div>
        )}

        {/* Step: Signature */}
        {step === 'signature' && selectedDelivery && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-center">Assinatura do Recebedor</h3>

            <div className="space-y-2">
              <Label>Nome do recebedor</Label>
              <Input
                placeholder="Nome completo"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Assinatura</Label>
                <Button variant="ghost" size="sm" onClick={clearSignature}>
                  <Eraser className="w-4 h-4 mr-1" />
                  Limpar
                </Button>
              </div>
              <div className="border-2 border-dashed border-border rounded-xl overflow-hidden bg-card">
                <canvas
                  ref={canvasRef}
                  width={350}
                  height={200}
                  className="w-full touch-none cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Desenhe a assinatura no campo acima
              </p>
            </div>

            <Button 
              variant="gradient" 
              className="w-full mt-6 gap-2"
              onClick={handleSubmit}
            >
              <Send className="w-4 h-4" />
              Enviar Canhoto
            </Button>
          </div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Canhoto Registrado!</h2>
            <p className="text-muted-foreground mb-8">
              O registro foi enviado com sucesso.
            </p>
            <Button variant="gradient" onClick={resetForm} className="gap-2">
              <Truck className="w-4 h-4" />
              Nova Entrega
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
