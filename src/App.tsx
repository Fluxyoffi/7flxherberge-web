import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useEffect } from "react";
import { siteConfig } from "@/config/site";

const queryClient = new QueryClient();

function ConfigInjector() {
  useEffect(() => {
    document.title = siteConfig.name;
    document.querySelector('meta[name="description"]')?.setAttribute("content", siteConfig.description);
    document.querySelector('meta[name="author"]')?.setAttribute("content", siteConfig.author);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", siteConfig.name);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", siteConfig.description);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", siteConfig.ogImage);
    
    let icon: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.href = siteConfig.logoUrl;
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ConfigInjector />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
