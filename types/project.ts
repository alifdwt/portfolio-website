interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "web" | "mobile" | "data" | "fullstack";
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
}
