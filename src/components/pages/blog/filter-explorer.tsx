'use client';

import { Post } from '.velite';

import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  Folder,
  FolderOpen,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

import { cn } from '@/utils/functions/tw-merge';

// --- Tipos ---
type FileNode = {
  type: 'file';
  name: string;
  post: Post;
};

type FolderNode = {
  type: 'folder';
  name: string;
  children: (FolderNode | FileNode)[];
  isOpen?: boolean;
};

// --- Função para Construir a Árvore (Ano -> Categoria -> Post) ---
function buildFileTree(posts: Post[]): FolderNode[] {
  const root: FolderNode[] = [];

  // 1. Agrupar por Ano
  const postsByYear: Record<string, Post[]> = {};
  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  });

  // 2. Para cada Ano, agrupar por Tag (Categoria)
  Object.entries(postsByYear)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .forEach(([year, yearPosts]) => {
      const yearFolder: FolderNode = {
        type: 'folder',
        name: year,
        children: [],
        isOpen: true
      };

      const yearTags = Array.from(
        new Set(yearPosts.flatMap((p) => p.tags))
      ).sort();

      yearTags.forEach((tag) => {
        const tagPosts = yearPosts
          .filter((p) => p.tags.includes(tag))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );

        if (tagPosts.length > 0) {
          yearFolder.children.push({
            type: 'folder',
            name: tag,
            children: tagPosts.map((post) => ({
              type: 'file',
              name: `${post.slugAsParams}.tsx`,
              post
            })),
            isOpen: false
          });
        }
      });

      root.push(yearFolder);
    });

  return root;
}

// --- Função de Filtro ---
function filterTree(nodes: FolderNode[], query: string): FolderNode[] {
  if (!query) return nodes;
  const lowerQuery = query.toLowerCase();

  return nodes
    .map((node) => {
      const filteredChildren = node.children
        .map((child) => {
          if (child.type === 'folder') {
            const filteredSubChildren = filterTree([child], query);
            if (filteredSubChildren.length > 0) {
              return { ...filteredSubChildren[0], isOpen: true };
            }
            return null;
          } else {
            const matchesName = child.name.toLowerCase().includes(lowerQuery);
            const matchesTitle = child.post.title
              .toLowerCase()
              .includes(lowerQuery);
            return matchesName || matchesTitle ? child : null;
          }
        })
        .filter(Boolean) as (FolderNode | FileNode)[];

      if (filteredChildren.length > 0) {
        return { ...node, children: filteredChildren, isOpen: true };
      }
      return null;
    })
    .filter(Boolean) as FolderNode[];
}

// --- Componente de Item de Arquivo ---
const FileItem = ({ node }: { node: FileNode }) => (
  <Link
    href={`/blog/${node.post.slugAsParams}`}
    className="group flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary"
  >
    <FileCode2
      size={14}
      className="shrink-0 text-blue-400/80 group-hover:text-blue-400"
    />
    <span className="font-mono truncate relative top-[1px]">{node.name}</span>
    <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-60 transition-opacity whitespace-nowrap font-mono text-muted-foreground/80">
      {format(new Date(node.post.date), 'MM/dd')}
    </span>
  </Link>
);

// --- Componente de Pasta ---
const FolderItem = ({
  node,
  depth = 0
}: {
  node: FolderNode;
  depth?: number;
}) => {
  const [isOpen, setIsOpen] = useState(node.isOpen ?? false);

  return (
    <div className="select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground',
          isOpen && 'text-foreground'
        )}
      >
        <span className="shrink-0 opacity-70">
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <span
          className={cn(
            'shrink-0 transition-colors',
            depth === 0 ? 'text-purple-400/90' : 'text-yellow-400/90' // Ano = Roxo, Tag = Amarelo (VS Code style)
          )}
        >
          {isOpen ? <FolderOpen size={14} /> : <Folder size={14} />}
        </span>
        <span className="font-mono tracking-wide truncate relative top-[1px]">
          {node.name}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="ml-2.5 border-l border-white/5 pl-2">
              {node.children.map((child, i) =>
                child.type === 'folder' ? (
                  <FolderItem key={i} node={child} depth={depth + 1} />
                ) : (
                  <FileItem key={i} node={child} />
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Componente Principal ---
export function FileExplorer({
  posts,
  className
}: {
  posts: Post[];
  className?: string;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const fullTree = useMemo(() => buildFileTree(posts), [posts]);
  const visibleTree = useMemo(
    () => filterTree(fullTree, searchQuery),
    [fullTree, searchQuery]
  );

  return (
    <div
      className={cn(
        // Cores do Container Principal: Glassmorphism Escuro
        'flex flex-col w-full overflow-hidden rounded-xl border border-white/10 bg-card/30 backdrop-blur-md shadow-2xl',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 bg-white/5 px-3 gap-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 shrink-0 font-mono">
          Explorer
        </span>

        {/* Input de Pesquisa */}
        <div className="flex flex-1 items-center gap-2 rounded-md bg-black/40 px-2.5 py-1.5 border border-white/5 focus-within:border-primary/30 focus-within:bg-black/60 transition-all">
          <Search size={12} className="text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-mono"
          />
        </div>

        {/* Traffic Lights */}
        <div className="flex gap-1.5 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/20 border border-red-500/30" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/20 border border-green-500/30" />
        </div>
      </div>

      {/* Árvore de Arquivos */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        <div className="flex flex-col gap-0.5">
          {visibleTree.length > 0 ? (
            visibleTree.map((node, i) => <FolderItem key={i} node={node} />)
          ) : (
            <div className="py-8 text-center">
              <p className="text-[11px] text-muted-foreground font-mono">
                No results found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Status Bar */}
      <div className="flex h-7 shrink-0 items-center border-t border-white/5 bg-white/[0.02] px-3 text-[10px] text-muted-foreground font-mono select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-primary/80">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" />
            master*
          </span>
          <span className="opacity-50">|</span>
          <span>{posts.length} items</span>
        </div>
        <div className="ml-auto flex items-center gap-3 opacity-70">
          <span>TypeScript</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
