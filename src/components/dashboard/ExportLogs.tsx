
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Bot } from "@/pages/Dashboard";

interface ExportLogsProps {
  bots: Bot[];
}

export const ExportLogs = ({ bots }: ExportLogsProps) => {
  const exportToCSV = () => {
    const headers = ['Bot ID', 'Status', 'Mass', 'Uptime (seconds)', 'Position X', 'Position Y'];
    const csvContent = [
      headers.join(','),
      ...bots.map(bot => [
        bot.id,
        bot.status,
        bot.mass.toFixed(2),
        bot.uptime,
        bot.position.x.toFixed(0),
        bot.position.y.toFixed(0)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bot-logs-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Export Data</h3>
      
      <Button
        onClick={exportToCSV}
        disabled={bots.length === 0}
        variant="outline"
        className="w-full border-green-400/50 text-green-300 hover:bg-green-400/10"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Logs as CSV
      </Button>
      
      <p className="text-xs text-gray-400 mt-2">
        Export bot performance data for analysis
      </p>
    </div>
  );
};
