import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import {
  MessageSquare,
  Shield,
  Search,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Download,
  Filter,
  Lock
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Tickets Resolvidos", value: "2,847", icon: CheckCircle, color: "text-green-500" },
    { label: "Usuários Atendidos", value: "1,234", icon: Users, color: "text-blue-500" },
    { label: "Tempo Médio", value: "2.4h", icon: Clock, color: "text-yellow-500" },
    { label: "Satisfação", value: "98%", icon: Star, color: "text-purple-500" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "closed": return "bg-green-600";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border p-4 shadow-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <img
                src="https://i.imgur.com/OUzzKMr.png"
                alt="Ícone personalizado"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">NeoCart</h1>
              <p className="text-sm text-muted-foreground">Sistema de Gerenciamento de Tickets</p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-primary hover:opacity-90 text-white shadow-glow"
          >
            Fazer Login
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
          <img
            src={heroImage}
            alt="NeoCart Dashboard"
            className="w-full h-full object-cover object-left"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-bold">
              Acesse seus Tickets Privados
              <span className="block text-primary-glow">do Discord</span>
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Visualize e gerencie todos os transcripts de tickets privados do nosso servidor do Discord de forma segura e organizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-white text-primary hover:bg-white/90 shadow-glow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                </svg>
                Entrar com Discord
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  const element = document.getElementById('about');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Por que usar Discord OAuth?
            </h3>
            <p className="text-xl text-muted-foreground">
              Seus tickets são privados e protegidos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Acesso Seguro</h4>
                  <p className="text-muted-foreground">
                    Apenas membros autorizados do seu servidor podem acessar os transcripts de tickets privados.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Permissões do Discord</h4>
                  <p className="text-muted-foreground">
                    Utilizamos as permissões do seu servidor Discord para garantir que apenas pessoas autorizadas vejam os tickets.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Histórico Completo</h4>
                  <p className="text-muted-foreground">
                    Mantenha um registro completo de todas as interações de suporte do seu servidor.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-card border border-border rounded-lg p-8 shadow-card">
              <h4 className="text-2xl font-bold text-foreground mb-4">Como funciona?</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <p className="text-foreground">Clique em "Entrar com Discord"</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <p className="text-foreground">Autorize o acesso ao seu servidor</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <p className="text-foreground">Acesse seus tickets privados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Funcionalidades Principais
            </h3>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa para gerenciar tickets do Discord
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-glow">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Busca Avançada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Encontre rapidamente qualquer transcript através de filtros avançados por usuário, canal, data ou status.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-glow">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Analytics Completo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualize estatísticas detalhadas sobre tickets, tempo de resposta e satisfação dos usuários.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-glow">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Tickets Privados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Acesso controlado baseado nas permissões do Discord. Apenas membros autorizados podem ver os tickets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
                  <img
                    src="https://i.imgur.com/OUzzKMr.png"
                    alt="Ícone personalizado"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-foreground">NeoCart</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Visualize e gerencie todos os transcripts de tickets privados do nosso servidor do Discord de forma segura e organizada.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Segurança</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Tickets 100% privados</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>Autenticação Discord OAuth</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>Controle de permissões</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Como começar</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Clique em "Entrar com Discord"</p>
                <p>2. Autorize o acesso ao seu servidor</p>
                <p>3. Visualize seus tickets privados</p>
              </div>
              <Button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-glow"
                size="sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                </svg>
                Entrar com Discord
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 NeoCart. Sistema de transcripts online.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
