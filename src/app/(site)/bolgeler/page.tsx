import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Bölgeler",
    canonicalPath: "/bolgeler",
  });
}

export default function RegionsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-heading mb-6">Bölgeler / İlçeler</h1>
      <p>Tüm bölgelerin grid halinde listeleneceği merkez sayfasıdır.</p>
    </div>
  );
}
