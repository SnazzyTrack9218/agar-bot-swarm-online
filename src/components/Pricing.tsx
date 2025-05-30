
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

export const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for testing the waters",
      features: [
        "Up to 3 simultaneous bots",
        "Basic AI navigation",
        "1 hour sessions",
        "Community support"
      ],
      buttonText: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For serious Agar.io domination",
      features: [
        "Up to 15 simultaneous bots",
        "Advanced AI with evasion",
        "Unlimited sessions",
        "Anti-detection system",
        "Real-time analytics",
        "Priority support"
      ],
      buttonText: "Go Pro",
      popular: true
    },
    {
      name: "Elite",
      price: "$49",
      period: "/month",
      description: "Maximum power and control",
      features: [
        "Up to 30 simultaneous bots",
        "Military-grade AI",
        "Custom bot strategies",
        "Advanced anti-detection",
        "Detailed analytics",
        "24/7 dedicated support",
        "Proxy integration",
        "API access"
      ],
      buttonText: "Go Elite",
      popular: false
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Power Level
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan to match your Agar.io domination strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular 
                  ? 'border-purple-400/50 ring-2 ring-purple-400/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-xl ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-white/10'}`}>
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                } text-white`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
