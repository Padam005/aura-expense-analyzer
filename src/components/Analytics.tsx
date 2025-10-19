import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#f97316'];

export const Analytics = () => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: expenses } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id);

      if (expenses) {
        // Category breakdown
        const categoryTotals: { [key: string]: number } = {};
        expenses.forEach(exp => {
          categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + Number(exp.amount);
        });

        const catData = Object.entries(categoryTotals).map(([name, value]) => ({
          name,
          value: Number(value.toFixed(2))
        }));
        setCategoryData(catData);

        // Monthly breakdown (last 6 months)
        const monthlyTotals: { [key: string]: number } = {};
        expenses.forEach(exp => {
          const month = exp.month_year || exp.date.substring(0, 7);
          monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(exp.amount);
        });

        const monthData = Object.entries(monthlyTotals)
          .sort(([a], [b]) => a.localeCompare(b))
          .slice(-6)
          .map(([month, amount]) => ({
            month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            amount: Number(amount.toFixed(2))
          }));
        setMonthlyData(monthData);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Card><CardContent className="py-12 text-center">Loading analytics...</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((cat, idx) => (
                    <div key={cat.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        />
                        <span>{cat.name}</span>
                      </div>
                      <span className="font-bold">${cat.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No data available yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="amount" fill="#8b5cf6" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No data available yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categoryData.length > 0 && (
              <>
                <div className="p-4 bg-purple-500/10 rounded-lg">
                  <p className="font-medium">Top Spending Category</p>
                  <p className="text-2xl font-bold mt-1">
                    {categoryData[0]?.name} - ${categoryData[0]?.value.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg">
                  <p className="font-medium">Total Categories</p>
                  <p className="text-2xl font-bold mt-1">{categoryData.length}</p>
                </div>
                {monthlyData.length >= 2 && (
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <p className="font-medium">Month-over-Month Change</p>
                    <p className="text-2xl font-bold mt-1">
                      {((monthlyData[monthlyData.length - 1].amount - monthlyData[monthlyData.length - 2].amount) / monthlyData[monthlyData.length - 2].amount * 100).toFixed(1)}%
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
