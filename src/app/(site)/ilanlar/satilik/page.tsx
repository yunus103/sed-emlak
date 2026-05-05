import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Satılık İlanlar",
    canonicalPath: "/ilanlar/satilik",
  });
}

export default function SatilikListingsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-heading mb-6">Satılık İlanlar</h1>
      <p>Satılık olarak filtrelenmiş ilanlar burada yer alacaktır.</p>
    </div>
  );
}
