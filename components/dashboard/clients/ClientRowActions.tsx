"use client";

import Link from "next/link";
import { MoreHorizontal, ExternalLink, Trash2, CirclePlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Client } from "@/lib/actions/clients";

interface ClientRowActionsProps {
  client: Client;
}

export function ClientRowActions({ client }: ClientRowActionsProps) {
  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-transparent border-none h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-border">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" render={<Link href={`/dashboard/clients/${client.id}`} className="flex items-center" />}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" render={<Link href={`/dashboard/projects/new?client=${client.id}`} className="flex items-center" />}>
              <CirclePlus className="mr-2 h-4 w-4" />
              Assign Project
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              Soft Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
