
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

  // Auto-select first bot when bots become available
  useEffect(() => {
    if (activeBots.length > 0 && !selectedBotId) {
      setSelectedBotId(activeBots[0].id);
    }
  }, [activeBots, selectedBotId]);

  // Simulate game stream with real bot positions
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
      const gridSize = 20 * zoom;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw pellets (food) - moving based on time
      ctx.fillStyle = '#00ff00';
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(Date.now() * 0.002 + i) * 200 + selectedBot.position.x * zoom) % canvas.width;
        const y = (Math.cos(Date.now() * 0.002 + i * 1.5) * 200 + selectedBot.position.y * zoom) % canvas.height;
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw viruses - fewer and more dangerous looking
      ctx.fillStyle = '#ff0000';
      for (let i = 0; i < 8; i++) {
        const x = (Math.sin(Date.now() * 0.001 + i * 3) * 300 + selectedBot.position.x * zoom * 0.5) % canvas.width;
        const y = (Math.cos(Date.now() * 0.001 + i * 3) * 300 + selectedBot.position.y * zoom * 0.5) % canvas.height;
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          ctx.beginPath();
          ctx.arc(x, y, 25, 0, Math.PI * 2);
          ctx.fill();
          // Draw spikes
          ctx.strokeStyle = '#ff0000';
          ctx.lineWidth = 3;
          for (let spike = 0; spike < 12; spike++) {
            const angle = (spike / 12) * Math.PI * 2 + Date.now() * 0.001;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(angle) * 25, y + Math.sin(angle) * 25);
            ctx.lineTo(x + Math.cos(angle) * 35, y + Math.sin(angle) * 35);
            ctx.stroke();
          }
        }
      }

      // Draw selected bot (camera bot) at center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.fillStyle = '#00aaff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, selectedBot.mass * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw bot outline
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw bot name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(selectedBot.id.substring(0, 8), centerX, centerY - selectedBot.mass * 0.8 - 10);

      // Draw other bots relative to selected bot
      activeBots.forEach(bot => {
        if (bot.id === selectedBotId) return;
        
        const relativeX = (bot.position.x - selectedBot.position.x) * zoom * 0.3 + centerX;
        const relativeY = (bot.position.y - selectedBot.position.y) * zoom * 0.3 + centerY;
        
        if (relativeX > -100 && relativeX < canvas.width + 100 && 
            relativeY > -100 && relativeY < canvas.height + 100) {
          ctx.fillStyle = '#ffaa00';
          ctx.beginPath();
          ctx.arc(relativeX, relativeY, bot.mass * 0.5, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw bot outline
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Draw bot name
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(bot.id.substring(0, 6), relativeX, relativeY - bot.mass * 0.5 - 8);
        }
      });

      // Draw movement trails if enabled
      if (showPaths) {
        ctx.strokeStyle = '#00aaff50';
        ctx.lineWidth = 5;
        ctx.beginPath();
        // Draw a trail effect around the bot
        for (let i = 0; i < 5; i++) {
          const trailX = centerX - selectedBot.velocity.x * i * 10;
          const trailY = centerY - selectedBot.velocity.y * i * 10;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 5 - i, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw HUD
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(10, 10, 220, 100);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Bot: ${selectedBot.id.substring(0, 10)}`, 20, 30);
      ctx.fillText(`Mass: ${selectedBot.mass.toFixed(1)}`, 20, 50);
      ctx.fillText(`Server: ${selectedBot.server}`, 20, 70);
      ctx.fillText(`Position: (${selectedBot.position.x.toFixed(0)}, ${selectedBot.position.y.toFixed(0)})`, 20, 90);
    };

    const interval = setInterval(drawGameFrame, 100); // 10 FPS
    return () => clearInterval(interval);
  }, [isStreaming, selectedBotId, bots, zoom, showPaths, activeBots]);

  const handleStartStream = () => {
    console.log('Starting stream for bot:', selectedBotId);
    if (activeBots.length === 0) {
      console.log('No active bots to stream');
      return;
    }
    if (!selectedBotId && activeBots.length > 0) {
      setSelectedBotId(activeBots[0].id);
    }
    setIsStreaming(true);
  };

  const handleStopStream = () => {
    console.log('Stopping stream');
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
