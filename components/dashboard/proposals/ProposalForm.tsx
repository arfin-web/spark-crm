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

// Schema configured to ensure seamless validation against Pydantic models
export const proposalSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  client_id: z.string().min(1, "Please select a client"),
  // Transforms empty selection strings into clean null configurations for FastAPI UUID verification
  project_id: z.string().nullable().or(z.literal("")).transform(val => val === "" ? null : val),
  brief_description: z.string().min(1, "Brief description is required"),
  scope: z.string().min(1, "Scope of work is required"),
  deliverables: z.string().min(1, "Deliverables are required"),
  timeline: z.string().min(1, "Timeline is required"),
  // Preprocesses empty strings to null instead of letting them fall back to 0 or breaking on NaN
  cost: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? null : Number(val)),
    z.number().nullable()
  ),
  status: z.enum(["draft", "sent", "accepted", "rejected"]),
});

export type ProposalFormValues = z.output<typeof proposalSchema>;

interface ProposalFormProps {
  initialData?: Partial<any>;
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

  const form = useForm<z.input<typeof proposalSchema>, any, z.output<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: initialData?.title || "",
      client_id: initialData?.client_id || "",
      project_id: initialData?.project_id || "",
      brief_description: initialData?.brief_description || "",
      scope: initialData?.scope || "",
      deliverables: initialData?.deliverables || "",
      timeline: initialData?.timeline || "",
      cost: initialData?.cost !== null && initialData?.cost !== undefined ? String(initialData?.cost) : "",
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
          <Label>Status</Label>
          <Select
            value={form.watch("status")}
            onValueChange={(value) => form.setValue("status", value as any, { shouldValidate: true })}
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
          {form.formState.errors.status && (
            <p className="text-xs text-destructive">{form.formState.errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Client</Label>
          <Select
            value={form.watch("client_id")}
            onValueChange={(value) => {
              form.setValue("client_id", value || "", { shouldValidate: true });
              form.setValue("project_id", ""); // Resets project option when parent client options change
            }}
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
          <Label>Project (Optional)</Label>
          <Select
            value={form.watch("project_id") || ""}
            disabled={!selectedClientId}
            onValueChange={(value) => form.setValue("project_id", value, { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder={selectedClientId ? "Select project" : "Select a client first"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None / No Project</SelectItem>
              {filteredProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.project_id && (
            <p className="text-xs text-destructive">{form.formState.errors.project_id.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="brief_description">Brief Description</Label>
        <Textarea
          id="brief_description"
          placeholder="One-sentence overview of the proposal..."
          {...form.register("brief_description")}
        />
        {form.formState.errors.brief_description && (
          <p className="text-xs text-destructive">{form.formState.errors.brief_description.message}</p>
        )}
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
          {form.formState.errors.scope && (
            <p className="text-xs text-destructive">{form.formState.errors.scope.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliverables">Deliverables</Label>
          <Textarea
            id="deliverables"
            placeholder="What the client will receive..."
            className="min-h-[100px]"
            {...form.register("deliverables")}
          />
          {form.formState.errors.deliverables && (
            <p className="text-xs text-destructive">{form.formState.errors.deliverables.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Input id="timeline" placeholder="e.g. 3 months, 6 weeks" {...form.register("timeline")} />
          {form.formState.errors.timeline && (
            <p className="text-xs text-destructive">{form.formState.errors.timeline.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Total Cost ($)</Label>
          <Input
            id="cost"
            type="number"
            placeholder="0"
            {...form.register("cost")}
          />
          {form.formState.errors.cost && (
            <p className="text-xs text-destructive">{form.formState.errors.cost.message}</p>
          )}
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