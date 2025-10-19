import { useState, useEffect } from "react";
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
  Upload
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { MLPredictor } from "@/components/MLPredictor";
import { ReceiptOCR } from "@/components/ReceiptOCR";
import { Analytics } from "@/components/Analytics";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    monthlyTotal: 0,
    categoriesCount: 0,
  });

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: expenses } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id);

      if (expenses) {
        const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        const currentMonth = new Date().toISOString().substring(0, 7);
        const monthlyTotal = expenses
          .filter(exp => exp.month_year === currentMonth)
          .reduce((sum, exp) => sum + Number(exp.amount), 0);
        const uniqueCategories = new Set(expenses.map(exp => exp.category));

        setStats({
          totalExpenses: total,
          monthlyTotal,
          categoriesCount: uniqueCategories.size,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out successfully" });
    navigate("/");
  };

  const statsCards = [
    { title: "Total Expenses", value: `$${stats.totalExpenses.toFixed(2)}`, icon: DollarSign, color: "text-blue-500" },
    { title: "This Month", value: `$${stats.monthlyTotal.toFixed(2)}`, icon: Calendar, color: "text-orange-500" },
    { title: "Categories", value: stats.categoriesCount.toString(), icon: PieChart, color: "text-purple-500" },
    { title: "Avg/Day", value: `$${(stats.monthlyTotal / new Date().getDate()).toFixed(2)}`, icon: TrendingUp, color: "text-green-500" },
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
                {statsCards.map((stat) => (
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

              <div className="grid gap-6 md:grid-cols-2">
                <ExpenseForm onSuccess={() => setRefreshTrigger(prev => prev + 1)} />
                <ExpenseList refreshTrigger={refreshTrigger} />
              </div>
            </>
          )}

          {activeTab === "expenses" && (
            <div className="grid gap-6 md:grid-cols-2">
              <ExpenseForm onSuccess={() => setRefreshTrigger(prev => prev + 1)} />
              <ExpenseList refreshTrigger={refreshTrigger} />
            </div>
          )}

          {activeTab === "ml-predictor" && (
            <MLPredictor />
          )}

          {activeTab === "receipt-ocr" && (
            <ReceiptOCR />
          )}

          {activeTab === "analytics" && (
            <Analytics />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
