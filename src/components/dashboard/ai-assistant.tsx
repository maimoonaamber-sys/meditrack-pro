
'use client';

import { useState } from 'react';
import { Bot, Send, User, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { askQuestion } from '@/ai/flows/medication-assistant-flow';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
      { role: 'assistant', content: "Hello! I'm your AI assistant. Ask me anything about medications." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await askQuestion(input);
        const assistantMessage: Message = { role: 'assistant', content: response };
        setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
        console.error("AI Error:", error);
        const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">AI Assistant</CardTitle>
            <CardDescription>
              Ask about medication uses, side effects, and more.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-64 pr-4">
             <div className="space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                         {message.role === 'assistant' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot size={20} /></AvatarFallback>
                            </Avatar>
                         )}
                         <div className={`rounded-lg px-3 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                             <p className="whitespace-pre-wrap">{message.content}</p>
                         </div>
                         {message.role === 'user' && (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback><User size={20} /></AvatarFallback>
                            </Avatar>
                         )}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot size={20} /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-3 py-2 text-sm bg-muted flex items-center">
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Thinking...
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full items-center space-x-2">
            <Input 
                type="text" 
                placeholder="Type your question..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
