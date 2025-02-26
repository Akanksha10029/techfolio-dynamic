
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  useEffect(() => {
    let loaderTimeout: NodeJS.Timeout;
    let transitionTimeout: NodeJS.Timeout;

    setIsLoading(true);
    
    // Only show loader if loading takes more than 3 seconds
    loaderTimeout = setTimeout(() => {
      if (isLoading) {
        setShouldShowLoader(true);
      }
    }, 3000);

    const main = document.querySelector('main');
    if (main) {
      main.classList.add('page-enter');
      transitionTimeout = setTimeout(() => {
        main.classList.remove('page-enter');
        setIsLoading(false);
        setShouldShowLoader(false);
      }, 300);
    }

    return () => {
      clearTimeout(loaderTimeout);
      clearTimeout(transitionTimeout);
    };
  }, [location.pathname]);

  return (
    <>
      {shouldShowLoader && isLoading && <Loader />}
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <div className="flex min-h-screen">
            <Navigation />
            <PageWrapper>
              <main className="flex-1 lg:pl-64">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </PageWrapper>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
