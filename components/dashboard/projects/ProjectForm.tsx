"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ProjectStatus = "prospect" | "proposal_sent" | "in_progress" | "completed" | "paused";

export interface ProjectFormValues {
  name: string;
  client_id: string;
  description?: string;
  status: ProjectStatus;
  budget?: number;
  start_date?: string;
  end_date?: string;
}

export const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  client_id: z.string().min(1, "Please select a client"),
  description: z.string().optional(),
  status: z.enum(["prospect", "proposal_sent", "in_progress", "completed", "paused"]),
  budget: z.coerce.number().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

interface ProjectFormProps {
  initialData?: Partial<ProjectFormValues>;
  clients: { id: string; name: string }[];
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
  submitLabel?: string;
}

export function ProjectForm({
  initialData,
  clients,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = "Save Project"
}: ProjectFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      client_id: initialData?.client_id || "",
      description: initialData?.description || "",
      status: initialData?.status || "prospect",
      budget: initialData?.budget ?? 0,
      start_date: initialData?.start_date || "",
      end_date: initialData?.end_date || "",
    },
  });

  const handleFormSubmit = form.handleSubmit(async (data: ProjectFormValues) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          placeholder="Website Redesign"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_id">Client</Label>
          <Select
            onValueChange={(value) => form.setValue("client_id", value || "", { shouldValidate: true })}
            defaultValue={form.getValues("client_id")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.client_id && (
            <p className="text-xs text-destructive">{form.formState.errors.client_id.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) => form.setValue("status", (value || "prospect") as any, { shouldValidate: true })}
            defaultValue={form.getValues("status")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief overview of the project..."
          className="min-h-[100px]"
          {...form.register("description")}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget ($)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="5000"
            {...form.register("budget")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            {...form.register("start_date")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            type="date"
            {...form.register("end_date")}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
