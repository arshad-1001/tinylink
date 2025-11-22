export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";   // 🔥 Required to disable all caching

import LinkForm from "@/components/LinkForm";
import LinksTable from "@/components/LinksTable";
import { createLink } from "./actions/createLink";
import { deleteLink } from "./actions/deleteLink";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function handleDelete(formData: FormData) {
    "use server";
    const code = formData.get("code") as string;
    await deleteLink(code);
  }

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-semibold">TinyLink Dashboard</h1>

      <LinkForm onSubmit={createLink} />

      <LinksTable links={links} onDelete={handleDelete} />
    </main>
  );
}