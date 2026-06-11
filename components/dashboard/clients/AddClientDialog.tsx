"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { createClient } from "@/app/actions/clients";
import { ClientForm, ClientFormValues } from "./ClientForm";

export function AddClientDialog() {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState("");

  async function onSubmit(values: ClientFormValues) {
    setIsPending(true);
    setError("");

    try {
      await createClient({
        ...values,

        phone: values.phone || undefined,
        industry: values.industry || undefined,

        source: values.source || "other",

        tags: values.tags
          ? values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
          : [],
      });

      setOpen(false);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to create client");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setError("");
      }}
    >
      <DialogTrigger className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
        <Plus className="mr-2 h-4 w-4" />
        Add Client
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <ClientForm
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending}
          submitLabel="Create Client"
        />
      </DialogContent>
    </Dialog>
  );
}