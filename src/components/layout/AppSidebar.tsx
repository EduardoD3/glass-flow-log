import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Truck, 
  AlertTriangle, 
  ClipboardCheck,
  Settings,
  Webhook,
  Users,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  Building2
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Badge } from '@/components/ui/badge';
import { DEMO_USERS, DEMO_TENANT, DEMO_UNITS } from '@/data/mockData';
import { useEffect } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/entregas', label: 'Entregas', icon: Truck },
  { path: '/ocorrencias', label: 'Ocorrências', icon: AlertTriangle, badge: 3 },
  { path: '/acoes', label: 'Ações', icon: ClipboardCheck, badge: 2 },
  { path: '/integracoes', label: 'Integrações', icon: Webhook },
  { path: '/admin', label: 'Administração', icon: Users },
];

export function AppSidebar() {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, mobileMenuOpen, setMobileMenuOpen, user, setUser, setTenant, setUnits, setCurrentUnit } = useAppStore();

  // Initialize demo user on mount
  useEffect(() => {
    if (!user) {
      setUser(DEMO_USERS[0]);
      setTenant(DEMO_TENANT);
      setUnits(DEMO_UNITS);
      setCurrentUnit(DEMO_UNITS[0]);
    }
  }, [user, setUser, setTenant, setUnits, setCurrentUnit]);

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar text-sidebar-foreground z-50 transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-16",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center w-full")}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in">
                <h1 className="font-bold text-lg text-sidebar-foreground">CanhotoLive</h1>
                <p className="text-xs text-sidebar-foreground/60">VitralTrack</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={toggleSidebar}
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive ? "sidebar-active" : "sidebar"}
                  className={cn(
                    "w-full relative",
                    !sidebarOpen && "justify-center px-0"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-2 h-5 min-w-5 flex items-center justify-center">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {!sidebarOpen && item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] flex items-center justify-center text-destructive-foreground">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-sidebar-border">
          {user && (
            <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-9 h-9 rounded-full bg-sidebar-accent"
              />
              {sidebarOpen && (
                <div className="flex-1 min-w-0 animate-fade-in">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">{user.email}</p>
                </div>
              )}
            </div>
          )}
          {sidebarOpen && (
            <Button variant="ghost" size="sm" className="w-full mt-3 text-sidebar-foreground/70 hover:text-sidebar-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}

export function MobileHeader() {
  const { setMobileMenuOpen, currentUnit } = useAppStore();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-card/95 backdrop-blur-md border-b border-border z-30 flex items-center px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          <span className="font-semibold">CanhotoLive</span>
        </div>
      </div>
      {currentUnit && (
        <Badge variant="secondary" className="text-xs">
          {currentUnit.code}
        </Badge>
      )}
    </header>
  );
}
