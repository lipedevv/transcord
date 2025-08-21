import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <p className="text-xl text-muted-foreground">Oops! Página não encontrada</p>
        </div>
        <a 
          href="/" 
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors"
        >
          <span>Voltar ao Início</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
