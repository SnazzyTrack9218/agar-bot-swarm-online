
export const Stats = () => {
  const stats = [
    { number: "10M+", label: "Mass Collected", subtitle: "Total pellets gathered" },
    { number: "500K+", label: "Successful Matches", subtitle: "Games dominated" },
    { number: "99.2%", label: "Survival Rate", subtitle: "Bot efficiency" },
    { number: "24/7", label: "Active Monitoring", subtitle: "Continuous operation" }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proven Performance
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our bots have consistently delivered exceptional results across thousands of matches.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
