import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { expenses } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    const prompt = `You are a financial ML prediction engine. Analyze these expenses and predict future spending:

${JSON.stringify(expenses, null, 2)}

Provide:
1. Next month predicted expenses by category
2. Spending trend analysis
3. Anomaly detection
4. Budget recommendations

Return JSON format:
{
  "predictions": [{"category": "Food", "predicted_amount": 500, "confidence": 0.85}],
  "trends": {"overall": "increasing", "percentage": 15},
  "anomalies": [{"description": "Unusual spike in entertainment", "severity": "medium"}],
  "recommendations": ["Reduce dining out by 20%", "Set up auto-savings"]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert financial ML analyst. Always respond with valid JSON." },
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const predictions = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    return new Response(JSON.stringify(predictions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
