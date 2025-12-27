import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DEMO_USERS,
  DEMO_UNITS
} from '@/data/mockData';
import { 
  Users, 
  Building2,
  Shield,
  Plus,
  Settings,
  MoreVertical,
  Mail,
  Check
} from 'lucide-react';

export default function Admin() {
  const roles = [
    { id: 'role-admin', name: 'Administrador', permissions: ['all'], userCount: 1 },
    { id: 'role-supervisor', name: 'Supervisor', permissions: ['read', 'write', 'actions'], userCount: 1 },
    { id: 'role-driver', name: 'Motorista', permissions: ['read', 'receipts'], userCount: 2 },
  ];

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Administração</h1>
          <p className="text-muted-foreground">
            Gerencie usuários, permissões e unidades
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users */}
        <Card variant="elevated" className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Usuários
                </CardTitle>
                <CardDescription>
                  Gerencie os usuários do sistema
                </CardDescription>
              </div>
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Novo Usuário
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Usuário</th>
                    <th className="text-left p-3 text-sm font-medium hidden md:table-cell">Email</th>
                    <th className="text-left p-3 text-sm font-medium">Papel</th>
                    <th className="text-left p-3 text-sm font-medium hidden sm:table-cell">Status</th>
                    <th className="text-right p-3 text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_USERS.map((user) => {
                    const role = roles.find(r => r.id === user.roleId);
                    return (
                      <tr key={user.id} className="border-t hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatarUrl}
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="font-medium text-sm">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">
                          {user.email}
                        </td>
                        <td className="p-3">
                          <Badge variant="secondary" className="text-xs">
                            {role?.name}
                          </Badge>
                        </td>
                        <td className="p-3 hidden sm:table-cell">
                          <Badge variant={user.isActive ? 'success' : 'outline'} className="text-xs">
                            {user.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Units */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Unidades
                </CardTitle>
                <CardDescription>
                  Filiais e pontos de operação
                </CardDescription>
              </div>
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Nova
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_UNITS.map((unit) => (
              <div 
                key={unit.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{unit.name}</p>
                    <p className="text-xs text-muted-foreground">Código: {unit.code}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Roles */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Papéis e Permissões
                </CardTitle>
                <CardDescription>
                  Configure níveis de acesso
                </CardDescription>
              </div>
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Novo
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {roles.map((role) => (
              <div 
                key={role.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{role.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {role.userCount} usuário{role.userCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {role.permissions.slice(0, 2).map((perm) => (
                      <Badge key={perm} variant="outline" className="text-[10px]">
                        {perm}
                      </Badge>
                    ))}
                    {role.permissions.length > 2 && (
                      <Badge variant="outline" className="text-[10px]">
                        +{role.permissions.length - 2}
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="icon-sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
