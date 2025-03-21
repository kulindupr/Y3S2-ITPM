import React, { useState, useRef, useEffect } from 'react';
import { Search, MessageSquare, User, ChevronDown, Plus, Send, Mic } from 'lucide-react';

const InternLinkAIAssistant = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const conversations = [
        { id: 1, title: 'Form Conversion Example' },
        { id: 2, title: 'SQL Branch Insertion Example' },
        { id: 3, title: 'Form Conversion Request' },
        { id: 4, title: 'Delete function review' },
        { id: 5, title: 'Row Click Popup Load' },
        { id: 6, title: 'Popup Implementation Issues' },
        { id: 7, title: 'Row data to popup debug' },
        { id: 8, title: 'New chat' },
        { id: 9, title: 'Popup Data Not Displaying' },
        { id: 10, title: 'Popup data not showing' },
        { id: 11, title: 'Branch Info Popup Fix' },
        { id: 12, title: 'Sidebar Menu Code' },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');

            // Simulate AI response
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: "I'm InternLink AI Assistant. How can I help with your internship search today?",
                    sender: 'ai'
                }]);
            }, 1000);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar with updated colors */}
            <div className="w-64 bg-[#f0f6fe] border-r border-[#c2dcfe] text-[#4a8eff] flex flex-col h-full">
                {/* Top section with new chat button */}
                <div className="p-2 border-b border-[#c2dcfe]">
                    <button className="flex items-center justify-between w-full p-3 rounded-md hover:bg-[#c2dcfe] transition-colors">
                        <div className="flex items-center">
                            <MessageSquare size={18} className="mr-2" />
                            <span className="font-medium">InternLink AI</span>
                        </div>
                        <ChevronDown size={18} />
                    </button>
                </div>

                {/* Sections */}
                <div className="flex-1 overflow-y-auto">

                    {/* Today section */}
                    <div className="p-2">
                        <div className="text-xs text-[#4a8eff] font-medium px-3 py-1">Today</div>
                        {conversations.slice(0, 8).map(conv => (
                            <button key={conv.id} className="flex items-center w-full p-3 text-left rounded-md hover:bg-[#c2dcfe] transition-colors">
                                <span className="truncate">{conv.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <header className="border-b border-[#c2dcfe] p-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            className="md:hidden p-2 rounded-md text-[#4a8eff] hover:bg-[#f0f6fe]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <div className="ml-2 flex items-center">
                            <span className="font-semibold text-[#4a8eff]">InternLink</span>
                            <span className="ml-1 bg-[#f0f6fe] text-[#4a8eff] px-2 py-0.5 rounded text-sm">AI Assistant</span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button className="p-1 rounded-full text-[#4a8eff] hover:bg-[#f0f6fe]">
                            <Search size={20} />
                        </button>
                        <button className="ml-2 p-1 rounded-full bg-[#4a8eff] text-white">
                            <User size={20} />
                        </button>
                    </div>
                </header>

                {/* Chat area */}
                <div className="flex-1 overflow-y-auto p-4 bg-white">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-bold text-[#4a8eff] mb-6">What can I help with?</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                                <button className="p-4 bg-[#f0f6fe] rounded-lg text-left hover:bg-[#c2dcfe] transition-colors">
                                    <h3 className="font-medium text-[#4a8eff]">Find internships</h3>
                                    <p className="text-gray-600 text-sm">Search for internships matching your skills</p>
                                </button>
                                <button className="p-4 bg-[#f0f6fe] rounded-lg text-left hover:bg-[#c2dcfe] transition-colors">
                                    <h3 className="font-medium text-[#4a8eff]">Resume review</h3>
                                    <p className="text-gray-600 text-sm">Get feedback on your resume</p>
                                </button>
                                <button className="p-4 bg-[#f0f6fe] rounded-lg text-left hover:bg-[#c2dcfe] transition-colors">
                                    <h3 className="font-medium text-[#4a8eff]">Interview prep</h3>
                                    <p className="text-gray-600 text-sm">Practice for your upcoming interviews</p>
                                </button>
                                <button className="p-4 bg-[#f0f6fe] rounded-lg text-left hover:bg-[#c2dcfe] transition-colors">
                                    <h3 className="font-medium text-[#4a8eff]">Application tips</h3>
                                    <p className="text-gray-600 text-sm">Learn how to stand out in applications</p>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user'
                                                ? 'bg-[#4a8eff] text-white rounded-br-none'
                                                : 'bg-[#f0f6fe] text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div className="border-t border-[#c2dcfe] p-4 bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask anything..."
                                className="w-full p-3 pr-10 border border-[#c2dcfe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a8eff] focus:border-transparent"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4a8eff] hover:text-[#3a7eef]"
                            >
                                <Mic size={20} />
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className={`ml-2 p-3 rounded-lg ${input.trim()
                                    ? 'bg-[#4a8eff] text-white hover:bg-[#3a7eef]'
                                    : 'bg-[#f0f6fe] text-[#4a8eff] cursor-not-allowed'
                                } transition-colors`}
                        >
                            <Send size={20} />
                        </button>
                    </form>
                    <div className="mt-2 text-xs text-center text-gray-500">
                        InternLink AI Assistant may produce inaccurate information about internships or companies.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternLinkAIAssistant;