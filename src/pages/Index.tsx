import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            KARCHA Gino
          </h1>
          <p className="text-xl text-muted-foreground">
            Your AI-Powered ML Expense Analyzer
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Welcome to Your Dashboard</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Project successfully restored! Ready to build amazing ML-powered features.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Get Started
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;
