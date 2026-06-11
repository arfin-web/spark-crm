"use client";

import * as React from "react";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateClient, Client } from "@/app/actions/clients";
import { ClientForm, ClientFormValues } from "./ClientForm";

interface EditClientDialogProps {
  client: Client;
  trigger?: React.ReactNode;
}

export function EditClientDialog({ client, trigger }: EditClientDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  async function onSubmit(values: ClientFormValues) {
    setIsPending(true);
    try {
      const tagsArray = typeof values.tags === 'string'
        ? values.tags.split(",").map(t => t.trim())
        : values.tags;

      await updateClient(client.id, {
        ...values,
        tags: tagsArray as string[],
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  const initialData = {
    ...client,
    tags: client.tags?.join(", ") || "",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger || (
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer">
            <Edit className="h-4 w-4" />
            <span>Edit Client</span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary font-semibold">Edit Client</DialogTitle>
          <DialogDescription>
            Update client information. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          initialData={initialData as any}
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
