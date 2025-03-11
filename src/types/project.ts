
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[] | string;
  imageUrl: string;
  link: string;
  featured?: boolean;
}

export interface ProjectDB {
  id: number;
  description: string;
  "technologies used": string;
  "github link": string;
  image_url: string;
  featured: boolean;
  created_at: string;
}
