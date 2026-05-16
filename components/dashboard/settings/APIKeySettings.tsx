"use client";

import { Key, Copy, RefreshCw, Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function APIKeySettings() {
  const [showKey, setShowKey] = React.useState(false);
  const dummyKey = "pk_test_51MzS2ZKV6X3mU5b7lR8q9w2e1r4t6y8u";

  return (
    <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="bg-muted/30 border-b border-border pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          API Access
        </CardTitle>
        <CardDescription>
          Use these keys to integrate Spark CRM with your custom tools.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold">Public API Key</label>
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <Input 
                type={showKey ? "text" : "password"} 
                value={dummyKey} 
                readOnly 
                className="pr-20 h-12 rounded-xl font-mono text-xs bg-muted/20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 hover:bg-muted"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 hover:bg-muted"
                  onClick={() => navigator.clipboard.writeText(dummyKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-border">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground italic">
            Keep your API keys secret. Do not share them in public repositories.
          </p>
        </div>

        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <h4 className="text-sm font-bold text-primary mb-1 italic underline underline-offset-4">Developer Docs</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            API access is currently in <strong>private beta</strong>. You can use these keys for the upcoming Webhooks and Zapier integration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
