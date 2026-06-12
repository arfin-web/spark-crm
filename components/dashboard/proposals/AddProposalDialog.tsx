"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
// FIXED: Import DialogTrigger explicitly to prevent HTML button-inside-button nesting warnings if custom triggers are passed
import { createProposal } from "@/app/actions/proposals";
import { ProposalForm, ProposalFormValues } from "./ProposalForm";

interface AddProposalDialogProps {
    clients: { id: string; name: string }[];
    // FIXED: Added optional projects property so the form can render and filter project selections correctly
    projects?: { id: string; name: string; client_id: string }[];
    defaultClientId?: string;
    trigger?: React.ReactNode;
}

export function AddProposalDialog({ clients, projects = [], defaultClientId, trigger }: AddProposalDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);

    async function onSubmit(values: ProposalFormValues) {
        setIsPending(true);
        try {
            // FIXED: Values are already parsed/transformed to match Types.ProposalCreate perfectly via Zod output
            await createProposal(values as any);
            setOpen(false);
        } catch (error) {
            console.error("Failed to create proposal:", error);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                {trigger || (
                    <button className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Add Proposal</span>
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl text-primary font-semibold">Start New Proposal</DialogTitle>
                    <DialogDescription>
                        Define the proposal scope, budget, and timeline.
                    </DialogDescription>
                </DialogHeader>
                <ProposalForm
                    clients={clients}
                    projects={projects}
                    initialData={{ client_id: defaultClientId }}
                    onSubmit={onSubmit}
                    onCancel={() => setOpen(false)}
                    isPending={isPending}
                    submitLabel="Create Proposal"
                />
            </DialogContent>
        </Dialog>
    );
}