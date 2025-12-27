import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Entregas from "./pages/Entregas";
import Ocorrencias from "./pages/Ocorrencias";
import Acoes from "./pages/Acoes";
import Integracoes from "./pages/Integracoes";
import Admin from "./pages/Admin";
import Motorista from "./pages/Motorista";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/entregas" element={<Entregas />} />
          <Route path="/ocorrencias" element={<Ocorrencias />} />
          <Route path="/acoes" element={<Acoes />} />
          <Route path="/integracoes" element={<Integracoes />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/motorista" element={<Motorista />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
