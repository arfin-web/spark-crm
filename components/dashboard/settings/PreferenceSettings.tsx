"use client";

import { Bell, Sparkles, Monitor, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PreferenceSettings() {
  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-sm font-bold flex items-center gap-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                Email Notifications
              </Label>
              <p className="text-[10px] text-muted-foreground">Receive weekly reports and daily summaries.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-sm font-bold flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                Mobile Push
              </Label>
              <p className="text-[10px] text-muted-foreground">Get instant alerts for new client messages.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Model Preference
          </CardTitle>
          <CardDescription>
            Select the default AI engine for proposal generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Default Model</Label>
            <Select defaultValue="gpt-4">
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4 Turbo (Balanced)</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus (Creative)</SelectItem>
                <SelectItem value="gemini-pro">Gemini 1.5 Pro (Analytical)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground italic">
              * AI generation consumes credits based on model complexity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
