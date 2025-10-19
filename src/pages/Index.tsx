import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Brain, PieChart, Upload, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "ML-Powered Predictions",
      description: "Advanced machine learning algorithms predict your future expenses"
    },
    {
      icon: PieChart,
      title: "Smart Analytics",
      description: "Deep insights into your spending patterns and habits"
    },
    {
      icon: Upload,
      title: "Receipt OCR",
      description: "Scan receipts to automatically extract expense data"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level security with end-to-end encryption"
    },
    {
      icon: Zap,
      title: "Real-time Insights",
      description: "Get instant feedback on your financial health"
    },
    {
      icon: TrendingUp,
      title: "Budget Optimization",
      description: "AI-powered recommendations to optimize your budget"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 mb-6">
            <TrendingUp className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            KARCHA Gino
          </h1>
          <p className="text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Your AI-Powered ML Expense Analyzer
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Harness the power of machine learning to analyze, predict, and optimize your expenses. 
            Built for hackathon winners who demand the best.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 h-auto"
            onClick={() => navigate("/auth")}
          >
            Get Started Free
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all">
              <feature.icon className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur border-white/20">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to transform your finances?</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of users who trust KARCHA Gino for intelligent expense management
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900"
              onClick={() => navigate("/auth")}
            >
              Start Your Journey
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
