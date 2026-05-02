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
import { createClient } from "@/lib/actions/clients";
import { ClientForm, ClientFormValues } from "./ClientForm";

export function AddClientDialog() {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  async function onSubmit(values: ClientFormValues) {
    setIsPending(true);
    try {
      const tagsArray = values.tags ? values.tags.split(",").map(t => t.trim()) : [];
      await createClient({
        ...values,
        tags: tagsArray,
        health_score: 75,
        created_at: new Date().toISOString(),
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
        <Plus className="h-4 w-4" />
        <span>Add Client</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary font-semibold">Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
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
