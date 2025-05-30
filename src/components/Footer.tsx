
import { Bot } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Agar.io Bot Swarm</span>
          </div>
          
          <div className="text-gray-400 text-sm text-center md:text-right">
            <p className="mb-2">© 2024 Agar.io Bot Swarm. All rights reserved.</p>
            <p className="text-xs">For educational and entertainment purposes only. Use responsibly.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
