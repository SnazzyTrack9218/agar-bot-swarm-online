import { useState, useEffect } from "react";
import { BotControls } from "@/components/dashboard/BotControls";
import { BotStats } from "@/components/dashboard/BotStats";
import { MassChart } from "@/components/dashboard/MassChart";
import { BotTable } from "@/components/dashboard/BotTable";
import { ProxySettings } from "@/components/dashboard/ProxySettings";
import { IntelligenceSettings } from "@/components/dashboard/IntelligenceSettings";
import { ExportLogs } from "@/components/dashboard/ExportLogs";
import { LiveViewer } from "@/components/dashboard/LiveViewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export interface Bot {
  id: string;
  status: 'active' | 'stopped' | 'starting';
  mass: number;
  uptime: number;
  position: { x: number; y: number };
  server: string;
  velocity: { x: number; y: number };
}

export interface DashboardStats {
  activeBots: number;
  totalMass: number;
  totalUptime: number;
  massHistory: { time: string; mass: number }[];
}

const Dashboard = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    activeBots: 0,
    totalMass: 0,
    totalUptime: 0,
    massHistory: []
  });
  const [selectedBotCount, setSelectedBotCount] = useState(5);
  const [intelligence, setIntelligence] = useState('balanced');
  const [proxy, setProxy] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  // Simulate real-time movement and updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBots(prevBots => 
        prevBots.map(bot => {
          if (bot.status !== 'active') return bot;
          
          // Simulate movement with random velocity changes
          const newVelocity = {
            x: bot.velocity.x + (Math.random() - 0.5) * 2,
            y: bot.velocity.y + (Math.random() - 0.5) * 2
          };
          
          // Limit velocity
          const maxVelocity = 5;
          newVelocity.x = Math.max(-maxVelocity, Math.min(maxVelocity, newVelocity.x));
          newVelocity.y = Math.max(-maxVelocity, Math.min(maxVelocity, newVelocity.y));
          
          // Update position
          const newPosition = {
            x: bot.position.x + newVelocity.x,
            y: bot.position.y + newVelocity.y
          };
          
          // Keep bots within bounds
          newPosition.x = Math.max(0, Math.min(1000, newPosition.x));
          newPosition.y = Math.max(0, Math.min(1000, newPosition.y));
          
          return {
            ...bot,
            mass: bot.mass + Math.random() * 2, // Simulate mass gain
            uptime: bot.uptime + 1,
            position: newPosition,
            velocity: newVelocity
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update stats when bots change
  useEffect(() => {
    const activeBots = bots.filter(bot => bot.status === 'active').length;
    const totalMass = bots.reduce((sum, bot) => sum + bot.mass, 0);
    const totalUptime = bots.reduce((sum, bot) => sum + bot.uptime, 0);

    setStats(prev => ({
      activeBots,
      totalMass,
      totalUptime,
      massHistory: [
        ...prev.massHistory.slice(-29),
        { time: new Date().toLocaleTimeString(), mass: totalMass }
      ]
    }));
  }, [bots]);

  const handleStartBots = async () => {
    console.log('Starting bots...', selectedBotCount);
    setIsStarting(true);
    
    // Create new bots with random server assignments
    const servers = ['US-East-1', 'US-West-2', 'EU-Central-1', 'Asia-Pacific-1', 'US-Central-3'];
    const newBots: Bot[] = Array.from({ length: selectedBotCount }, (_, i) => ({
      id: `bot-${Date.now()}-${i}`,
      status: 'starting' as const,
      mass: 10,
      uptime: 0,
      position: { 
        x: Math.random() * 1000, 
        y: Math.random() * 1000 
      },
      server: servers[Math.floor(Math.random() * servers.length)],
      velocity: { 
        x: (Math.random() - 0.5) * 4, 
        y: (Math.random() - 0.5) * 4 
      }
    }));

    setBots(newBots);
    console.log('Created bots:', newBots);

    // Simulate startup delay
    setTimeout(() => {
      setBots(prev => prev.map(bot => ({ 
        ...bot, 
        status: 'active' as const, 
        mass: 15 + Math.random() * 10 
      })));
      setIsStarting(false);
      console.log('Bots are now active');
    }, 2000);
  };

  const handleStopBots = () => {
    console.log('Stopping bots');
    setBots(prev => prev.map(bot => ({ ...bot, status: 'stopped' as const })));
  };

  const handleStopAllBots = () => {
    console.log('Emergency stop - removing all bots');
    setBots([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-purple-400/50 text-purple-300 hover:bg-purple-400/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">Bot Control Dashboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 space-y-6">
            <BotControls
              selectedBotCount={selectedBotCount}
              onBotCountChange={setSelectedBotCount}
              onStartBots={handleStartBots}
              onStopBots={handleStopBots}
              onStopAllBots={handleStopAllBots}
              isStarting={isStarting}
              hasActiveBots={bots.some(bot => bot.status === 'active')}
            />
            <IntelligenceSettings
              intelligence={intelligence}
              onIntelligenceChange={setIntelligence}
            />
            <ProxySettings
              proxy={proxy}
              onProxyChange={setProxy}
            />
            <ExportLogs bots={bots} />
          </div>
          
          <div className="lg:col-span-2">
            <BotStats stats={stats} />
          </div>
        </div>

        {/* Live Viewer Section */}
        <div className="mb-8">
          <LiveViewer bots={bots} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MassChart massHistory={stats.massHistory} />
          <BotTable bots={bots} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
