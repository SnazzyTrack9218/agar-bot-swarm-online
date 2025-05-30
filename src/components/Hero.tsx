
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-bounce"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
            <Bot className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Agar.io
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {" "}Bot Swarm
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Deploy up to 30 intelligent bots that automatically farm mass, evade threats, 
          and dominate Agar.io matches with advanced AI navigation and anti-detection systems.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
            Launch Bots Now
          </Button>
          <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg">
            Watch Demo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-purple-400 mb-2">1-30</div>
            <div className="text-white font-semibold">Simultaneous Bots</div>
            <div className="text-gray-300 text-sm mt-2">Scale your dominance</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
            <div className="text-white font-semibold">Uptime Guaranteed</div>
            <div className="text-gray-300 text-sm mt-2">Always online</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-green-400 mb-2">0</div>
            <div className="text-white font-semibold">Setup Required</div>
            <div className="text-gray-300 text-sm mt-2">One-click launch</div>
          </div>
        </div>
      </div>
    </section>
  );
};
