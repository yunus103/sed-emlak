import { groq } from "next-sanity";

// ─── Layout ────────────────────────────────────────────────────────────────────
// Her sayfada bir kez çekilir — header, footer, global ayarlar
export const layoutQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    siteName, siteTagline,
    logo { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
    logoHeight,
    favicon { asset->{ _id, url } },
    contactInfo { phone, phone2, email, address, branchAddress, whatsappNumber, sahibindenUrl, mapIframe },
    socialLinks[] { platform, url },
    gaId, gtmId, googleSearchConsoleId
  },
  "navigation": *[_type == "navigation"][0] {
    headerLinks[] { label, href, openInNewTab, subLinks[] { label, href, openInNewTab } },
    footerLinks[] { label, href, openInNewTab, subLinks[] { label, href, openInNewTab } }
  }
}`;

// ─── Sayfalar ──────────────────────────────────────────────────────────────────

export const homePageQuery = groq`*[_type == "homePage"][0] {
  heroTitle, heroSubtitle, heroCtaLabel,
  heroCtaLink {
    linkType,
    manual,
    internal->{ _type, "slug": slug.current }
  },
  heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  featuredListings[]->{
    _id, title, slug, status, propertyType, price, neighborhood,
    region->{title, slug},
    features { grossArea, netArea, rooms },
    mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  },
  featuredRegions[]->{
    _id, title, slug,
    heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  },
  featuredServices[]->{
    _id, title, slug, shortDescription, icon,
    mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  },
  featuredPosts[]->{
    _id, title, slug, excerpt, publishedAt,
    category->{ title, slug },
    mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  },
  stats[] { value, label },
  aboutTitle, aboutSubtitle, aboutText, aboutPoints,
  aboutImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  blogTitle, blogSubtitle,
  ctaTitle, ctaText,
  seo,
  "siteSettings": *[_type == "siteSettings"][0] {
    contactInfo { phone, phone2, email, address, branchAddress, whatsappNumber, sahibindenUrl },
    socialLinks[] { platform, url }
  }
}`;


export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  pageTitle, pageSubtitle,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  storyTitle, body,
  advisorName, advisorTitle, advisorBio,
  advisorImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
  missionTitle, missionText,
  visionTitle, visionText,
  stats[] { label, value },
  seo
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0] {
  pageTitle, pageSubtitle, formTitle, successMessage,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  seo
}`;

export const blogPageQuery = groq`*[_type == "blogPage"][0] {
  pageTitle, pageSubtitle, ctaLabel, ctaLink, 
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  seo
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0] {
  pageTitle, pageSubtitle, ctaLabel, ctaLink, seo,
  sectionTitle, sectionHeading, sectionDescription,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const projectsPageQuery = groq`*[_type == "projectsPage"][0] {
  pageTitle, pageSubtitle, ctaLabel, ctaLink, seo
}`;

// ─── Bölgeler ──────────────────────────────────────────────────────────────────

// Hub sayfası: sayfa ayarları + featuredRegions (öncelikli), fallback: tüm bölgeler alfabe sırası
export const regionsPageQuery = groq`{
  "page": *[_type == "regionsPage"][0] {
    title, description, seo,
    mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
    "featuredRegions": featuredRegions[]->{
      _id, title, slug, neighborhoods,
      heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
      metrics { activeListings }
    }
  },
  "allRegions": *[_type == "region"] | order(title asc) {
    _id, title, slug, neighborhoods,
    heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
    metrics { activeListings }
  }
}`;

// Detay sayfası: tek bölge slug ile
export const regionDetailQuery = groq`*[_type == "region" && slug.current == $slug][0] {
  _id, title, slug, description, mapEmbed, neighborhoods,
  heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  metrics { activeListings, avgSalePrice, avgRentPrice },
  nearbyRegions[]->{ _id, title, "slug": slug.current, heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop } },
  seo { metaTitle, metaDescription, noIndex,
    ogImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop }
  }
}`;

// İlçe sayfasındaki ilanlar (max 6, aktifler önce)
export const listingsByRegionQuery = groq`*[_type == "listing" && region->slug.current == $slug]
  | order(select(status in ["satildi","kiralandi"] => 1, 0) asc, _createdAt desc)[0...6] {
  _id, title, slug, status, propertyType, price, neighborhood,
  region->{ title, slug },
  features { grossArea, rooms, floor },
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

// İlçeye etiketlenmiş blog yazıları (max 3)
export const blogsByRegionQuery = groq`*[_type == "blogPost" && references($regionId)] | order(publishedAt desc)[0...3] {
  _id, title, slug, excerpt, publishedAt,
  category->{ title, slug },
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;


// ─── Blog ──────────────────────────────────────────────────────────────────────

export const blogListQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt, category->{title, slug},
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, _updatedAt, excerpt, category->{_id, title, slug}, seoTags,
  regions[]->{title, "slug": slug.current},
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  body[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, alignment, size, hotspot, crop
    }
  },
  seo {
    metaTitle, metaDescription, canonicalUrl, noIndex,
    ogImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop }
  }
}`;

export const blogCategoriesQuery = groq`*[_type == "blogCategory"] | order(title asc) {
  _id, title, slug
}`;

export const blogListByCategorySlugQuery = groq`*[_type == "blogPost" && category->slug.current == $slug] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt, category->{title, slug},
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const blogRelatedPostsQuery = groq`*[_type == "blogPost" && category._ref == $categoryId && _id != $currentPostId] | order(publishedAt desc)[0...3] {
  title, slug, excerpt, publishedAt, category->{title, slug},
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

// ─── Hizmetler ─────────────────────────────────────────────────────────────────

export const serviceListQuery = groq`*[_type == "service"] | order(_createdAt asc) {
  title, slug, shortDescription, icon,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0] {
  title, slug, shortDescription, icon,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  body[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo
}`;

// ─── Projeler ──────────────────────────────────────────────────────────────────

export const projectListQuery = groq`*[_type == "project"] | order(_createdAt asc) {
  title, slug,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  title, slug,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  body[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo
}`;

// ─── İlanlar ──────────────────────────────────────────────────────────────────

export const listingsQuery = groq`*[_type == "listing" 
  && ($tip == "" || ($tip == "satilik" && status in ["satilik", "satildi"]) || ($tip == "kiralik" && status in ["kiralik", "kiralandi"]))
  && ($tur == "" || propertyType == $tur)
  && ($oda == "" || features.rooms == $oda)
  && ($ilce == "" || region->slug.current == $ilce || neighborhood match $ilce)
  && ($fiyat == 100000000 || price <= $fiyat)
  && (!defined($esyali) || features.furnished == $esyali)
] | order(select(status in ["satildi", "kiralandi"] => 1, 0) asc, _createdAt desc) {
  _id, title, slug, status, propertyType, price, neighborhood,
  region->{title, slug},
  features { grossArea, netArea, rooms, floor, buildingAge, heating, furnished, creditEligible, deedStatus, dues },
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  gallery[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const listingDetailQuery = groq`{
  "listing": *[_type == "listing" && slug.current == $slug][0] {
    _id, title, slug, status, propertyType, price, neighborhood, locationMap,
    region->{title, slug},
    features { grossArea, netArea, rooms, floor, buildingAge, heating, furnished, creditEligible, deedStatus, dues },
    mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
    gallery[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
    description, seo
  },
  "advisor": *[_type == "aboutPage"][0] {
    advisorName, advisorTitle, advisorImage
  },
  "settings": *[_type == "siteSettings"][0] {
    contactInfo { phone, phone2, whatsappNumber, sahibindenUrl }
  }
}`;

export const relatedListingsQuery = groq`*[_type == "listing" && region._ref == $regionId && _id != $currentId] | order(_createdAt desc)[0...3] {
  _id, title, slug, status, propertyType, price, neighborhood,
  region->{title, slug},
  features { grossArea, netArea, rooms, floor, buildingAge, heating, furnished, creditEligible, deedStatus, dues },
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  gallery[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const sidebarListingsQuery = groq`*[_type == "listing" && status in ["satilik", "kiralik"]] | order(_createdAt desc)[0...3] {
  _id, title, slug, price, neighborhood,
  region->{title, slug},
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

// ─── Yasal Sayfalar ────────────────────────────────────────────────────────────

export const legalPageBySlugQuery = groq`*[_type == "legalPage" && slug.current == $slug][0] {
  title, slug, body, _updatedAt, seo
}`;

// ─── Sitemap ───────────────────────────────────────────────────────────────────

export const allSlugsForSitemapQuery = groq`{
  "blogPosts": *[_type == "blogPost" && defined(slug.current) && publishedAt <= now()] { "slug": slug.current, _updatedAt },
  "blogCategories": *[_type == "blogCategory" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "services": *[_type == "service" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "projects": *[_type == "project" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "listings": *[_type == "listing" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "legalPages": *[_type == "legalPage" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "regions": *[_type == "region" && defined(slug.current)] { "slug": slug.current, _updatedAt }
}`;

// ─── Varsayılan SEO ────────────────────────────────────────────────────────────

export const defaultSeoQuery = groq`*[_type == "siteSettings"][0] {
  "title": defaultSeo.metaTitle,
  "description": defaultSeo.metaDescription,
  "ogImage": defaultOgImage,
  siteName, siteTagline,
  logo { asset->{ _id, url } },
  favicon { asset->{ _id, url } },
  googleSearchConsoleId
}`;
