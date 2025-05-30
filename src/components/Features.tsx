
import { Bot, Shield, Zap, BarChart3, Lock, Play } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "1-30 Bots Control",
    description: "Spawn multiple bots to farm, distract, or dominate matches with intelligent coordination and team strategies.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Smart AI Navigation",
    description: "Automatically collect pellets, dodge viruses, and avoid large threats with advanced pathfinding algorithms.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Anti-Detection System",
    description: "Obfuscates bot patterns to reduce bans or kicks with human-like behavior simulation.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Play,
    title: "Easy Deployment",
    description: "One-click launch from browser or through a lightweight client with instant bot activation.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: BarChart3,
    title: "Real-Time Stats",
    description: "Monitor mass gained, bot survival time, and performance metrics with live dashboard updates.",
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: Lock,
    title: "Secure and Private",
    description: "No login needed; encrypted traffic; run from your own IP or proxies for maximum privacy.",
    color: "from-teal-500 to-green-500"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to dominate Agar.io with intelligent automation and advanced bot management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
