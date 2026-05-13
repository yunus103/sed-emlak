import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { defaultSeoQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { getSiteUrl } from "./utils";

type PageSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: any;
  canonicalUrl?: string;
  noIndex?: boolean;
};

type BuildMetadataParams = {
  title?: string;
  description?: string;
  ogImage?: any;
  canonicalPath?: string;
  noIndex?: boolean;
  pageSeo?: PageSeo;
  // Blog yazıları için
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export async function buildMetadata(params: BuildMetadataParams = {}): Promise<Metadata> {
  const defaults = await client.fetch(defaultSeoQuery, {}, { next: { tags: ["layout"] } });

  const siteName = defaults?.siteName || "SED Emlak";
  const siteTagline = defaults?.siteTagline || "";
  const defaultMetaTitle = defaults?.title || "";
  const isHomePage = params.canonicalPath === "/";

  let title = "";

  if (isHomePage) {
    const customTitle = params.pageSeo?.metaTitle || defaultMetaTitle;
    if (customTitle) {
      title = customTitle;
    } else {
      title = siteTagline ? `${siteName} | ${siteTagline}` : siteName;
    }
  } else {
    const pageTitle = params.pageSeo?.metaTitle || params.title || "";
    title = pageTitle ? `${pageTitle} | ${siteName}` : siteName;
  }

  const description = params.pageSeo?.metaDescription || params.description || defaults?.description;
  const ogImageSource = params.pageSeo?.ogImage || params.ogImage || defaults?.ogImage;
  const siteUrl = getSiteUrl();
  const canonicalUrl =
    params.pageSeo?.canonicalUrl ||
    (params.canonicalPath ? `${siteUrl}${params.canonicalPath}` : undefined);
  const noIndex = params.pageSeo?.noIndex || params.noIndex || false;

  const faviconUrl = defaults?.favicon?.asset?.url || "/favicon.ico";
  const ogImageUrl = ogImageSource
    ? urlForImage(ogImageSource)?.width(1200).height(630).url()
    : undefined;

  const ogType = params.ogType || "website";

  return {
    title,
    description,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
    openGraph: {
      title: title || "",
      description: description || "",
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
      locale: "tr_TR",
      type: ogType,
      siteName,
      ...(ogType === "article" && {
        ...(params.publishedTime && { publishedTime: params.publishedTime }),
        ...(params.modifiedTime && { modifiedTime: params.modifiedTime }),
        ...(params.authors && { authors: params.authors }),
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: title || "",
      description: description || "",
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    verification: {
      google: defaults?.googleSearchConsoleId || undefined,
    },
  };
}
