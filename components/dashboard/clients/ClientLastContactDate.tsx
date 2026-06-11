"use client";

import { TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

export function ClientLastContactDate({ client }: any) {
    return (
        <TableCell className="text-sm text-muted-foreground">
            {client.last_contact_date
                ? formatDate(client.last_contact_date)
                : "Never"}
        </TableCell>
    );
}