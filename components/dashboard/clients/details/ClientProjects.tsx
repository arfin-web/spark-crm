"use client";

import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddProjectDialog } from "../../projects/AddProjectDialog";
import { Client } from "@/app/actions/clients";

interface ClientProjectsProps {
  client: Client;
}

export function ClientProjects({ client }: ClientProjectsProps) {
  return (
    <Card className="border-border shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">Active Projects</CardTitle>
          </div>
          <AddProjectDialog 
            clients={[{ id: client.id, name: client.name }]} 
            defaultClientId={client.id}
            trigger={
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                <Plus className="h-4 w-4 mr-1" />
                Add Project
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-8 text-center text-muted-foreground italic">
          No active projects found for this client.
          <AddProjectDialog 
            clients={[{ id: client.id, name: client.name }]} 
            defaultClientId={client.id}
            trigger={
              <Button variant="link" className="text-primary p-0 h-auto ml-1 font-bold">Create project</Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
