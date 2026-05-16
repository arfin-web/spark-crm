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
import { ProposalStatus } from "@/lib/actions/proposals";

export const proposalSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  client_id: z.string().min(1, "Please select a client"),
  project_id: z.string().optional(),
  brief_description: z.string().optional(),
  scope: z.string().optional(),
  deliverables: z.string().optional(),
  timeline: z.string().optional(),
  cost: z.coerce.number().optional(),
  status: z.enum(["draft", "sent", "accepted", "rejected"]),
});

export type ProposalFormValues = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  initialData?: Partial<ProposalFormValues>;
  clients: { id: string; name: string }[];
  projects: { id: string; name: string; client_id: string }[];
  onSubmit: (values: ProposalFormValues) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
  submitLabel?: string;
}

export function ProposalForm({
  initialData,
  clients,
  projects,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = "Save Proposal"
}: ProposalFormProps) {
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      client_id: initialData?.client_id || "",
      project_id: initialData?.project_id || "",
      brief_description: initialData?.brief_description || "",
      scope: initialData?.scope || "",
      deliverables: initialData?.deliverables || "",
      timeline: initialData?.timeline || "",
      cost: initialData?.cost ?? 0,
      status: initialData?.status || "draft",
    },
  });

  const selectedClientId = form.watch("client_id");
  const filteredProjects = projects.filter(p => p.client_id === selectedClientId);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Proposal Title</Label>
          <Input id="title" placeholder="Project Name - Strategy Proposal" {...form.register("title")} />
          {form.formState.errors.title && (
            <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) => form.setValue("status", value as any, { shouldValidate: true })}
            defaultValue={form.getValues("status")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="client_id">Client</Label>
          <Select
            onValueChange={(value) => {
              form.setValue("client_id", value || "", { shouldValidate: true });
              form.setValue("project_id", ""); // Reset project when client changes
            }}
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
          <Label htmlFor="project_id">Project (Optional)</Label>
          <Select
            onValueChange={(value) => form.setValue("project_id", value || "", { shouldValidate: true })}
            defaultValue={form.getValues("project_id")}
            disabled={!selectedClientId}
          >
            <SelectTrigger>
              <SelectValue placeholder={selectedClientId ? "Select project" : "Select a client first"} />
            </SelectTrigger>
            <SelectContent>
              {filteredProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="brief_description">Brief Description</Label>
        <Textarea 
          id="brief_description" 
          placeholder="One-sentence overview of the proposal..." 
          {...form.register("brief_description")} 
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="scope">Scope of Work</Label>
          <Textarea 
            id="scope" 
            placeholder="Detailed scope..." 
            className="min-h-[120px]"
            {...form.register("scope")} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliverables">Deliverables</Label>
          <Textarea 
            id="deliverables" 
            placeholder="What the client will receive..." 
            className="min-h-[100px]"
            {...form.register("deliverables")} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Input id="timeline" placeholder="e.g. 3 months, 6 weeks" {...form.register("timeline")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Total Cost ($)</Label>
          <Input id="cost" type="number" placeholder="0" {...form.register("cost")} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-border">
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
