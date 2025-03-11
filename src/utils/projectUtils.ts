
import { Project, ProjectDB } from "@/types/project";

// Convert DB project to frontend project
export const dbToProject = (dbProject: ProjectDB): Project => ({
  id: String(dbProject.id),
  title: dbProject.description || "",  // Use description as title since there's no title field
  description: dbProject.description || "",
  technologies: dbProject["technologies used"] 
    ? dbProject["technologies used"].split(',').map(tech => tech.trim()) 
    : [],
  imageUrl: dbProject.image_url || "/placeholder.svg",
  link: dbProject["github link"] || "",
  featured: dbProject.featured || false
});

// Process technologies to ensure we have a string for DB storage
export const processProjectTechnologies = (tech: string[] | string): string => {
  if (Array.isArray(tech)) {
    return tech.join(',');
  } 
  if (typeof tech === 'string') {
    return tech;
  }
  return '';
};

// Process technologies for frontend use (ensure it's a string array)
export const processTechnologiesArray = (tech: string[] | string): string[] => {
  if (Array.isArray(tech)) {
    return tech;
  } 
  if (typeof tech === 'string') {
    return tech.split(',').map(item => item.trim());
  }
  return [];
};
