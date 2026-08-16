import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " "),
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;

  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="text-sm text-muted-foreground">
        Service details, pricing, and packages will be shown here.
      </p>
    </div>
  );
}
