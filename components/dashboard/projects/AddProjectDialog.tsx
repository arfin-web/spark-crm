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
import { createProject } from "@/app/actions/projects";
import { ProjectForm, ProjectFormValues } from "./ProjectForm";

interface AddProjectDialogProps {
  clients: { id: string; name: string }[];
  defaultClientId?: string;
  trigger?: React.ReactNode;
}

export function AddProjectDialog({ clients, defaultClientId, trigger }: AddProjectDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  async function onSubmit(values: ProjectFormValues) {
    setIsPending(true);
    try {
      await createProject(values);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger || (
          <div className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Project</span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary font-semibold">Start New Project</DialogTitle>
          <DialogDescription>
            Define the project scope, budget, and timeline.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          clients={clients}
          initialData={{ client_id: defaultClientId }}
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending}
          submitLabel="Create Project"
        />
      </DialogContent>
    </Dialog>
  );
}
