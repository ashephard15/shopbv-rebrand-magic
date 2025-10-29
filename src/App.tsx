import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import Rewards from "./pages/Rewards";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import ImportCSV from "./pages/ImportCSV";
import ExportProducts from "./pages/ExportProducts";
import SyncProducts from "./pages/SyncProducts";
import FragranceQuiz from "./pages/FragranceQuiz";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:handle" element={<ProductDetail />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/fragrance-quiz" element={<FragranceQuiz />} />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/rewards" element={
            <ProtectedRoute>
              <Rewards />
            </ProtectedRoute>
          } />
          <Route path="/sync-products" element={
            <ProtectedRoute requireAdmin>
              <SyncProducts />
            </ProtectedRoute>
          } />
          <Route path="/import-csv" element={
            <ProtectedRoute requireAdmin>
              <ImportCSV />
            </ProtectedRoute>
          } />
          <Route path="/export-products" element={
            <ProtectedRoute requireAdmin>
              <ExportProducts />
            </ProtectedRoute>
          } />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
