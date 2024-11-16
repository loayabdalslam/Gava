import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

interface Message {
  id: string;
  text: string;
  uid: string;
  username: string;
  createdAt: Date;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey everyone! Anyone working with Next.js?',
    uid: '2',
    username: 'alice',
    createdAt: new Date(Date.now() - 1000000)
  },
  {
    id: '2',
    text: 'Yes! Building a new project with App Router',
    uid: '1',
    username: 'johndoe',
    createdAt: new Date(Date.now() - 500000)
  }
];

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [message, setMessage] = useState('');
  const dummy = useRef<HTMLDivElement>(null);
  const user = useAuthStore(state => state.user);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      uid: user.id,
      username: user.username,
      createdAt: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.uid === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.uid === user?.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="text-sm font-medium">{msg.username}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={dummy} />
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-gray-700">
        <div className="flex space-x-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}