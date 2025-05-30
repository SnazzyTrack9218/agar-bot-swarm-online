
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardLink = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
              <Monitor className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Deploy Your Bot Army?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Access the full control dashboard to deploy, monitor, and manage your Agar.io bots with real-time analytics and advanced controls.
          </p>
          
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg rounded-xl">
              Launch Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
