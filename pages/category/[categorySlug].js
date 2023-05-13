import Date from "@/components/Date";
import FeaturedImage from "@/components/FeaturedImage";
import LoadMore from "@/components/LoadMore";
import SiteHeader from "@/components/SiteHeader";
import {
  getCategoryDetails,
  getCategorySlugs,
  getPostsList,
} from "@/lib/posts";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export async function getStaticPaths() {
  const categories = await getCategorySlugs();
  return {
    paths: categories.map((category) => ({
      params: {
        categorySlug: category.slug,
      },
    })),

    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const categoryPosts = await getPostsList(null, {
    key: "categoryName",
    value: params.categorySlug,
  });

  const categoryDetails = await getCategoryDetails(params.categorySlug);

  return {
    props: {
      categoryPosts,
      categoryDetails,
    },
  };
}
export default function CategoryName({ categoryPosts, categoryDetails }) {
  const [posts, setposts] = useState(categoryPosts);

  return (
    <>
      <Head>
        <title>{categoryDetails.name}</title>
      </Head>

      <div className="h-[50vh] min-h-[30rem] bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 opacity-40 inset-0 z-0"></div>
        <SiteHeader className="z-10 relative" />
        <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8">
          Category Archive: {categoryDetails.name}
        </h1>
        <p className="relative z-10 text-center text-slate-200 text-2xl">
          Found {categoryDetails.count} posts under this category
        </p>
      </div>

      <main>
        <section className="mt-4">
          <div className="container mx-auto lg:max-w-5xl">
            <ul>
              {posts.nodes.map((post) => (
                <li key={post.slug} className="grid grid-cols-5 gap-4 mb-4 ">
                  <div className="col-span-2 ">
                    <FeaturedImage post={post} />
                  </div>
                  <div className="col-span-3">
                    <h2 className="py-4">
                      <Link
                        className="text-blue-400 hover:text-blue-600"
                        href={`/blog/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="py-4">
                      Published on <Date dateString={post.date} />
                    </div>
                    <div
                      className="text-lg"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    ></div>
                    <div className="py-4">
                      Posted under:
                      {post.categories.nodes.map((category) => (
                        <Link
                          className="text-blue-400 hover:text-blue-500"
                          key={category.slug}
                          href={`/category/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <LoadMore
              posts={posts}
              setposts={setposts}
              taxonomy={{ key: "categoryName", value: categoryDetails.slug }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
