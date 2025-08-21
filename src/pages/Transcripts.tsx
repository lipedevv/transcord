import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Search,
  Filter,
  Calendar,
  User,
  Hash,
  ArrowLeft,
  Download,
  Eye,
  Server,
  Shield,
  Users,
  Lock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";


const Transcripts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [discordUser, setDiscordUser] = useState<any>(null);
  const [tickets, setTickets] = useState<YourTicketType[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function loadTickets() {
      setIsLoading(true);
      try {
        const res = await fetch(
          searchTerm
            ? `http://84.46.250.128:5001/api/tickets/search?channelId=${searchTerm}`
            : "http://84.46.250.128:5001/api/tickets/all",
          { credentials: "include" }
        );
        const json = await res.json();
        setTickets(json.tickets || []);
      } catch (error) {
        console.error("Erro ao carregar os tickets", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTickets();
  }, [searchTerm]);


  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://84.46.250.128:5001/api/auth/me", {
          credentials: "include"
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        setDiscordUser(json.user);
      } catch {
        navigate("/login");
      }
    }
    checkAuth();
  }, []);

  const filteredTranscripts = tickets.filter(t => {
    if (selectedStatus !== "all" && t.status !== selectedStatus) return false;
    const title = t.title?.toLowerCase() || "";
    return title.includes(searchTerm.toLowerCase()) || t.channelId.includes(searchTerm.toLowerCase());
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-600";
      case "closed": return "bg-destructive";
      case "pending": return "bg-yellow-600";
      default: return "bg-muted";
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Carregando transcripts...</p>
        </div>
      </div>
    );
  } else return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-card border-b border-border p-4 shadow-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Todos os Transcripts</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID de canal, título, etc."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground"
                >
                  <option value="all">Todos os Status</option>
                  <option value="open">Abertos</option>
                  <option value="pending">Pendentes</option>
                  <option value="closed">Fechados</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              {filteredTranscripts.length} transcript{filteredTranscripts.length !== 1 ? 's' : ''} encontrado{filteredTranscripts.length !== 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTranscripts.map((transcript) => {
                const isClickable = transcript.status === "closed";

                return (
                  <div
                    key={transcript.channelId}
                    className={`p-4 rounded-lg border border-border transition-colors flex items-start justify-between ${isClickable
                      ? "bg-muted/50 hover:bg-muted/70 cursor-pointer"
                      : "bg-muted/30 cursor-not-allowed opacity-60"
                      }`}
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-foreground">{transcript.title}</h3>
                        <Badge className={`${getStatusColor(transcript.status)} text-white`}>
                          {getStatusText(transcript.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">ID:</span>
                          <span>{transcript.channelId}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(transcript.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>• Criado {formatDistanceToNow(new Date(transcript.createdAt), { locale: ptBR, addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!isClickable}
                        onClick={() => navigate(`/transcript/${transcript.channelId}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!isClickable}
                        onClick={() => {
                          if (!transcript?.channelId) return;

                          const url = `http://84.46.250.128:5001/api/tickets/html/download?channelId=${transcript.channelId}`;

                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `transcript-${transcript.channelId}.html`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Transcripts;
