import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as Y from 'Y.js';
import { SocketIOProvider } from 'y-socket.io';
import { MonacoBinding } from 'y-monaco';
import { Users, Copy, Check, ChevronDown, Activity, Code2, ShieldAlert } from 'lucide-react';

const COLORS = ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#f87171'];

export default function EditorRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [clientsCount, setClientsCount] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const providerRef = useRef(null);
  const bindingRef = useRef(null);
  const docRef = useRef(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    docRef.current = ydoc;

    const provider = new SocketIOProvider('https://code-editor-backend-nb4w.onrender.com', roomId, ydoc, {
      autoConnect: true
    });
    providerRef.current = provider;

    provider.on('status', ({ status }) => {
      setIsConnected(status === 'connected');
    });

    const awareness = provider.awareness;
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    awareness.setLocalStateField('user', {
      name: `Hacker-${Math.floor(Math.random() * 1000)}`,
      color: randomColor,
    });

    awareness.on('change', () => {
      setClientsCount(awareness.getStates().size);
    });

    return () => {
      if (bindingRef.current) bindingRef.current.destroy();
      if (providerRef.current) providerRef.current.destroy();
      if (docRef.current) docRef.current.destroy();
    };
  }, [roomId]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const ytext = docRef.current.getText('monaco');
    bindingRef.current = new MonacoBinding(
      ytext, 
      editor.getModel(), 
      new Set([editor]), 
      providerRef.current.awareness
    );
  };

  const copyRoomUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 bg-[#0a0a0a] text-neutral-100`}>
      
      {/* Sleek Header */}
      <header className={`flex items-center justify-between px-6 py-4 border-b backdrop-blur-md sticky top-0 z-50 bg-[#0f0f0f]/80 border-red-900/30 shadow-lg shadow-red-900/5`}>
        
        <div className="flex items-center gap-6">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-red-600 to-red-900 p-1.5 rounded-lg group-hover:scale-105 transition-transform border border-red-500/20">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-red-500 hidden sm:block">
              Nexus
            </span>
          </div>
          
          <div className={`h-6 w-px bg-neutral-800`}></div>
          
          {/* Custom Select Wrapper */}
          <div className="relative group">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`appearance-none font-medium text-sm rounded-lg pl-4 pr-10 py-2 outline-none transition-all cursor-pointer bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-red-900/50 focus:border-red-600 focus:ring-1 focus:ring-red-600`}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
            </select>
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-red-600/50`} />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50">
            <div className="relative flex h-2.5 w-2.5">
              {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-red-500' : 'bg-neutral-600'}`}></span>
            </div>
            <span className="text-neutral-400">{isConnected ? 'System Online' : 'Disconnected'}</span>
          </div>

          {/* Active Users */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium bg-neutral-900 border-neutral-800 text-neutral-300`}>
            <Users className="w-4 h-4 text-red-500" />
            <span>{clientsCount}</span>
          </div>

          {/* Share Button */}
          <button 
            onClick={copyRoomUrl}
            className="flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-red-900/40 border border-red-500/30 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Share Room'}</span>
          </button>
        </div>
      </header>

      {/* Editor Main Area */}
      <div className="flex-grow w-full relative p-4 lg:p-6 overflow-hidden">
        <div className={`w-full h-full rounded-xl overflow-hidden border relative border-neutral-800 shadow-[0_0_40px_rgba(220,38,38,0.05)]`}>
          
          {/* Subtle gradient overlay for the editor container border */}
          <div className="absolute inset-0 rounded-xl pointer-events-none border border-red-500/10 z-10"></div>
          
          <Editor
            height="100%"
            width="100%"
            language={language}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              wordWrap: 'on',
              padding: { top: 24, bottom: 24 },
              fontFamily: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              formatOnPaste: true,
              renderLineHighlight: "all",
            }}
            loading={
              <div className="flex items-center justify-center h-full w-full bg-[#1e1e1e]">
                <Activity className="w-8 h-8 text-red-600 animate-spin" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
