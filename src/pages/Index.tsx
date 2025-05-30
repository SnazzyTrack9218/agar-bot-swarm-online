
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { DashboardLink } from "@/components/DashboardLink";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Hero />
      <DashboardLink />
      <Features />
      <Stats />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
