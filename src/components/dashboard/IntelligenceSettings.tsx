
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";

interface IntelligenceSettingsProps {
  intelligence: string;
  onIntelligenceChange: (intelligence: string) => void;
}

export const IntelligenceSettings = ({ intelligence, onIntelligenceChange }: IntelligenceSettingsProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-bold text-white">Bot Intelligence</h3>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="intelligence" className="text-gray-300">
          Strategy Mode
        </Label>
        <Select value={intelligence} onValueChange={onIntelligenceChange}>
          <SelectTrigger className="bg-white/10 border-purple-400/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="aggressive" className="text-white hover:bg-gray-700">
              🔥 Aggressive - High risk, high reward
            </SelectItem>
            <SelectItem value="balanced" className="text-white hover:bg-gray-700">
              ⚖️ Balanced - Smart farming with caution
            </SelectItem>
            <SelectItem value="passive" className="text-white hover:bg-gray-700">
              🛡️ Passive - Maximum survival focus
            </SelectItem>
            <SelectItem value="stealth" className="text-white hover:bg-gray-700">
              👻 Stealth - Avoid all players
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-400">
          Determines how bots behave around other players and threats
        </p>
      </div>
    </div>
  );
};
