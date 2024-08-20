import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

import {
  getOrderedSlugs,
  loadMarkdownContent,
} from "@/lib/loadMarkdownContent";

type Props = {
  params: {
    slug: string;
  };
};

const TutorialPage = async ({ params: { slug } }: Props) => {
  const content = loadMarkdownContent(slug);
  const tutorials = getOrderedSlugs();

  if (!content) {
    return <div>404 - Page Not Found</div>;
  }

  return (
    <div className="flex p-2 gap-2">
      <div className="flex flex-col">
        {tutorials.map((item, index) => (
          <Link href={`/tutorial/${item.slug}`} key={index}>
            {item.slug}
          </Link>
        ))}
      </div>
      <div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default TutorialPage;
