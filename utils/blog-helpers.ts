export function generateBlogSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function formatReadingTime(text: string, wordsPerMinute = 200): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function generateExcerpt(content: string, maxLength = 160): string {
  // Remove markdown formatting and get plain text
  const plainText = content
    .replace(/[#*`]/g, "") // Remove markdown characters
    .replace(/\n/g, " ") // Replace newlines with spaces
    .trim();

  return truncateText(plainText, maxLength);
}

export function sortPostsByDate(
  posts: BlogPost[],
  ascending = false
): BlogPost[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function groupPostsByCategory(
  posts: BlogPost[]
): Record<string, BlogPost[]> {
  return posts.reduce((acc: Record<string, BlogPost[]>, post) => {
    const category = post.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {});
}

export function getRelatedPostsByTags(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  maxResults = 3
): BlogPost[] {
  const currentTags = currentPost.tags || [];

  const scoredPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const commonTags =
        post.tags?.filter((tag) => currentTags.includes(tag)) || [];
      const categoryMatch = post.category === currentPost.category ? 1 : 0;
      const score = commonTags.length + categoryMatch;
      return { ...post, score };
    })
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, maxResults);
}
