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
import { updateProject, Project } from "@/lib/actions/projects";
import { ProjectForm, ProjectFormValues } from "./ProjectForm";

interface EditProjectDialogProps {
  project: Project;
  clients: { id: string; name: string }[];
  trigger?: React.ReactNode;
}

export function EditProjectDialog({ project, clients, trigger }: EditProjectDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  async function onSubmit(values: ProjectFormValues) {
    setIsPending(true);
    try {
      await updateProject(project.id, values);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  const initialData = {
    ...project,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger || (
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer">
            <Edit className="h-4 w-4" />
            <span>Edit Project</span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary font-semibold">Edit Project</DialogTitle>
          <DialogDescription>
            Update project details, budget, or status.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          clients={clients}
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
