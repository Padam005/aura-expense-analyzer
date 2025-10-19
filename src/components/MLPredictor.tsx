import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Loader2 } from "lucide-react";

export const MLPredictor = () => {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<any>(null);

  const generatePredictions = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: expenses, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (expensesError) throw expensesError;

      if (!expenses || expenses.length === 0) {
        toast({
          title: "No Data",
          description: "Add some expenses first to generate predictions",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('ml-predict-expenses', {
        body: { expenses }
      });

      if (error) throw error;
      setPredictions(data);
      toast({ title: "Predictions Generated!", description: "AI analysis complete" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            ML-Powered Expense Predictor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Our advanced machine learning algorithms analyze your spending patterns to provide
              intelligent predictions and recommendations.
            </p>
            <Button onClick={generatePredictions} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate Predictions
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {predictions && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Predicted Expenses (Next Month)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {predictions.predictions?.map((pred: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">{pred.category}</span>
                    <div className="text-right">
                      <div className="font-bold">${pred.predicted_amount.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">
                        {(pred.confidence * 100).toFixed(0)}% confidence
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Spending Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Trend:</span> {predictions.trends?.overall}
                </p>
                <p>
                  <span className="font-semibold">Change:</span> {predictions.trends?.percentage}%
                </p>
              </div>
            </CardContent>
          </Card>

          {predictions.anomalies && predictions.anomalies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Anomaly Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predictions.anomalies.map((anomaly: any, idx: number) => (
                    <div key={idx} className="p-3 border-l-4 border-orange-500 bg-orange-500/10">
                      <p className="font-medium">{anomaly.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Severity: {anomaly.severity}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {predictions.recommendations?.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
