"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { ProjectForm, ProjectFormValues } from "@/components/dashboard/projects/ProjectForm";
import { createProject } from "@/lib/actions/projects";

interface ProjectFormContainerProps {
  clients: { id: string; name: string }[];
  defaultClientId?: string;
}

export function ProjectFormContainer({ clients, defaultClientId }: ProjectFormContainerProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  const onSubmit = async (values: ProjectFormValues) => {
    setIsPending(true);
    try {
      const result = await createProject(values);
      if (result.success) {
        router.push("/dashboard/projects");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ProjectForm
      clients={clients}
      initialData={{ client_id: defaultClientId }}
      onSubmit={onSubmit}
      onCancel={() => router.back()}
      isPending={isPending}
      submitLabel="Create Project"
    />
  );
}
