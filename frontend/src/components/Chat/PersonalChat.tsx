"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiSend,
  FiSmile,
  FiPaperclip,
  FiFile,
  FiMapPin,
  FiMoreVertical,
  FiCopy,
  FiEdit3,
  FiTrash2,
  FiDownload,
  FiImage,
  FiVideo,
  FiMic,
  FiPhone,
  FiSearch,
  FiInfo,
  FiX,
  FiPlus,
} from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { ReplyIcon } from "lucide-react";
import { FcVideoCall } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";

interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
  reactedByMe: boolean;
}

interface ChatMessage {
  id: number;
  fromMe: boolean;
  message: string;
  time: string;
  status: "sent" | "delivered" | "read";
  replyTo?: ChatMessage;
  reactions?: MessageReaction[];
  type?: "text" | "file" | "image" | "video" | "audio" | "location";
  fileData?: {
    name: string;
    size: string;
    url: string;
  };
  isEdited?: boolean;
  editHistory?: { message: string; editedAt: string }[];
}

interface PersonalChatProps {
  data: {
    name: string;
    avatar: string;
    isOnline: boolean;
    lastSeen: string;
    chats: ChatMessage[];
  };
  onBack?: () => void;
}

const defaultData: PersonalChatProps["data"] = {
  name: "John Doe",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  isOnline: true,
  lastSeen: "2 hours ago",
  chats: [
    {
      id: 1,
      fromMe: true,
      message: "Halo, sudah kirim invoice?",
      time: "10:00",
      status: "read",
      reactions: [
        { emoji: "👍", count: 1, users: ["John"], reactedByMe: false },
      ],
    },
    {
      id: 2,
      fromMe: false,
      message: "Belum, bentar ya... Lagi proses nih, sebentar lagi selesai.",
      time: "10:02",
      status: "read",
    },
    {
      id: 3,
      fromMe: true,
      message: "Oke siap, kutunggu. Thanks ya!",
      time: "10:03",
      status: "delivered",
      reactions: [
        { emoji: "😊", count: 1, users: ["John"], reactedByMe: false },
        { emoji: "👌", count: 1, users: ["John"], reactedByMe: false },
      ],
    },
  ],
};

export const PersonalChat = ({
  data = defaultData,
  onBack,
}: PersonalChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(data.chats);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(
    null
  );
  const [showEmoji, setShowEmoji] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
    message: ChatMessage;
  } | null>(null);
  const [showReactionPicker, setShowReactionPicker] = useState<{
    show: boolean;
    messageId: number;
    x: number;
    y: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { name, avatar, isOnline, lastSeen } = data;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (editingMessage) {
      setInput(editingMessage.message);
      inputRef.current?.focus();
    }
  }, [editingMessage]);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
      setShowReactionPicker(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    if (editingMessage) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingMessage.id
            ? {
                ...msg,
                message: input,
                isEdited: true,
                editHistory: [
                  ...(msg.editHistory || []),
                  {
                    message: msg.message,
                    editedAt: new Date().toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  },
                ],
              }
            : msg
        )
      );
      setEditingMessage(null);
    } else {
      const newMessage: ChatMessage = {
        id: Date.now(),
        fromMe: true,
        message: input,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
        replyTo: replyTo || undefined,
      };
      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "read" } : msg
          )
        );
      }, 2000);
    }

    setInput("");
    setReplyTo(null);
  }, [input, editingMessage, replyTo]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape") {
      setEditingMessage(null);
      setReplyTo(null);
      setInput("");
    }
  };

  const handleRightClick = (e: React.MouseEvent, message: ChatMessage) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      message,
    });
  };

  const handleDoubleClick = (message: ChatMessage) => {
    setShowReactionPicker({
      show: true,
      messageId: message.id,
      x: 0,
      y: 0,
    });
  };

  const copyMessage = (message: ChatMessage) => {
    navigator.clipboard.writeText(message.message);
    setContextMenu(null);
  };

  const deleteMessage = (messageId: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    setContextMenu(null);
  };

  const addReaction = (messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find((r) => r.emoji === emoji);

          if (existingReaction) {
            if (existingReaction.reactedByMe) {
              return {
                ...msg,
                reactions:
                  existingReaction.count === 1
                    ? reactions.filter((r) => r.emoji !== emoji)
                    : reactions.map((r) =>
                        r.emoji === emoji
                          ? { ...r, count: r.count - 1, reactedByMe: false }
                          : r
                      ),
              };
            } else {
              return {
                ...msg,
                reactions: reactions.map((r) =>
                  r.emoji === emoji
                    ? {
                        ...r,
                        count: r.count + 1,
                        reactedByMe: true,
                        users: [...r.users, "Me"],
                      }
                    : r
                ),
              };
            }
          } else {
            return {
              ...msg,
              reactions: [
                ...reactions,
                { emoji, count: 1, users: ["Me"], reactedByMe: true },
              ],
            };
          }
        }
        return msg;
      })
    );
    setShowReactionPicker(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        fromMe: true,
        message: `📎 ${file.name}`,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
        type: "file",
        fileData: {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + " KB",
          url: URL.createObjectURL(file),
        },
      };
      setMessages((prev) => [...prev, newMessage]);
    }
    setShowActions(false);
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newMessage: ChatMessage = {
          id: Date.now(),
          fromMe: true,
          message: `📍 Location: ${latitude.toFixed(6)}, ${longitude.toFixed(
            6
          )}`,
          time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "sent",
          type: "location",
        };
        setMessages((prev) => [...prev, newMessage]);
      },
      (err) => {
        alert("Error getting location: " + err.message);
      }
    );
    setShowActions(false);
  };

  const emojis = [
    "😀",
    "😂",
    "🥲",
    "😍",
    "😎",
    "🔥",
    "👍",
    "🎉",
    "❤️",
    "😢",
    "😮",
    "🤔",
  ];
  const reactionEmojis = [
    "❤️",
    "😂",
    "😮",
    "😢",
    "😡",
    "👍",
    "👎",
    "🔥",
    "🎉",
    "😍",
  ];

  const filteredMessages = messages.filter(
    (msg) =>
      !searchQuery ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <FiArrowLeft
              size={18}
              className="text-slate-600 dark:text-slate-300"
            />
          </button>
          <div className="relative">
            <img
              src={avatar}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              alt="avatar"
            />
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isOnline ? (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online
                </span>
              ) : (
                `Last seen ${lastSeen}`
              )}
            </p>
            {isTyping && (
              <p className="text-xs text-blue-500 animate-pulse">typing...</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <FiSearch
              size={18}
              className="text-slate-600 dark:text-slate-300"
            />
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <FiPhone size={18} className="text-slate-600 dark:text-slate-300" />
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <FcVideoCall
              size={18}
              className="text-slate-600 dark:text-slate-300"
            />
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <FiInfo size={18} className="text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700"
          >
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-slate-100 dark:bg-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <FiX size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
        <AnimatePresence>
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`max-w-[75%] ${
                message.fromMe ? "ml-auto" : "mr-auto"
              }`}
            >
              {/* Reply Preview */}
              {message.replyTo && (
                <div
                  className={`mb-2 p-2 rounded-lg bg-slate-200/50 dark:bg-slate-700/50 border-l-4 ${
                    message.fromMe ? "border-blue-500" : "border-slate-400"
                  } text-xs`}
                >
                  <p className="text-slate-500 dark:text-slate-400 truncate">
                    Replying to: {message.replyTo.message}
                  </p>
                </div>
              )}

              <div
                className={`group relative px-4 py-3 rounded-2xl text-sm shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  message.fromMe
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-lg"
                    : "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-lg border border-slate-200 dark:border-slate-600"
                }`}
                onContextMenu={(e) => handleRightClick(e, message)}
                onDoubleClick={() => handleDoubleClick(message)}
              >
                {message.type === "file" && message.fileData && (
                  <div className="flex items-center space-x-3 mb-2 p-3 bg-white/10 rounded-lg">
                    <FiFile className="text-2xl" />
                    <div>
                      <p className="font-medium">{message.fileData.name}</p>
                      <p className="text-xs opacity-80">
                        {message.fileData.size}
                      </p>
                    </div>
                    <button className="ml-auto p-1 hover:bg-white/20 rounded">
                      <FiDownload size={16} />
                    </button>
                  </div>
                )}

                <p className="whitespace-pre-wrap break-words">
                  {message.message}
                </p>

                {message.isEdited && (
                  <span className="text-xs opacity-60 italic ml-2">
                    (edited)
                  </span>
                )}

                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {message.reactions.map((reaction) => (
                      <button
                        key={reaction.emoji}
                        onClick={() => addReaction(message.id, reaction.emoji)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
                          reaction.reactedByMe
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                        }`}
                      >
                        <span>{reaction.emoji}</span>
                        <span>{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Message Info */}
                <div
                  className={`flex items-center justify-end mt-2 space-x-1 text-[10px] ${
                    message.fromMe
                      ? "text-white/70"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <span>{message.time}</span>
                  {message.fromMe && (
                    <>
                      {message.status === "sent" && (
                        <FiCheck size={12} className="text-slate-300" />
                      )}
                      {message.status === "delivered" && (
                        <div className="flex -space-x-1">
                          <FiCheck size={12} className="text-slate-300" />
                          <FiCheck size={12} className="text-slate-300" />
                        </div>
                      )}
                      {message.status === "read" && (
                        <div className="flex -space-x-1">
                          <IoCheckmarkDoneSharp
                            size={12}
                            className="text-blue-300"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-50 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-600 py-2 min-w-[150px]"
            style={{
              left: Math.min(contextMenu.x, window.innerWidth - 200),
              top: Math.min(contextMenu.y, window.innerHeight - 300),
            }}
          >
            <button
              onClick={() => setReplyTo(contextMenu.message)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
            >
              <ReplyIcon size={14} />
              Reply
            </button>
            <button
              onClick={() => copyMessage(contextMenu.message)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
            >
              <FiCopy size={14} />
              Copy
            </button>
            {contextMenu.message.fromMe && (
              <button
                onClick={() => {
                  setEditingMessage(contextMenu.message);
                  setContextMenu(null);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
              >
                <FiEdit3 size={14} />
                Edit
              </button>
            )}
            <button
              onClick={() => deleteMessage(contextMenu.message.id)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 flex items-center gap-3"
            >
              <FiTrash2 size={14} />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reaction Picker */}
      <AnimatePresence>
        {showReactionPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-600 p-3"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex gap-2">
              {reactionEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() =>
                    addReaction(showReactionPicker.messageId, emoji)
                  }
                  className="text-2xl p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply/Edit Preview */}
      <AnimatePresence>
        {(replyTo || editingMessage) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                {editingMessage ? (
                  <>
                    <FiEdit3 size={14} />
                    <span>Editing message</span>
                  </>
                ) : (
                  <>
                    <ReplyIcon size={14} />
                    <span>Replying to: {replyTo?.message}</span>
                  </>
                )}
              </div>
              <button
                onClick={() => {
                  setReplyTo(null);
                  setEditingMessage(null);
                  setInput("");
                }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                <FiX size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Section */}
      <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-end space-x-3">
          <div className="relative">
            <button
              onClick={() => {
                setShowEmoji(!showEmoji);
                setShowActions(false);
              }}
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <FiSmile size={20} />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowActions(!showActions);
                setShowEmoji(false);
              }}
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <FiPlus size={20} />
            </button>
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                editingMessage ? "Edit message..." : "Type a message..."
              }
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white rounded-full transition-colors disabled:cursor-not-allowed"
          >
            <FiSend size={18} />
          </button>
        </div>

        {/* Emoji Picker */}
        <AnimatePresence>
          {showEmoji && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600"
            >
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setInput((prev) => prev + emoji)}
                    className="text-2xl p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions Menu */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600"
            >
              <div className="grid grid-cols-4 gap-4 text-sm">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    <FiFile size={20} />
                  </div>
                  <span>File</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                    <FiImage size={20} />
                  </div>
                  <span>Photo</span>
                </button>

                <button className="flex flex-col items-center gap-2 p-3 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                    <FiVideo size={20} />
                  </div>
                  <span>Video</span>
                </button>

                <button
                  onClick={handleShareLocation}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                    <FiMapPin size={20} />
                  </div>
                  <span>Location</span>
                </button>

                <button className="flex flex-col items-center gap-2 p-3 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                    <FiMic size={20} />
                  </div>
                  <span>Voice</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          multiple
          accept="*/*"
        />
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};
