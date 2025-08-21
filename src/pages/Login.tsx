import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Shield, Users, ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDiscordLogin = () => {
    window.location.href = `https://discord.com/oauth2/authorize?client_id=1111387584296398928&response_type=code&redirect_uri=http%3A%2F%2F84.46.250.128%3A5001%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify`;
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border p-4 shadow-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <img
                src="https://i.imgur.com/OUzzKMr.png"
                alt="Ícone personalizado"
                className="w-6 h-6 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground">NeoCart</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Info Card */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-center text-foreground flex items-center justify-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <span>Acesso Protegido</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-foreground">Tickets Privados</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Os transcripts de tickets são privados e só podem ser acessados por membros autorizados do seu servidor Discord.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-foreground">Verificamos suas permissões no servidor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-foreground">Dados protegidos com criptografia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-foreground">Acesso apenas aos seus tickets</span>
                </div>
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle className="text-xl text-center text-foreground">Entre com Discord</CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                Faça login com sua conta Discord para acessar os transcripts
              </p>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleDiscordLogin}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-glow"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Autenticando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
                      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                    </svg>
                    <span>Continuar com Discord</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              © 2025 NeoCart. Sistema de transcripts online.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;