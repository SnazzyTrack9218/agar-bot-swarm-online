
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Square, StopCircle, Loader2 } from "lucide-react";

interface BotControlsProps {
  selectedBotCount: number;
  onBotCountChange: (count: number) => void;
  onStartBots: () => void;
  onStopBots: () => void;
  onStopAllBots: () => void;
  isStarting: boolean;
  hasActiveBots: boolean;
}

export const BotControls = ({
  selectedBotCount,
  onBotCountChange,
  onStartBots,
  onStopBots,
  onStopAllBots,
  isStarting,
  hasActiveBots
}: BotControlsProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6">Bot Controls</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of Bots (1-30)
          </label>
          <Input
            type="number"
            min="1"
            max="30"
            value={selectedBotCount}
            onChange={(e) => onBotCountChange(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
            className="bg-white/10 border-purple-400/30 text-white placeholder-gray-400"
            disabled={hasActiveBots}
          />
        </div>

        <div className="space-y-2">
          <Button
            onClick={onStartBots}
            disabled={isStarting || hasActiveBots}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
          >
            {isStarting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Starting Bots...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Launch {selectedBotCount} Bots
              </>
            )}
          </Button>

          <Button
            onClick={onStopBots}
            disabled={!hasActiveBots}
            variant="outline"
            className="w-full border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/10"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop Bots
          </Button>

          <Button
            onClick={onStopAllBots}
            disabled={!hasActiveBots}
            variant="outline"
            className="w-full border-red-400/50 text-red-300 hover:bg-red-400/10"
          >
            <StopCircle className="w-4 h-4 mr-2" />
            Emergency Stop All
          </Button>
        </div>
      </div>
    </div>
  );
};
