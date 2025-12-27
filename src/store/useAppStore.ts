import { create } from 'zustand';
import type { User, Tenant, Unit } from '@/types';

interface AppState {
  // Current user session
  user: User | null;
  tenant: Tenant | null;
  currentUnit: Unit | null;
  units: Unit[];
  
  // UI state
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setTenant: (tenant: Tenant | null) => void;
  setCurrentUnit: (unit: Unit | null) => void;
  setUnits: (units: Unit[]) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  tenant: null,
  currentUnit: null,
  units: [],
  sidebarOpen: true,
  mobileMenuOpen: false,
  
  // Actions
  setUser: (user) => set({ user }),
  setTenant: (tenant) => set({ tenant }),
  setCurrentUnit: (unit) => set({ currentUnit: unit }),
  setUnits: (units) => set({ units }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  logout: () => set({ user: null, tenant: null, currentUnit: null, units: [] }),
}));
