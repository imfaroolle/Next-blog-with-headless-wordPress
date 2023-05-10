import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { getPageSlugs, getSinglePage } from "@/lib/pages";
import Head from "next/head";
import React from "react";

export async function getStaticProps({ params }) {
  const pageData = await getSinglePage(params.pageSlug);
  return {
    props: {
      pageData,
      slug: params.pageSlug,
    },
  };
}

export async function getStaticPaths() {
  const pageSlugs = await getPageSlugs();
  return {
    paths: pageSlugs.map((s) => ({
      params: {
        pageSlug: s.slug,
      },
    })),
    fallback: false,
  };
}

export default function PageSlug({ pageData, slug }) {
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>

      <section className="bg-slate-700">
        <SiteHeader className="z-10 relative" />
      </section>

      <section className="py-8">
        <article>
          <h1 className="text-6xl text-center text-slate-700 relative py-8">
            {pageData.title}
          </h1>
          <div
            className="post-content container mx-auto lg:max-w-4xl"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          ></div>
        </article>
      </section>

      <Footer />
    </>
  );
}
