
import { Bot, Activity, Clock } from "lucide-react";
import { DashboardStats } from "@/pages/Dashboard";

interface BotStatsProps {
  stats: DashboardStats;
}

export const BotStats = ({ stats }: BotStatsProps) => {
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Active Bots</p>
            <p className="text-3xl font-bold text-green-400">{stats.activeBots}</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
            <Bot className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Mass</p>
            <p className="text-3xl font-bold text-blue-400">{stats.totalMass.toFixed(0)}</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Uptime</p>
            <p className="text-3xl font-bold text-purple-400">{formatUptime(stats.totalUptime)}</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
            <Clock className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
