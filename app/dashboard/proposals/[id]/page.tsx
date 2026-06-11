import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProposalById } from "@/app/actions/proposals";
import { ProposalHeader } from "@/components/dashboard/proposals/ProposalHeader";
import { ProposalContent } from "@/components/dashboard/proposals/ProposalContent";
import { ProposalSidebar } from "@/components/dashboard/proposals/ProposalSidebar";

interface ProposalDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProposalDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const proposal = await getProposalById(id);
  return {
    title: `${proposal?.title || "Proposal"} | Spark CRM`,
  };
}

export default async function ProposalDetailPage({ params }: ProposalDetailPageProps) {
  const { id } = await params;
  const proposal = await getProposalById(id);

  if (!proposal) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <ProposalHeader proposal={proposal} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProposalContent proposal={proposal} />
        </div>

        <div>
          <ProposalSidebar proposal={proposal} />
        </div>
      </div>
    </div>
  );
}
