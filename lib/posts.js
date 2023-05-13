import { graphqlRequest } from "./graphqlRequest";

export async function getPostsList(endCursor = null, taxonomy = null) {
  let condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}}`;
  if (taxonomy) {
    condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC},  ${taxonomy.key}: "${taxonomy.value}"}`;
  }
  const query = {
    query: `query getPostsList {
        posts(${condition}) {
          nodes {
            date
            slug
            title
            excerpt(format: RENDERED)
            featuredImage {
              node {
                mediaDetails {
                  file
                  sizes {
                    sourceUrl
                    width
                    height
                  }
                }
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }`,
  };

  const resJson = await graphqlRequest(query);
  const allPosts = resJson.data.posts;

  return allPosts;
}

export async function getSinglePost(slug) {
  const query = {
    query: `query getSinglePost {
        post(id: "${slug}", idType: SLUG) {
          content(format: RENDERED)
          date
          excerpt(format: RENDERED)
          modified
          slug
          title(format: RENDERED)
          featuredImage {
            node {
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }`,
  };

  const resJson = await graphqlRequest(query);
  const singlePost = await resJson.data.post;

  return singlePost;
}

export async function getPostSlugs() {
  const query = {
    query: `query getPostsSlug {
        posts {
          nodes {
            slug
          }
        }
      }`,
  };

  const resJson = await graphqlRequest(query);
  const slugs = await resJson.data.posts.nodes;
  return slugs;
}

export async function getCategorySlugs() {
  const query = {
    query: `query getCategorySlugs {
      categories {
        nodes {
          slug
        }
      }
    }`,
  };

  const resJson = await graphqlRequest(query);
  const slugs = await resJson.data.categories.nodes;
  return slugs;
}

export async function getCategoryDetails(categorySlug) {
  const query = {
    query: `query getCategoryDetails {
      category(id: "${categorySlug}", idType: SLUG) {
        count
        name
        slug
      }
    }`,
  };

  const resJson = await graphqlRequest(query);
  const categoryDetails = await resJson.data.category;
  return categoryDetails;
}
