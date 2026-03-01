import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search, Send, ArrowLeft, MoreVertical, Paperclip, ChevronRight,
  MessageSquare, ExternalLink, X
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { mockConversations, Conversation, Message } from "../data/mockData";

interface MessagesProps {
  userType?: "student" | "company" | null;
  onLogout?: () => void;
}

// ─── API STUB ───────────────────────────────────────────────────────────────
// Remplacez BASE_URL par l'URL de votre backend Express
// const BASE_URL = "http://localhost:5000/api";
//
// async function fetchConversations(userId: string) {
//   const res = await fetch(`${BASE_URL}/conversations/${userId}`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });
//   return res.json();
// }
//
// async function sendMessage(conversationId: string, text: string) {
//   const res = await fetch(`${BASE_URL}/conversations/${conversationId}/messages`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     body: JSON.stringify({ text }),
//   });
//   return res.json();
// }
// ────────────────────────────────────────────────────────────────────────────

export default function Messages({ userType = null, onLogout }: MessagesProps) {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId) || null;
  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const filteredConvs = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participantCompany?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.offerTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvId, conversations]);

  const openConversation = (conv: Conversation) => {
    // Mark messages as read
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conv.id
          ? { ...c, unreadCount: 0, messages: c.messages.map((m) => ({ ...m, read: true })) }
          : c
      )
    );
    setActiveConvId(conv.id);
    setShowInfo(false);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !activeConv) return;
    setSending(true);

    const msg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text: newMessage.trim(),
      timestamp: "Maintenant",
      read: false,
    };

    // TODO: Replace with actual API call
    // await sendMessage(activeConv.id, newMessage.trim());

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? {
              ...c,
              messages: [...c.messages, msg],
              lastMessage: msg.text,
              lastMessageTime: "Maintenant",
            }
          : c
      )
    );
    setNewMessage("");
    setSending(false);

    // Simulate a reply after 2s
    setTimeout(() => {
      const reply: Message = {
        id: `msg-reply-${Date.now()}`,
        senderId: activeConv.participantId,
        text: "Merci pour votre message, nous reviendrons vers vous très prochainement.",
        timestamp: "Maintenant",
        read: false,
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConv.id
            ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text }
            : c
        )
      );
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar userType={userType} onLogout={onLogout} />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex" style={{ height: "calc(100vh - 120px)" }}>

          {/* ── Sidebar: Conversation list ─────────────────────────── */}
          <aside className={`${activeConvId ? "hidden md:flex" : "flex"} w-full md:w-80 lg:w-96 flex-col border-r border-gray-100 shrink-0`}>
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Messages
                  {totalUnread > 0 && (
                    <span className="ml-2 text-xs text-white px-2 py-0.5 rounded-full" style={{ background: "#F97316" }}>
                      {totalUnread}
                    </span>
                  )}
                </h2>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:border-orange-400 transition-all"
                  style={{ "--tw-ring-color": "#fed7aa" } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto">
              {filteredConvs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <MessageSquare size={40} className="text-gray-200 mb-3" />
                  <p className="text-sm text-gray-400">Aucune conversation trouvée</p>
                </div>
              ) : (
                filteredConvs.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => openConversation(conv)}
                    className={`w-full text-left flex items-start gap-3 px-5 py-4 transition-colors border-b border-gray-50 ${
                      activeConvId === conv.id ? "bg-orange-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: activeConvId === conv.id ? "#F97316" : "#374151" }}
                      >
                        {conv.participantAvatar}
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className={`text-sm truncate ${conv.unreadCount > 0 ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>
                          {conv.participantName}
                        </p>
                        <span className="text-xs text-gray-400 shrink-0">{conv.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-1">{conv.participantCompany}</p>
                      <p className={`text-xs truncate ${conv.unreadCount > 0 ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                        {conv.lastMessage}
                      </p>
                      {conv.offerTitle && (
                        <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full mt-1.5 truncate max-w-full">
                          💼 {conv.offerTitle}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* ── Main: Message thread ────────────────────────────────── */}
          {!activeConv ? (
            <div className="flex-1 hidden md:flex flex-col items-center justify-center text-center px-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
                <MessageSquare size={36} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Vos messages</h3>
              <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                Sélectionnez une conversation pour échanger directement avec les recruteurs ou les candidats.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Thread header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-white shrink-0">
                <button
                  onClick={() => setActiveConvId(null)}
                  className="md:hidden p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />{" "}
                </button>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 cursor-pointer"
                  style={{ background: "#F97316" }}
                  onClick={() => setShowInfo(!showInfo)}
                >
                  {activeConv.participantAvatar}
                </div>
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <p className="font-bold text-gray-900 text-sm">{activeConv.participantName}</p>
                  <p className="text-xs text-gray-500">{activeConv.participantRole} · {activeConv.participantCompany}</p>
                </div>
                {activeConv.offerId && (
                  <button
                    onClick={() => navigate(`/offers/${activeConv.offerId}`)}
                    className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <ExternalLink size={11} /> Voir l'offre
                  </button>
                )}
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <MoreVertical size={18} />{" "}
                </button>
              </div>

              <div className="flex flex-1 min-h-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                  {/* Date separator */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-100"></div>
                    <span className="text-xs text-gray-400 px-2">Février 2026</span>
                    <div className="flex-1 h-px bg-gray-100"></div>
                  </div>

                  {activeConv.messages.map((msg, idx) => {
                    const isMe = msg.senderId === "me";
                    const prevMsg = idx > 0 ? activeConv.messages[idx - 1] : null;
                    const isNewSender = !prevMsg || prevMsg.senderId !== msg.senderId;

                    return (
                      <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} ${isNewSender && idx > 0 ? "mt-4" : "mt-1"}`}>
                        {!isMe && isNewSender && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0 self-end"
                            style={{ background: "#374151" }}>
                            {activeConv.participantAvatar}
                          </div>
                        )}
                        {!isMe && !isNewSender && <div className="w-8 mr-2 shrink-0"></div>}
                        <div className={`max-w-xs lg:max-w-md ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                          <div
                            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                              isMe
                                ? "text-white rounded-br-sm"
                                : "bg-gray-100 text-gray-800 rounded-bl-sm"
                            }`}
                            style={isMe ? { background: "#F97316" } : {}}
                          >
                            {msg.text}
                          </div>
                          <span className="text-xs text-gray-400 px-1">{msg.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing indicator */}
                  {sending && (
                    <div className="flex justify-start">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0"
                        style={{ background: "#374151" }}>
                        {activeConv.participantAvatar}
                      </div>
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Info panel */}
                {showInfo && (
                  <aside className="hidden lg:flex w-64 border-l border-gray-100 flex-col p-5 shrink-0 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900">Informations</h3>
                      <button onClick={() => setShowInfo(false)} className="p-1 text-gray-400 hover:text-gray-600">
                        <X size={15} />{" "}
                      </button>
                    </div>
                    <div className="text-center mb-5">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3"
                        style={{ background: "#F97316" }}>
                        {activeConv.participantAvatar}
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{activeConv.participantName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activeConv.participantRole}</p>
                      <p className="text-xs text-gray-400">{activeConv.participantCompany}</p>
                    </div>
                    {activeConv.offerTitle && (
                      <div className="p-3 bg-white rounded-xl border border-gray-200 mb-4">
                        <p className="text-xs text-gray-400 mb-1">Offre concernée</p>
                        <p className="text-sm font-medium text-gray-800 mb-2">{activeConv.offerTitle}</p>
                        <button
                          onClick={() => navigate(`/offers/${activeConv.offerId}`)}
                          className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                          style={{ color: "#F97316" }}
                        >
                          <ExternalLink size={12} /> Voir l'offre
                        </button>
                      </div>
                    )}
                    <div className="p-3 bg-white rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-400 mb-2">Historique</p>
                      <p className="text-sm text-gray-700">{activeConv.messages.length} messages échangés</p>
                    </div>
                  </aside>
                )}
              </div>

              {/* Input area */}
              <div className="px-5 py-4 border-t border-gray-100 bg-white shrink-0">
                <div className="flex items-end gap-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0 mb-0.5">
                    <Paperclip size={18} />{" "}
                  </button>
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-orange-400 focus-within:ring-2 transition-all" style={{ "--tw-ring-color": "#fed7aa" } as React.CSSProperties}>
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      placeholder="Écrivez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full text-sm text-gray-800 bg-transparent resize-none outline-none placeholder-gray-400 max-h-32"
                      style={{ overflowY: "auto" }}
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim() || sending}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 shrink-0"
                    style={{ background: "#F97316" }}
                  >
                    <Send size={17} />{" "}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Entrée pour envoyer · Maj+Entrée pour un saut de ligne</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
