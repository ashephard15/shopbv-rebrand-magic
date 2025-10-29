import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import FragranceQuiz from "./pages/FragranceQuiz";
import Rewards from "./pages/Rewards";
import SyncProducts from "./pages/SyncProducts";
import ImportCSV from "./pages/ImportCSV";
import ExportProducts from "./pages/ExportProducts";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  // CRITICAL FIX: Clear corrupted cart data immediately on app load
  useEffect(() => {
    try {
      const cartData = localStorage.getItem('wix-cart');
      if (cartData) {
        const parsed = JSON.parse(cartData);
        const items = parsed?.state?.items || [];
        
        // Check if any items are missing wixId
        const hasInvalidItems = items.some((item: any) => !item.wixId);
        
        if (hasInvalidItems) {
          console.warn('⚠️ CLEARING CORRUPTED CART DATA - Items missing wixId');
          localStorage.removeItem('wix-cart');
          // Force reload to reinitialize store
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error checking cart, clearing storage:', error);
      localStorage.removeItem('wix-cart');
    }
  }, []);

  return (
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
};

export default App;
