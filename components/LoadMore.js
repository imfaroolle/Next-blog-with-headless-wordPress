import { getPostsList } from "@/lib/posts";
import React, { useState } from "react";

export default function LoadMore({ posts, setposts, taxonomy = null }) {
  const [buttonText, setButtonText] = useState("Load more posts");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  async function handleOnClick(e) {
    setButtonText("Loading...");
    setButtonDisabled(true);
    const morePosts = await getPostsList(posts.pageInfo.endCursor, taxonomy);

    let updatedPosts = {
      pageInfo: {},
      nodes: [],
    };

    updatedPosts.pageInfo = morePosts.pageInfo;
    posts.nodes.map((node) => {
      updatedPosts.nodes.push(node);
    });
    morePosts.nodes.map((node) => {
      updatedPosts.nodes.push(node);
    });

    setposts(updatedPosts);
    if (morePosts.pageInfo.hasNextPage) {
      setButtonText("Load more posts");
      setButtonDisabled(false);
    } else {
      setButtonText("No more posts to load");
      setButtonDisabled(true);
    }
  }

  return (
    <div className="text-center py-4">
      <button
        className="font-bold bg-blue-400 text-slate-900 px-4 py-2 hover:bg-blue-500"
        onClick={handleOnClick}
        disabled={posts.pageInfo.hasNextPage ? buttonDisabled : true}
      >
        {posts.pageInfo.hasNextPage ? buttonText : "No more posts to load"}
      </button>
    </div>
  );
}
