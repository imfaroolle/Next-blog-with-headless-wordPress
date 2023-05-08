import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FeaturedImage({ post }) {
  let img = "";
  const defualtFeaturedImg =
    "http://localhost:8080/barbar/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";
  const defaultWidth = "300";
  const defaultHeight = "200";

  if (post.featuredImage) {
    let size = post.featuredImage.node.mediaDetails.sizes[0];
    img = {
      src: size.sourceUrl,
      width: size.width,
      height: size.height,
    };
  } else {
    img = {
      src: defualtFeaturedImg,
      width: defaultWidth,
      height: defaultHeight,
    };
  }
  return (
    <Link href={`/blog/${post.slug}`}>
      <Image
        className="h-full object-cover rounded-sm"
        src={img.src}
        width={img.width}
        height={img.height}
        alt={post.title}
      />
    </Link>
  );
}
