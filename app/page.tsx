export const dynamic = "force-dynamic";
export const revalidate = 0;

import LinkForm from "@/components/LinkForm";
import LinksTable from "@/components/LinksTable";
import { prisma } from "@/lib/prisma";
import { createLink } from "./actions/createLink";
import { deleteLink } from "./actions/deleteLink";

export default async function DashboardPage() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-semibold">TinyLink Dashboard</h1>

      <LinkForm onSubmit={createLink} />

      <LinksTable links={links} onDelete={deleteLink} />
    </main>
  );
}