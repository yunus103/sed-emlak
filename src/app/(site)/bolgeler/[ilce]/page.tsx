import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ ilce: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return buildMetadata({
    title: `Bölge: ${resolvedParams.ilce}`,
    canonicalPath: `/bolgeler/${resolvedParams.ilce}`,
  });
}

export default async function RegionDetailPage({ params }: { params: Promise<{ ilce: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-heading mb-6">Bölge: {resolvedParams.ilce}</h1>
      <p>Burası tekil bir bölgenin detaylarının gösterileceği sayfadır.</p>
    </div>
  );
}
