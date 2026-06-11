"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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

export const projectSchema = z.object({
  name: z.string().min(2),
  client_id: z.string().min(1),
  description: z.string().optional(),
  status: z.enum([
    "prospect",
    "proposal_sent",
    "in_progress",
    "completed",
    "paused",
  ]),

  budget: z
    .preprocess(
      (v) => (v === "" || v == null ? undefined : Number(v)),
      z.number().optional()
    ),

  estimated_hours: z
    .preprocess(
      (v) => (v === "" || v == null ? undefined : Number(v)),
      z.number().optional()
    ),

  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Partial<ProjectFormValues>;

  clients: {
    id: string;
    name: string;
  }[];

  onSubmit: (
    values: ProjectFormValues
  ) => Promise<void>;

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
  submitLabel = "Save Project",
}: ProjectFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: {
      name: initialData?.name ?? "",
      client_id: initialData?.client_id ?? "",
      description: initialData?.description ?? "",
      status: initialData?.status ?? "prospect",
      budget: initialData?.budget,
      estimated_hours: initialData?.estimated_hours,
      start_date: initialData?.start_date ?? "",
      end_date: initialData?.end_date ?? "",
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 py-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">
          Project Name
        </Label>

        <Input
          id="name"
          placeholder="Website Redesign"
          {...form.register("name")}
        />

        {form.formState.errors.name && (
          <p className="text-xs text-destructive">
            {
              form.formState.errors.name
                .message
            }
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_id">
            Client
          </Label>

          <Controller
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>

                <SelectContent>
                  {clients.map(
                    (client) => (
                      <SelectItem
                        key={client.id}
                        value={client.id}
                      >
                        {client.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />

          {form.formState.errors
            .client_id && (
              <p className="text-xs text-destructive">
                {
                  form.formState.errors
                    .client_id.message
                }
              </p>
            )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">
            Status
          </Label>

          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="prospect">
                    Prospect
                  </SelectItem>

                  <SelectItem value="proposal_sent">
                    Proposal Sent
                  </SelectItem>

                  <SelectItem value="in_progress">
                    In Progress
                  </SelectItem>

                  <SelectItem value="completed">
                    Completed
                  </SelectItem>

                  <SelectItem value="paused">
                    Paused
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          placeholder="Brief overview of the project..."
          className="min-h-[100px]"
          {...form.register(
            "description"
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget">
            Budget
          </Label>

          <Input
            id="budget"
            type="number"
            step="0.01"
            placeholder="5000"
            {...form.register("budget")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimated_hours">
            Estimated Hours
          </Label>

          <Input
            id="estimated_hours"
            type="number"
            placeholder="120"
            {...form.register(
              "estimated_hours"
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">
            Start Date
          </Label>

          <Input
            id="start_date"
            type="date"
            {...form.register(
              "start_date"
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">
            End Date
          </Label>

          <Input
            id="end_date"
            type="date"
            {...form.register(
              "end_date"
            )}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}

          {submitLabel}
        </Button>
      </div>
    </form>
  );
}