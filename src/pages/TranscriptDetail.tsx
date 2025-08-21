import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  ArrowLeft,
  User,
  Calendar,
  Hash,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import html2canvas from "html2canvas";

const TranscriptDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transcript, setTranscript] = useState<any>(null);
  const [discordUser, setDiscordUser] = useState<any>(null);
  const [tickets, setTickets] = useState<YourTicketType[]>([]);
  const [transcriptHTML, setTranscriptHTML] = useState<string>("");
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!transcript || !transcript.channelId) return;

    async function loadTranscriptHTML() {
      try {
        const res = await fetch(`http://84.46.250.128:5001/api/tickets/html?channelId=${transcript.channelId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao carregar transcript HTML");

        const html = await res.text();
        setTranscriptHTML(html);
      } catch (error) {
        console.error(error);
        setTranscriptHTML("<p class='text-red-500'>Erro ao carregar transcript.</p>");
      }
    }

    loadTranscriptHTML();
  }, [transcript]);


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

  useEffect(() => {
    async function loadTickets() {
      const res = await fetch("http://84.46.250.128:5001/api/tickets/all", { credentials: "include" });
      const json = await res.json();
      setTickets(json.tickets || [])
    }
    loadTickets();
  }, []);

  useEffect(() => {
    if (!id || tickets.length === 0) return;

    const matched = tickets.find(ticket => ticket.channelId === id);
    if (!matched) return;

    if (matched.status === "open") {
      navigate("/dashboard");
      return;
    }

    setTranscript({
      ...matched,
      title: "Atendimento NeoCart",
      status: matched.status,
      channelId: matched.channelId,
    });

  }, [id, tickets]);

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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "staff": return <CheckCircle className="w-3 h-3 text-green-500" />;
      case "bot": return <AlertCircle className="w-3 h-3 text-blue-500" />;
      default: return <User className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const downloadTranscript = () => {
    if (!transcript?.channelId) return;

    const url = `http://84.46.250.128:5001/api/tickets/html/download?channelId=${transcript.channelId}`;

    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${transcript.channelId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  if (!transcript) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Carregando transcript...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border p-4 shadow-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/transcripts")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{transcript.title}</h1>
              <p className="text-sm text-muted-foreground">ID: {transcript.channelId}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Badge className={`${getStatusColor(transcript.status)} text-white`}>
              {getStatusText(transcript.status)}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadTranscript}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <iframe
          title="Transcript"
          srcDoc={transcriptHTML}
          sandbox="allow-scripts allow-same-origin"
          className="
    w-full
    min-h-[70vh]
    rounded-lg
    border
    border-black-300
    shadow-md
    transition
    hover:shadow-lg
    bg-black
  "
          style={{ minHeight: "80vh", overflow: "hidden" }}
        />


      </main>

    </div>
  );
};

export default TranscriptDetail;