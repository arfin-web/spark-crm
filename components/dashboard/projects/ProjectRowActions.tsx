"use client";

import Link from "next/link";
import { MoreHorizontal, ExternalLink, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Project } from "@/app/actions/projects";

interface ProjectRowActionsProps {
  project: Project;
  clients: { id: string; name: string }[];
}

export function ProjectRowActions({
  project,
}: ProjectRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* Wrapped in DropdownMenuGroup to satisfy Base UI's context requirement */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/dashboard/projects/${project.id}`} className="flex justify-start items-center gap-2">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}