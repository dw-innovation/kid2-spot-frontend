import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

import {
  getOrderedSlugs,
  loadMarkdownContent,
} from "@/lib/loadMarkdownContent";
import { cn } from "@/lib/utils";

type Props = {
  params: {
    slug: string;
  };
};

const TutorialPage = async ({ params: { slug } }: Props) => {
  const content = loadMarkdownContent(slug);
  const tutorials = getOrderedSlugs();

  if (!content) {
    return (
      <div className="text-center text-xl font-bold p-8">
        404 - Page Not Found
      </div>
    );
  }

  return (
    <div className="flex p-4 gap-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col border p-4 bg-gray-800 rounded-lg shadow-lg w-1/4">
        <h2 className="text-lg font-semibold text-white mb-4">Tutorials</h2>
        {tutorials.map((item, index) => (
          <Link
            href={`/tutorial/${item.slug}`}
            key={index}
            className={cn(
              "text-white hover:text-yellow-300 hover:underline py-1 px-2 rounded",
              slug === item.slug && "underline text-yellow-300"
            )}
          >
            {item.slug}
          </Link>
        ))}
      </div>
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <p className="mb-4 text-gray-700" {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-semibold mb-4" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-medium mb-4" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside mb-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside mb-4" {...props} />
            ),
            code: ({ node, ...props }) => (
              <code
                className="bg-gray-200 text-red-600 p-1 rounded"
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TutorialPage;
