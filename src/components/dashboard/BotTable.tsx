
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bot } from "@/pages/Dashboard";
import { Server } from "lucide-react";

interface BotTableProps {
  bots: Bot[];
}

export const BotTable = ({ bots }: BotTableProps) => {
  const getStatusColor = (status: Bot['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'starting':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'stopped':
        return 'bg-red-500/20 text-red-400 border-red-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const formatUptime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6">Bot Status</h3>
      
      <div className="max-h-64 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-gray-300">Bot ID</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Server</TableHead>
              <TableHead className="text-gray-300">Mass</TableHead>
              <TableHead className="text-gray-300">Uptime</TableHead>
              <TableHead className="text-gray-300">Position</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bots.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                  No bots deployed
                </TableCell>
              </TableRow>
            ) : (
              bots.map((bot) => (
                <TableRow key={bot.id} className="border-white/10">
                  <TableCell className="text-white font-mono text-sm">
                    {bot.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(bot.status)}>
                      {bot.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Server className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 font-semibold text-sm">
                        {bot.server}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-400 font-semibold">
                    {bot.mass.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-purple-400">
                    {formatUptime(bot.uptime)}
                  </TableCell>
                  <TableCell className="text-gray-300 font-mono text-xs">
                    ({bot.position.x.toFixed(0)}, {bot.position.y.toFixed(0)})
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
