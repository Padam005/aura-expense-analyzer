import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bell, Globe, Palette, Shield, Database, Mail, Smartphone, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: true,
    autoCategories: true,
    budgetAlerts: true,
    currency: "USD",
    language: "en",
    reportFrequency: "monthly",
    dataSync: true,
    biometric: false,
  });

  const handleSave = () => {
    toast({ title: "Settings saved!", description: "Your preferences have been updated" });
  };

  const settingsSections = [
    {
      id: "notifications",
      title: "Notifications & Alerts",
      icon: Bell,
      items: [
        { key: "notifications", label: "Push Notifications", description: "Receive push notifications for important updates" },
        { key: "emailAlerts", label: "Email Alerts", description: "Get email notifications for budget limits" },
        { key: "budgetAlerts", label: "Budget Warnings", description: "Alert when approaching budget limits" },
      ]
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: Palette,
      items: [
        { key: "darkMode", label: "Dark Mode", description: "Use dark theme across the application" },
      ]
    },
    {
      id: "regional",
      title: "Regional Settings",
      icon: Globe,
      items: []
    },
    {
      id: "ai",
      title: "AI & ML Features",
      icon: Database,
      items: [
        { key: "autoCategories", label: "Auto-Categorization", description: "Use AI to automatically categorize expenses" },
      ]
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Shield,
      items: [
        { key: "biometric", label: "Biometric Login", description: "Use fingerprint or face recognition" },
        { key: "dataSync", label: "Cloud Sync", description: "Sync data across devices" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your application preferences</p>
          </div>
        </div>

        {settingsSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={item.key}>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    id={item.key}
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, [item.key]: checked })
                    }
                  />
                </div>
              ))}

              {section.id === "regional" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => setSettings({ ...settings, currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="hi">हिन्दी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportFrequency">Report Frequency</Label>
                    <Select value={settings.reportFrequency} onValueChange={(value) => setSettings({ ...settings, reportFrequency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Export Data</Label>
                <p className="text-sm text-muted-foreground">Download all your data as CSV or JSON</p>
              </div>
              <Button variant="outline">Export</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Delete Account</Label>
                <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
