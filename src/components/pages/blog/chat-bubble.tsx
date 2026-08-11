import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/utils/functions/tw-merge';
// Importação padrão do Shadcn (ajuste se sua pasta ui estiver em outro lugar)

interface ChatBubbleProps {
  side: 'left' | 'right';
  name: string;
  avatarSrc: string;
  children: React.ReactNode;
}

export function ChatBubble({
  side,
  name,
  avatarSrc,
  children
}: ChatBubbleProps) {
  const isInterviewer = side === 'right';
  const isClient = side === 'left';

  return (
    <div
      className={cn(
        'flex gap-4 my-6 items-start w-full',
        isInterviewer ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar Shadcn */}
      <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
        <AvatarImage src={avatarSrc} alt={name} className="object-cover" />
        {/* Fallback mostra a inicial do nome se a imagem falhar */}
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>

      {/* Container de Texto */}
      <div
        className={cn(
          'flex flex-col min-w-0',
          'flex-1 max-w-full md:max-w-[85%]',
          isInterviewer ? 'items-end' : 'items-start'
        )}
      >
        <span className="text-xs text-white mb-2 block px-0 font-medium">
          {name}
        </span>

        {/* Balão de Texto */}
        <div
          className={cn(
            'p-4 shadow-sm relative prose prose-sm max-w-none',
            'prose-p:my-1 prose-p:leading-relaxed',

            isClient
              ? 'rounded-3xl rounded-tl-none bg-muted text-foreground text-left prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-foreground'
              : 'rounded-3xl rounded-tr-none bg-muted text-foreground text-right'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
