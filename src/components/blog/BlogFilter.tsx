"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { formatDate } from "@/lib/utils";

interface BlogFilterProps {
  posts: any[];
  categories: any[];
}

export function BlogFilter({ posts, categories }: BlogFilterProps) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  // Sayfa yüklendiğinde URL'den kategoriyi al
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryQuery = urlParams.get("category");
    if (categoryQuery) {
      setCurrentCategory(categoryQuery);
    }
  }, []);

  const setCategory = (slug: string | null) => {
    setCurrentCategory(slug);
    
    // URL'yi sayfayı yenilemeden değiştir
    const newUrl = slug ? `/blog?category=${slug}` : "/blog";
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const filteredPosts = currentCategory
    ? posts.filter((post) => post.category?.slug?.current === currentCategory)
    : posts;

  return (
    <>
      <FadeIn direction="up">
        {categories?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border/40">
            <Button
              variant={!currentCategory ? "default" : "ghost"}
              size="sm"
              onClick={() => setCategory(null)}
              className="rounded-full px-5 cursor-pointer"
            >
              Tümü
            </Button>
            {categories.map((cat: any) => (
              <Button
                key={cat._id}
                variant={currentCategory === cat.slug?.current ? "default" : "ghost"}
                size="sm"
                onClick={() => setCategory(cat.slug?.current)}
                className="rounded-full px-5 cursor-pointer"
              >
                {cat.title}
              </Button>
            ))}
          </div>
        )}
      </FadeIn>

      {filteredPosts?.length > 0 ? (
        <AnimateGroup key={currentCategory || "all"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post: any) => (
            <article key={post.slug?.current} className="group relative bg-card rounded-2xl overflow-hidden border border-border/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-border/80 h-full flex flex-col">
              {/* Image */}
              {post.mainImage && (
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <SanityImage
                    image={post.mainImage}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}
              
              <div className="p-7 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  {post.category && (
                    <Link
                      href={`/blog?category=${post.category.slug?.current}`}
                      className="relative z-20 text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      {post.category.title}
                    </Link>
                  )}
                  {post.publishedAt && (
                    <time className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                      {formatDate(post.publishedAt)}
                    </time>
                  )}
                </div>

                {/* Stretched Link for the entire card */}
                <h2 className="text-lg font-bold mb-3 font-bankgothic leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  <Link href={`/${post.slug?.current}`} className="after:absolute after:inset-0 after:z-10">
                    {post.title}
                  </Link>
                </h2>

                {post.excerpt && (
                  <p className="text-[13px] text-muted-foreground/80 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                   <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                     Devamını Oku
                     <span className="text-lg leading-none">→</span>
                   </span>
                </div>
              </div>
            </article>
          ))}
        </AnimateGroup>
      ) : (
        <FadeIn key={`empty-${currentCategory}`}>
          <div className="text-center py-24 bg-muted/20 rounded-3xl border border-dashed">
            <p className="text-muted-foreground font-medium">Bu kategoride henüz blog yazısı bulunmamaktadır.</p>
          </div>
        </FadeIn>
      )}
    </>
  );
}
