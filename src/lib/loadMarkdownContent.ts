import fs from "fs";
import matter from "gray-matter";
import path from "path";

type TutorialInfo = {
  slug: string;
  order: number;
};

export const loadMarkdownContent = (slug: string): string | null => {
  const tutorialsDirectory = path.join(
    process.cwd(),
    "src",
    "content",
    "tutorials"
  );

  const filenames = fs.readdirSync(tutorialsDirectory);

  for (const filename of filenames) {
    const filePath = path.join(tutorialsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContent);

    if (data.slug === slug) {
      return content;
    }
  }

  return null;
};

export const getOrderedSlugs = (): TutorialInfo[] => {
  const tutorialsDirectory = path.join(
    process.cwd(),
    "src",
    "content",
    "tutorials"
  );

  const filenames = fs.readdirSync(tutorialsDirectory);

  const tutorials: TutorialInfo[] = [];

  filenames.forEach((filename) => {
    const filePath = path.join(tutorialsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContent);

    if (data.slug && data.order !== undefined) {
      tutorials.push({ slug: data.slug, order: data.order });
    }
  });

  tutorials.sort((a, b) => a.order - b.order);

  return tutorials;
};
