interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  author: string;
  readingTime: string;
  coverImage?: string;
  content?: string;
}

interface BlogPostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  author: string;
  readingTime: string;
  coverImage?: string;
}
