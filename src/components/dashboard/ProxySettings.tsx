
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

interface ProxySettingsProps {
  proxy: string;
  onProxyChange: (proxy: string) => void;
}

export const ProxySettings = ({ proxy, onProxyChange }: ProxySettingsProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-cyan-400" />
        <h3 className="text-xl font-bold text-white">Stealth Mode</h3>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="proxy" className="text-gray-300">
          Proxy/IP Address (Optional)
        </Label>
        <Input
          id="proxy"
          type="text"
          placeholder="192.168.1.1:8080"
          value={proxy}
          onChange={(e) => onProxyChange(e.target.value)}
          className="bg-white/10 border-cyan-400/30 text-white placeholder-gray-400"
        />
        <p className="text-xs text-gray-400">
          Leave empty to use your current IP. Format: IP:PORT
        </p>
      </div>
    </div>
  );
};
