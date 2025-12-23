import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getBlogPosts } from "@/lib/blog";
import { BlogListClient } from "./blog-list-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: `${t("metaTitle")} | Endika Orube`,
    description: t("metaDescription"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getBlogPosts(locale);

  return <BlogListClient posts={posts} locale={locale} />;
}

