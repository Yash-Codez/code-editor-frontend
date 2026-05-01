import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import EditorRoom from './EditorRoom';
import { Code2, Zap, Users, ArrowRight } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const createRoom = () => {
    const id = Math.random().toString(36).substring(2, 9);
    navigate(`/${id}`);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 overflow-hidden relative font-sans">
      {/* Background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 py-12 flex flex-col min-h-screen relative z-10">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-xl shadow-lg shadow-red-600/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600 tracking-tight">
              NexusEditor
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            {/* <a href="#" className="hover:text-red-400 transition-colors">Features</a>
            <a href="#" className="hover:text-red-400 transition-colors">Documentation</a> */}
            <a href="https://github.com/Yash-Codez/code-editor-frontend" className="hover:text-red-400 transition-colors">GitHub</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 flex-grow">
          
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-6 animate-pulse">
              <Zap className="w-4 h-4" />
              <span>Real-time Sync Powered by Yjs</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
              Code together, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-rose-600">
                in perfect harmony.
              </span>
            </h1>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl leading-relaxed">
              Experience lightning-fast, conflict-free collaborative coding. Share a link and instantly start building with your team in a world-class editor environment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={createRoom}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] border border-red-500/50"
              >
                <span>Start Coding Now</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right side - Glassmorphism Card */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-800"></div>
              
              <h3 className="text-2xl font-bold mb-2 text-white">Join a Session</h3>
              <p className="text-neutral-400 text-sm mb-8">Enter your team's room ID to hop directly into their codebase.</p>
              
              <form onSubmit={joinRoom} className="space-y-4">
                <div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. x8f9a2" 
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all placeholder:text-neutral-600 font-mono"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={!roomId.trim()}
                  className="w-full bg-red-600/90 hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 border border-red-500/30 disabled:border-transparent"
                >
                  <Users className="w-5 h-5" />
                  Join Room
                </button>
              </form>
              
              {/* Decorative code snippet */}
              <div className="mt-8 pt-6 border-t border-neutral-800">
                <div className="flex gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-600/50"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-600/50"></div>
                </div>
                <pre className="text-xs text-neutral-400 font-mono bg-[#050505] p-4 rounded-xl border border-neutral-800 overflow-x-auto">
                  <span className="text-red-400">const</span> <span className="text-white">editor</span> = <span className="text-red-300">useCollab</span>();{'\n'}
                  <span className="text-red-400">await</span> editor.<span className="text-red-300">connect</span>({'{'} sync: <span className="text-red-500">true</span> {'}'});
                </pre>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:roomId" element={<EditorRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
