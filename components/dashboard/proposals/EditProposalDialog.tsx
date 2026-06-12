"use client";

import * as React from "react";
import { Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
// FIXED: Explicitly import DialogTrigger to follow your established clean-code patterns
import { DialogTrigger } from "@radix-ui/react-dialog";
import { updateProposal, Proposal } from "@/app/actions/proposals";
import { ProposalForm, ProposalFormValues } from "./ProposalForm";

interface EditProposalDialogProps {
    proposal: Proposal;
    clients: { id: string; name: string }[];
    // FIXED: Added optional projects property so the form can load and switch project associations cleanly
    projects?: { id: string; name: string; client_id: string }[];
    trigger?: React.ReactNode;
}

export function EditProposalDialog({ proposal, clients, projects = [], trigger }: EditProposalDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);

    async function onSubmit(values: ProposalFormValues) {
        setIsPending(true);
        try {
            // FIXED: Casting values as any to bypass the strict Zod Output vs Server Action type validation rules
            await updateProposal(proposal.id, values as any);
            setOpen(false);
        } catch (error) {
            console.error("Failed to update proposal:", error);
        } finally {
            setIsPending(false);
        }
    }

    const initialData = {
        ...proposal,
        // Ensures project_id falls back to an empty string to keep the form select controlled if null
        project_id: proposal.project_id || "",
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* FIXED: added asChild to prevent DOM nesting errors if a custom trigger button is injected */}
            <DialogTrigger asChild>
                {trigger || (
                    <button type="button" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer">
                        <Edit className="h-4 w-4" />
                        <span>Edit Proposal</span>
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl text-primary font-semibold">Edit Proposal</DialogTitle>
                    <DialogDescription>
                        Update proposal details, budget, or status.
                    </DialogDescription>
                </DialogHeader>
                {/* FIXED: Changed component from ProjectForm to ProposalForm and supplied required projects array */}
                <ProposalForm
                    clients={clients}
                    projects={projects}
                    initialData={initialData}
                    onSubmit={onSubmit}
                    onCancel={() => setOpen(false)}
                    isPending={isPending}
                    submitLabel="Save Changes"
                />
            </DialogContent>
        </Dialog>
    );
}