import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return buildMetadata({
    title: `İlan Detay - ${resolvedParams.slug}`,
    canonicalPath: `/ilanlar/${resolvedParams.slug}`,
  });
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-heading mb-6">İlan Detayı: {resolvedParams.slug}</h1>
      <p>Burası tekil bir ilanın detaylarının gösterileceği sayfadır.</p>
    </div>
  );
}
