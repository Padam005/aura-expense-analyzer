import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  TrendingUp, 
  DollarSign,
  PieChart,
  Calendar,
  Brain,
  Upload,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out successfully" });
    navigate("/");
  };

  const stats = [
    { title: "Total Expenses", value: "$0", icon: DollarSign, color: "text-blue-500" },
    { title: "Monthly Budget", value: "$0", icon: TrendingUp, color: "text-green-500" },
    { title: "Categories", value: "0", icon: PieChart, color: "text-purple-500" },
    { title: "This Month", value: "$0", icon: Calendar, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r">
        <div className="flex h-16 items-center justify-center border-b px-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            KARCHA Gino
          </h1>
        </div>
        <nav className="space-y-2 p-4">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "expenses", label: "Expenses", icon: DollarSign },
            { id: "analytics", label: "Analytics", icon: PieChart },
            { id: "ml-predictor", label: "ML Predictor", icon: Brain },
            { id: "receipt-ocr", label: "Receipt OCR", icon: Upload },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-4 w-full px-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <h2 className="text-2xl font-semibold capitalize">{activeTab.replace("-", " ")}</h2>
        </header>

        <div className="p-6 space-y-6">
          {activeTab === "overview" && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button className="h-24 flex-col gap-2">
                    <Plus className="h-6 w-6" />
                    Add Expense
                  </Button>
                  <Button className="h-24 flex-col gap-2" variant="outline">
                    <Upload className="h-6 w-6" />
                    Upload Receipt
                  </Button>
                  <Button className="h-24 flex-col gap-2" variant="outline">
                    <Brain className="h-6 w-6" />
                    AI Prediction
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No expenses yet. Add your first expense to get started!</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "ml-predictor" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  ML-Powered Expense Predictor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-xl font-semibold mb-2">AI Predictions Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Add expenses to train the ML model for intelligent predictions
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "receipt-ocr" && (
            <Card>
              <CardHeader>
                <CardTitle>Receipt OCR Scanner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Upload receipt images to automatically extract expense data
                  </p>
                  <Button className="mt-4">Choose File</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
