// pages/ChatPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FiSearch, FiSend, FiPaperclip, FiImage, FiUser } from 'react-icons/fi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  position: string;
  airline: string;
  avatar: string;
  lastMessage: string;
  lastActive: string;
  unread: number;
}

const ChatPage: React.FC = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      position: 'Senior Flight Attendant',
      airline: 'Emirates Airlines',
      avatar: 'SJ',
      lastMessage: 'Looking forward to connecting!',
      lastActive: '2 min ago',
      unread: 0
    },
    {
      id: '2',
      name: 'James Wilson',
      position: 'Flight Attendant',
      airline: 'Singapore Airlines',
      avatar: 'JW',
      lastMessage: 'Thanks for the advice!',
      lastActive: '1 hour ago',
      unread: 3
    },
    {
      id: '3',
      name: 'Emma Davis',
      position: 'Cabin Crew Manager',
      airline: 'Qatar Airways',
      avatar: 'ED',
      lastMessage: 'Let me know if you need any help',
      lastActive: '5 hours ago',
      unread: 0
    }
  ]);
  
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simuler des messages initiaux
  useEffect(() => {
    if (userId && contacts.length > 0) {
      const contact = contacts.find(c => c.id === userId) || contacts[0];
      setSelectedContact(contact);
      
      // Messages simulés
      const initialMessages: Message[] = [
        {
          id: '1',
          text: "Hi there! Thanks for connecting with me.",
          sender: 'contact',
          timestamp: new Date(Date.now() - 3600000),
          read: true
        },
        {
          id: '2',
          text: "Hello! I'm interested in learning more about your experience at Emirates.",
          sender: 'user',
          timestamp: new Date(Date.now() - 3500000),
          read: true
        },
        {
          id: '3',
          text: "I'd be happy to share my experience. What would you like to know?",
          sender: 'contact',
          timestamp: new Date(Date.now() - 3400000),
          read: true
        },
        {
          id: '4',
          text: "How was the training process and what are the key qualities they look for?",
          sender: 'user',
          timestamp: new Date(Date.now() - 3300000),
          read: true
        }
      ];
      
      setMessages(initialMessages);
    }
  }, [userId, contacts]);

  // Scroll vers le bas des messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      read: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simuler une réponse après 2 secondes
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "That's a great question! The training was intensive but very rewarding. They focus heavily on safety procedures and customer service excellence.",
        sender: 'contact',
        timestamp: new Date(),
        read: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-emirates font-bold text-black mb-3">
          Messages
        </h1>
        <p className="text-gray-600 font-montessart text-lg">
          Connect and chat with your aviation network
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
        {/* Contacts Sidebar */}
        <div className="lg:w-80 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 font-montessart focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
                  selectedContact?.id === contact.id
                    ? 'bg-[#423772]/10 border-l-4 border-l-[#423772]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#423772] to-[#6D5BA6] rounded-xl flex items-center justify-center text-white font-bold font-emirates">
                    {contact.avatar}
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800 font-montessart truncate">
                        {contact.name}
                      </h3>
                      {contact.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-montessart font-semibold">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 font-montessart text-sm truncate">
                      {contact.lastMessage}
                    </p>
                    <p className="text-gray-400 font-montessart text-xs mt-1">
                      {contact.lastActive}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#423772] to-[#6D5BA6] rounded-xl flex items-center justify-center text-white font-bold font-emirates">
                    {selectedContact.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 font-montessart">
                      {selectedContact.name}
                    </h3>
                    <p className="text-gray-500 font-montessart text-sm">
                      {selectedContact.position} • {selectedContact.airline}
                    </p>
                  </div>
                </div>
                <div className="text-gray-500 font-montessart text-sm">
                  Last active: {selectedContact.lastActive}
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3/4 rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-[#423772] text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-line font-montessart">
                        {message.text}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                        {message.sender === 'user' && (
                          <span className="ml-2">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                      <FiPaperclip className="text-lg" />
                    </button>
                    <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                      <FiImage className="text-lg" />
                    </button>
                  </div>
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-xl p-3 font-montessart resize-none focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-[#423772] text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#312456] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <FiSend className="text-lg" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <FiUser className="text-6xl mb-4 text-gray-300" />
              <p className="font-montessart text-lg mb-2">No conversation selected</p>
              <p className="font-montessart text-sm">Choose a contact to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;