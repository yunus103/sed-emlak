import { seoType } from "./objects/seo";
import { socialLinkType } from "./objects/socialLink";
import { customHtmlType } from "./objects/customHtml";
import { siteSettingsType } from "./singletons/siteSettings";
import { navigationType } from "./singletons/navigation";
import { homePageType } from "./singletons/homePage";
import { aboutPageType } from "./singletons/aboutPage";
import { contactPageType } from "./singletons/contactPage";
import { blogPageType } from "./singletons/blogPage";
import { servicesPageType } from "./singletons/servicesPage";
import { listingsPageType } from "./singletons/listingsPage";
import { regionsPageType } from "./singletons/regionsPage";
import { blogPostType } from "./documents/blogPost";
import { blogCategoryType } from "./documents/blogCategory";
import { serviceType } from "./documents/service";
import { listingType } from "./documents/listing";
import { regionType } from "./documents/region";
import { legalPageType } from "./documents/legalPage";
import { faqType } from "./documents/faq";

export const schemaTypes = [
  // Objects
  seoType,
  socialLinkType,
  customHtmlType,
  // Singletons
  siteSettingsType,
  navigationType,
  homePageType,
  aboutPageType,
  contactPageType,
  blogPageType,
  servicesPageType,
  listingsPageType,
  regionsPageType,
  // Collections
  blogPostType,
  blogCategoryType,
  serviceType,
  listingType,
  regionType,
  legalPageType,
  faqType,
];

