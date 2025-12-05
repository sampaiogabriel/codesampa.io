import { FeatureType } from '@/components/pages/home/shape-shifter/components';

export const CODE_SNIPPETS: Record<FeatureType, string> = {
  analytics: `// src/components/analytics/revenue-chart.tsx
import { useQuery } from '@tanstack/react-query';
import { BarChart, Card } from '@ui/kits';

export function RevenueChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['revenue_metrics'],
    queryFn: fetchRevenueData,
    refetchInterval: 5000 // Real-time
  });

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur">
      <div className="flex justify-between mb-6">
        <h3 className="font-bold text-white">Revenue Trend</h3>
        <Badge variant="success">+{data.growth}%</Badge>
      </div>
      
      <BarChart 
        data={data.history}
        color="primary"
        animate={true}
        height={300}
      />
    </Card>
  );
}`,
  crm: `// src/features/crm/kanban-board.tsx
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useCRMStore } from '@/stores/crm';

export const KanbanBoard = () => {
  const { deals, updateStatus } = useCRMStore();

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    
    // Otimistic UI Update
    updateStatus(result.draggableId, result.destination.droppableId);
    
    // Sync with Server
    await api.deals.move({
      id: result.draggableId,
      status: result.destination.droppableId
    });
  };

  return (
    <div className="flex gap-4 h-full overflow-x-auto p-4">
      {Object.entries(deals).map(([status, items]) => (
        <KanbanColumn 
          key={status} 
          status={status} 
          items={items} 
        />
      ))}
    </div>
  );
}`,
  chat: `// src/lib/sockets/chat-client.ts
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

export function useRealtimeChat(channelId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL, {
      auth: { token: session.token }
    });

    socket.emit('join_channel', channelId);

    socket.on('new_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
      playNotificationSound();
    });

    socket.on('user_typing', (user) => {
      if (user.id !== currentUser.id) setIsTyping(true);
    });

    return () => socket.disconnect();
  }, [channelId]);

  return { messages, isTyping, sendMessage: socket.emit };
}`
};
