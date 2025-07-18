
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { OrderHistoryProvider } from "@/hooks/useOrderHistory";
import PostAuthHandler from "./components/auth/PostAuthHandler";
import MainApp from "./components/MainApp";
import NotFound from "./pages/NotFound";

console.log('App component loading...');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log('App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <OrderHistoryProvider>
            <PostAuthHandler />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainApp />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </OrderHistoryProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

console.log('App component defined');

export default App;
