import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Kiralık İlanlar",
    canonicalPath: "/ilanlar/kiralik",
  });
}

export default function KiralikListingsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-heading mb-6">Kiralık İlanlar</h1>
      <p>Kiralık olarak filtrelenmiş ilanlar burada yer alacaktır.</p>
    </div>
  );
}
