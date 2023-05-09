import Date from "@/components/Date";
import SiteHeader from "@/components/SiteHeader";
import { getPostSlugs, getSinglePost } from "@/lib/posts";
import Head from "next/head";
import React from "react";

export async function getStaticProps({ params }) {
  const postData = await getSinglePost(params.postSlug);
  let featuredImageUrl =
    "http://localhost:8080/barbar/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";
  if (postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl) {
    featuredImageUrl =
      postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
  }
  return {
    props: {
      postData,
      featuredImageUrl: "url(" + featuredImageUrl + ")",
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const postSlugs = await getPostSlugs();
  return {
    paths: postSlugs.map((s) => ({
      params: {
        postSlug: s.slug,
      },
    })),

    fallback: false,
  };
}

export default function PostSlug({ postData, featuredImageUrl }) {
  return (
    <>
      <Head>
        <title key={postData.title}>{postData.title}</title>
        <meta
          name="description"
          content={postData.excerpt}
          key="metadescription"
        />
      </Head>

      <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
        <SiteHeader className="z-10 relative" />
      </section>
      <article>
        <section
          className="h-[60vh] min-h-[30rem] bg-no-repeat bg-cover bg-center relative"
          style={{ backgroundImage: featuredImageUrl }}
        >
          <div className="absolute inset-0 bg-slate-900 opacity-40"></div>
          <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
            <h1 className="text-6xl text-left text-slate-100 relative z-10 py-8 mt-12">
              {postData.title}
            </h1>

            <div className="pb-4 text-slate-100 z-10">
              Posted by Faroolle, last Updated{" "}
              <Date dateString={postData.modified} />
            </div>
            <div
              className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200"
              dangerouslySetInnerHTML={{ __html: postData.excerpt }}
            />
          </div>

          <section className="py-8">
            <div
              className="post-content container mx-auto lg:max-w-4xl"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </section>
        </section>
      </article>
    </>
  );
}
