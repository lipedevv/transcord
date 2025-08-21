import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  FileText,
  TrendingUp,
  Calendar,
  Shield,
  Server,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState("");
  const [discordUser, setDiscordUser] = useState<any>(null);

  // Estado para o resumo dos tickets vindo da API
  const [summary, setSummary] = useState<{
    totalTickets?: { value: number; growth: string; description: string };
    openTickets?: { value: number; status: string };
    avgResponseTime?: { value: string; description: string };
    resolvedToday?: { value: number; satisfaction: string };
  } | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await fetch("http://84.46.250.128:5001/api/tickets/summary");
        if (!response.ok) throw new Error("Erro ao buscar dados do resumo");

        const json = await response.json();
        setSummary(json.data);
      } catch (error) {
        console.error("Erro ao carregar resumo:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do resumo dos tickets.",
          variant: "destructive"
        });
      }
    }

    fetchSummary();
  }, [toast]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://84.46.250.128:5001/api/auth/me", {
          credentials: "include"
        });

        if (!res.ok) throw new Error();

        const json = await res.json();
        setDiscordUser(json.user);

        toast({
          title: "Bem-vindo de volta!",
          description: `Olá, ${json.user.username}!`,
          variant: "success"
        });

      } catch {
        navigate("/login");
      }
    }

    checkAuth();
  }, []);


  const handleLogout = async () => {
    try {
      await fetch("http://84.46.250.128:5001/api/auth/logout", {
        credentials: "include"
      });

      toast({
        title: "Logout realizado",
        description: "Até a próxima!",
        variant: "info"
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro no logout",
        description: "Não foi possível finalizar a sessão.",
        variant: "destructive"
      });
    }
  };



  const [recentTickets, setRecentTickets] = useState<
    { channelId: string; title: string; status: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    async function fetchRecentTickets() {
      try {
        const res = await fetch("http://84.46.250.128:5001/api/tickets/recent", {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const json = await res.json();
        setRecentTickets(json.tickets || []);
      } catch (err) {
        console.error("Erro ao buscar tickets recentes", err);
        toast({
          title: "Erro ao carregar tickets",
          description: "Não foi possível carregar os tickets recentes.",
          variant: "destructive"
        });
      }
    }

    fetchRecentTickets();
  }, [toast]);


  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-600";
      case "closed": return "bg-destructive";
      case "pending": return "bg-yellow-600";
      default: return "bg-destructive";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "Aberto";
      case "closed": return "Fechado";
      case "pending": return "Pendente";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border p-4 shadow-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
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
                <p className="text-sm text-muted-foreground">Sistema de transcripts online.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {discordUser && (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{discordUser.username}</p>
                    <p className="text-xs text-muted-foreground">#{discordUser.discriminator}</p>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={discordUser.avatar} alt={discordUser.username} />
                    <AvatarFallback>{discordUser.username[0]}</AvatarFallback>
                  </Avatar>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Privacy Notice */}
        <Card className="bg-gradient-card border-border shadow-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tickets Privados</h3>
                <p className="text-sm text-muted-foreground">
                  Apenas você e membros autorizados do seu servidor podem ver estes transcripts.
                  Todos os dados são criptografados e protegidos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Tickets */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                Total de Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {summary ? summary.totalTickets?.value ?? '—' : '...'}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {summary ? summary.totalTickets?.growth ?? '' : ''}
                {' '}
                {summary ? summary.totalTickets?.description ?? '' : ''}
              </p>
            </CardContent>
          </Card>

          {/* Open Tickets */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-destructive" />
                Tickets Abertos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {summary ? summary.openTickets?.value ?? '—' : '...'}
              </div>
              <p className="text-xs text-muted-foreground">
                {summary ? summary.openTickets?.status ?? '' : ''}
              </p>
            </CardContent>
          </Card>

          {/* Average Response Time */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                Tempo Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {summary ? summary.avgResponseTime?.value ?? '—' : '...'}
              </div>
              <p className="text-xs text-muted-foreground">
                {summary ? summary.avgResponseTime?.description ?? '' : ''}
              </p>
            </CardContent>
          </Card>

          {/* Resolved Today */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Resolvidos Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {summary ? summary.resolvedToday?.value ?? '—' : '...'}
              </div>
              <p className="text-xs text-muted-foreground">
                {summary ? summary.resolvedToday?.satisfaction ?? '' : ''}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tickets */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-foreground flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Tickets Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => {
                const isClickable = ticket.status === "closed";

                return (
                  <div
                    key={ticket.channelId}
                    className={`flex items-center justify-between p-4 rounded-lg border border-border transition-colors ${isClickable
                      ? "bg-muted/50 hover:bg-muted/70 cursor-pointer"
                      : "bg-muted/30 cursor-not-allowed opacity-60"
                      }`}
                    onClick={() => {
                      if (isClickable) navigate(`/transcript/${ticket.channelId}`);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{ticket.title}</span>
                      <div className="text-sm text-muted-foreground">
                        Id: {ticket.channelId} • Criado {formatDistanceToNow(new Date(ticket.createdAt), { locale: ptBR, addSuffix: true })}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                        {getStatusText(ticket.status)}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/transcripts")}
              >
                Ver Todos os Transcripts
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            © 2025 NeoCart. Sistema de transcripts online.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
