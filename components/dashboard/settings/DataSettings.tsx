"use client";

import * as React from "react";
import Papa from "papaparse";
import { Database, Download, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteAccount } from "@/lib/actions/settings";

export function DataSettings() {
  const [isExporting, setIsExporting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleExport = () => {
    setIsExporting(true);

    // Mock data for export
    const data = [
      { type: "Client", name: "Alex Rivera", email: "alex@vortex.com", status: "Active" },
      { type: "Client", name: "Sarah Chen", email: "sarah@lumina.io", status: "Active" },
      { type: "Project", name: "Q2 Marketing Strategy", client: "Vortex Tech", budget: 15000 },
      { type: "Proposal", title: "Growth Proposal", client: "Vortex Tech", status: "Accepted" },
    ];

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `spark_crm_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsExporting(false), 500);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      // In real app, redirect to logout
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export your agency data or permanently close your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/20 rounded-2xl border border-border/50">
            <div className="space-y-1">
              <h4 className="text-sm font-bold">Export All Records</h4>
              <p className="text-xs text-muted-foreground italic">Download a complete CSV of your clients, projects, and activities.</p>
            </div>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              variant="outline"
              className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 h-11"
            >
              {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              Export as CSV
            </Button>
          </div>

          <div className="pt-6 border-t border-border space-y-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <h4 className="text-sm font-bold">Danger Zone</h4>
            </div>

            <Dialog>
              <DialogTrigger className="flex justify-center items-center w-full md:w-auto text-destructive rounded-xl px-8 h-11 shadow-lg shadow-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-destructive flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription className="pt-2">
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers after a 7-day grace period.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl">Cancel</Button>
                  <Button
                    variant="destructive"
                    className="flex-1 rounded-xl"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirm Deletion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
