
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, ZoomIn, ZoomOut, Route, Maximize2 } from "lucide-react";
import { Bot } from "@/pages/Dashboard";

interface LiveViewerProps {
  bots: Bot[];
}

export const LiveViewer = ({ bots }: LiveViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedBotId, setSelectedBotId] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPaths, setShowPaths] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeBots = bots.filter(bot => bot.status === 'active');

  // Simulate game stream - in real implementation this would connect to WebSocket
  useEffect(() => {
    if (!isStreaming || !canvasRef.current || !selectedBotId) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const selectedBot = bots.find(bot => bot.id === selectedBotId);
    if (!selectedBot) return;

    const drawGameFrame = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw pellets (food)
      ctx.fillStyle = '#00ff00';
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(Date.now() * 0.001 + i) * 100 + canvas.width / 2) * zoom;
        const y = (Math.cos(Date.now() * 0.001 + i) * 100 + canvas.height / 2) * zoom;
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw viruses
      ctx.fillStyle = '#ff0000';
      for (let i = 0; i < 5; i++) {
        const x = (Math.sin(Date.now() * 0.0005 + i * 2) * 150 + canvas.width / 2) * zoom;
        const y = (Math.cos(Date.now() * 0.0005 + i * 2) * 150 + canvas.height / 2) * zoom;
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fill();
          // Draw spikes
          for (let spike = 0; spike < 8; spike++) {
            const angle = (spike / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * 20, y + Math.sin(angle) * 20);
            ctx.stroke();
          }
        }
      }

      // Draw bot (camera bot)
      const botX = selectedBot.position.x * zoom * 0.5;
      const botY = selectedBot.position.y * zoom * 0.5;
      
      ctx.fillStyle = '#00aaff';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, selectedBot.mass * 0.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw bot outline
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw other bots
      activeBots.forEach(bot => {
        if (bot.id === selectedBotId) return;
        
        const relativeX = (bot.position.x - selectedBot.position.x) * zoom * 0.5 + canvas.width / 2;
        const relativeY = (bot.position.y - selectedBot.position.y) * zoom * 0.5 + canvas.height / 2;
        
        if (relativeX > -50 && relativeX < canvas.width + 50 && 
            relativeY > -50 && relativeY < canvas.height + 50) {
          ctx.fillStyle = '#ffaa00';
          ctx.beginPath();
          ctx.arc(relativeX, relativeY, bot.mass * 0.3, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw bot name
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px monospace';
          ctx.fillText(bot.id.substring(0, 8), relativeX - 20, relativeY - bot.mass * 0.3 - 5);
        }
      });

      // Draw movement trails if enabled
      if (showPaths) {
        ctx.strokeStyle = '#00aaff50';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw HUD
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, 10, 200, 80);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px monospace';
      ctx.fillText(`Bot: ${selectedBot.id.substring(0, 8)}`, 20, 30);
      ctx.fillText(`Mass: ${selectedBot.mass.toFixed(1)}`, 20, 50);
      ctx.fillText(`Server: ${selectedBot.server}`, 20, 70);
    };

    const interval = setInterval(drawGameFrame, 100); // 10 FPS
    return () => clearInterval(interval);
  }, [isStreaming, selectedBotId, bots, zoom, showPaths, activeBots]);

  const handleStartStream = () => {
    if (activeBots.length === 0) return;
    if (!selectedBotId && activeBots.length > 0) {
      setSelectedBotId(activeBots[0].id);
    }
    setIsStreaming(true);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Live Game Viewer</h3>
        <div className="flex items-center space-x-2">
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="sm"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-400/10"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Camera Bot:</span>
            <Select value={selectedBotId} onValueChange={setSelectedBotId}>
              <SelectTrigger className="w-40 bg-white/10 border-purple-400/30 text-white">
                <SelectValue placeholder="Select bot" />
              </SelectTrigger>
              <SelectContent>
                {activeBots.map((bot) => (
                  <SelectItem key={bot.id} value={bot.id}>
                    {bot.id.substring(0, 8)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            {!isStreaming ? (
              <Button
                onClick={handleStartStream}
                disabled={activeBots.length === 0}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                Start Stream
              </Button>
            ) : (
              <Button
                onClick={handleStopStream}
                variant="outline"
                className="border-red-400/50 text-red-300 hover:bg-red-400/10"
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Stop Stream
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              variant="outline"
              size="sm"
              className="border-blue-400/50 text-blue-300 hover:bg-blue-400/10"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-300 px-2">{(zoom * 100).toFixed(0)}%</span>
            <Button
              onClick={() => setZoom(Math.min(3, zoom + 0.25))}
              variant="outline"
              size="sm"
              className="border-blue-400/50 text-blue-300 hover:bg-blue-400/10"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={() => setShowPaths(!showPaths)}
            variant="outline"
            size="sm"
            className={`border-yellow-400/50 ${showPaths ? 'bg-yellow-400/20 text-yellow-300' : 'text-yellow-300'} hover:bg-yellow-400/10`}
          >
            <Route className="w-4 h-4 mr-2" />
            Trails
          </Button>
        </div>

        {/* Stream Canvas */}
        <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black flex items-center justify-center' : ''}`}>
          <canvas
            ref={canvasRef}
            width={isFullscreen ? 1200 : 800}
            height={isFullscreen ? 800 : 500}
            className={`border border-white/20 rounded-lg ${isFullscreen ? '' : 'w-full max-w-4xl'}`}
            style={{ 
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
              imageRendering: 'pixelated'
            }}
          />
          
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <div className="text-center">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">
                  {activeBots.length === 0 ? 'No active bots to stream' : 'Click "Start Stream" to begin live viewing'}
                </p>
              </div>
            </div>
          )}

          {isFullscreen && (
            <Button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700"
            >
              Exit Fullscreen
            </Button>
          )}
        </div>

        {/* Stream Info */}
        {isStreaming && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-gray-400">Frame Rate</p>
              <p className="text-green-400 font-bold">10 FPS</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-gray-400">Latency</p>
              <p className="text-blue-400 font-bold">~100ms</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-gray-400">Quality</p>
              <p className="text-purple-400 font-bold">HD</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-gray-400">Zoom</p>
              <p className="text-yellow-400 font-bold">{(zoom * 100).toFixed(0)}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
