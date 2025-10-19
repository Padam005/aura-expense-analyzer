import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Upload, Camera, Loader2, CheckCircle } from "lucide-react";

export const ReceiptOCR = () => {
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [preview, setPreview] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setPreview(base64);

        const { data, error } = await supabase.functions.invoke('ocr-receipt', {
          body: { image: base64 }
        });

        if (error) throw error;
        setReceiptData(data);
        toast({ title: "Receipt Scanned!", description: "Expense data extracted successfully" });
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const saveExpense = async () => {
    if (!receiptData) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from('expenses').insert({
        user_id: user.id,
        description: `Receipt from ${receiptData.merchant}`,
        amount: receiptData.total,
        category: "Other",
        date: receiptData.date || new Date().toISOString().split('T')[0],
        month_year: (receiptData.date || new Date().toISOString()).substring(0, 7)
      });

      if (error) throw error;
      toast({ title: "Saved!", description: "Expense added from receipt" });
      setReceiptData(null);
      setPreview("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Receipt OCR Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
              {preview ? (
                <img src={preview} alt="Receipt preview" className="max-h-64 mx-auto rounded" />
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Upload a receipt image to automatically extract expense data
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="receipt-upload"
                disabled={loading}
              />
              <label htmlFor="receipt-upload">
                <Button asChild disabled={loading}>
                  <span>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </>
                    )}
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {receiptData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Extracted Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="font-medium">Merchant:</span>
                <span>{receiptData.merchant}</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${receiptData.total?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="font-medium">Date:</span>
                <span>{receiptData.date}</span>
              </div>
              {receiptData.items && receiptData.items.length > 0 && (
                <div className="p-3 bg-muted rounded">
                  <p className="font-medium mb-2">Items:</p>
                  <ul className="space-y-1 text-sm">
                    {receiptData.items.map((item: any, idx: number) => (
                      <li key={idx} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>${item.price?.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Button onClick={saveExpense} className="w-full">
                Save as Expense
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
